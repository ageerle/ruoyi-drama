import { Euler, MathUtils, Matrix4, Quaternion, Vector3 } from 'three';
import { directorJoints, emptyDirector, newDirectorObject, validateDirector, type DirectorDocument, type DirectorJoint, type DirectorPose, type ObjectKey, type Vec3 } from './dramaDirector.ts';

export type PoseLandmark = [number,number,number,number];
export interface PoseSample { frame: number; world: PoseLandmark[]; image: PoseLandmark[] }
export interface PoseRecording { version: 1; duration: number; samples: PoseSample[] }
const down = new Vector3(0,-1,0), up = new Vector3(0,1,0);
const degrees = (q: Quaternion): Vec3 => { const e=new Euler().setFromQuaternion(q,'XYZ'); return [e.x,e.y,e.z].map(n=>Number(MathUtils.radToDeg(n).toFixed(3))) as Vec3; };
const basis = (x:Vector3,y:Vector3) => { x.normalize(); const z=x.clone().cross(y).normalize(); y=z.clone().cross(x).normalize(); return new Quaternion().setFromRotationMatrix(new Matrix4().makeBasis(x,y,z)); };
const fullBody=(image:PoseLandmark[])=>[23,24,25,26,27,28].every(i=>image[i]![1]<1.04 && image[i]![1]>0) && [23,24].every(i=>image[i]![3]>.4) && [27,28].some(i=>image[i]![3]>.4);

/** Retarget fixed-length FK chains. Input image X stays screen X, avoiding a mirrored imitation.
 * Pose depth is an estimate; the reference plane has more weight than monocular depth. */
export function retargetPose(sample: PoseSample): DirectorPose {
  const w=sample.world, image=sample.image;
  if(w.length!==33 || image.length!==33) return {};
  const point=(i:number)=>new Vector3(w[i]![0],-w[i]![1],-w[i]![2]*.65);
  const middle=(a:number,b:number)=>point(a).add(point(b)).multiplyScalar(.5);
  const hips=middle(23,24), shoulders=middle(11,12), upright=shoulders.clone().sub(hips);
  const full=fullBody(image);
  const pelvis=full ? basis(point(23).sub(point(24)),up.clone()) : new Quaternion();
  const chest=basis(point(11).sub(point(12)),upright.length()>.1 ? upright : up.clone());
  const result:DirectorPose={pelvis:degrees(pelvis),torso:degrees(pelvis.clone().invert().multiply(chest))};
  const chain=(joint:DirectorJoint,a:number,b:number,parent:Quaternion,axis=down)=>{
    const direction=point(b).sub(point(a)).normalize().applyQuaternion(parent.clone().invert());
    const local=new Quaternion().setFromUnitVectors(axis,direction);
    result[joint]=degrees(local); return parent.clone().multiply(local);
  };
  // Current white-model labels use screen-left/-X and screen-right/+X in a frontal shot.
  for(const [side,shoulder,elbow,wrist,hip,knee,ankle,heel,toe] of [
    ['left',12,14,16,24,26,28,30,32],['right',11,13,15,23,25,27,29,31]
  ] as const){
    result[`${side}Shoulder`]=[0,0,0];
    if(image[elbow]![3]>.45 && image[wrist]![3]>.4) {
      const arm=chain(`${side}Arm`,shoulder,elbow,chest);
      const forearm=chain(`${side}Elbow`,elbow,wrist,arm);
      const finger=wrist===16?20:19;
      if(image[finger]![3]>.45)chain(`${side}Hand`,wrist,finger,forearm);
    }
    if(full){
      const thigh=chain(`${side}Leg`,hip,knee,pelvis), shin=chain(`${side}Knee`,knee,ankle,thigh);
      const footDirection=point(toe).sub(point(heel)).normalize().applyQuaternion(shin.clone().invert());
      result[`${side}Foot`]=degrees(new Quaternion().setFromUnitVectors(new Vector3(0,0,1),footDirection));
    }
  }
  const neck=middle(7,8).sub(shoulders).normalize().applyQuaternion(chest.clone().invert());
  const head=new Quaternion().setFromUnitVectors(up,neck);
  const face=point(0).sub(middle(7,8)).normalize().applyQuaternion(chest.clone().invert());
  const tilt=new Euler().setFromQuaternion(head);
  result.head=[MathUtils.clamp(MathUtils.radToDeg(tilt.x),-35,35),MathUtils.clamp(MathUtils.radToDeg(Math.atan2(face.x,face.z)),-55,55),MathUtils.clamp(MathUtils.radToDeg(tilt.z),-30,30)];
  // Fill every joint so low-confidence legs and hidden arms cannot carry a stale pose across a cut.
  for(const joint of Object.keys(directorJoints) as DirectorJoint[]) result[joint] ||= [0,0,0];
  return result;
}

export function captureDirector(recording:PoseRecording,name='视频动作复刻'):DirectorDocument {
  if(recording.version!==1 || !Number.isFinite(recording.duration) || recording.duration<2 || recording.duration>60 || !Array.isArray(recording.samples) || !recording.samples.length || recording.samples.length>1440) throw new Error('动作数据必须为 2–60 秒、最多 1440 帧');
  const doc=emptyDirector(); doc.duration=Math.ceil(recording.duration);
  const actor=newDirectorObject('actor');actor.name=name.slice(0,100);actor.grounded=true;actor.quaternionPose=true;
  let previous:DirectorPose={},lastFrame=-1,origin=.5,wasFull=false;
  const keys:ObjectKey[]=[];
  for(const sample of recording.samples){
    if(!Number.isInteger(sample.frame) || sample.frame<=lastFrame || sample.frame<0 || sample.frame>=doc.duration*24 || ![sample.world,sample.image].every(points=>Array.isArray(points) && (points.length===0 || points.length===33) && points.every(p=>Array.isArray(p) && p.length===4 && p.every(Number.isFinite)))) throw new Error('动作采样格式或时间顺序无效');
    lastFrame=sample.frame;
    if(!sample.world.length || !sample.image.length) continue;
    const full=fullBody(sample.image),hipX=(sample.image[23]![0]+sample.image[24]![0])/2;
    if(full&&!wasFull) origin=hipX; wasFull=full;
    const pose=retargetPose(sample);
    // Two-frame samples retain sharp beats. Small quaternion smoothing damps detector noise.
    for(const joint of Object.keys(directorJoints) as DirectorJoint[]) if(previous[joint]){
      const q=(v:Vec3)=>new Quaternion().setFromEuler(new Euler(...v.map(MathUtils.degToRad) as Vec3));
      pose[joint]=degrees(q(previous[joint]!).slerp(q(pose[joint]!),.8));
    }
    previous=pose;
    const shoulderWidth=Math.max(.08,Math.abs(sample.image[11]![0]-sample.image[12]![0]));
    keys.push({frame:sample.frame,position:[full ? Number(((hipX-origin)/shoulderWidth*.45).toFixed(4)) : 0,0,0],yaw:0,action:'idle',ease:'linear',pose});
  }
  if(keys.length<12) throw new Error('未找到足够的人物动作，请使用清晰的单人视频');
  if(keys[0]!.frame!==0)keys.unshift({...structuredClone(keys[0]!),frame:0});
  keys.push({...structuredClone(keys[keys.length-1]!),frame:doc.duration*24-1});actor.keys=keys.filter((k,i)=>!i||k.frame!==keys[i-1]!.frame);
  doc.objects=[actor];doc.camera.keys=[{frame:0,position:[0,1.1,6],target:[0,.9,0],fov:40,roll:0}];
  return validateDirector(doc);
}
