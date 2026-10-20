import {readFileSync,writeFileSync} from 'node:fs';
import {captureDirector,type PoseRecording} from '../../../src/utils/dramaDirectorCapture.ts';
import {validateDirector} from '../../../src/utils/dramaDirector.ts';
import {applyDirectorFrame,createDirectorWorld,disposeDirectorWorld} from '../../../src/pages/short-drama/components/director/directorScene.ts';
import {Box3,Vector3} from 'three';
import {correctCaptureArms} from '../../../src/pages/short-drama/components/director/directorCaptureCorrection.ts';
const root='output/reference-motion/',recording=JSON.parse(readFileSync(root+'capture.json','utf8')) as PoseRecording;
const doc=correctCaptureArms(captureDirector(recording,'参考动作 · 闪身步 / 浪子踢球 / 狗熊哆嗦毛'));doc.objects[0]!.id='reference-performer';
doc.markers=[{frame:60,label:'闪身步'},{frame:300,label:'浪子踢球'},{frame:600,label:'狗熊哆嗦毛'},{frame:732,label:'最后一轮与收势'}];
// Reproduce the source cuts rather than giving the upper-body intros invented footwork.
const camera=(frame:number,close=false)=>({frame,position:[0,close?1.58:1.04,close?1.65:3.7] as [number,number,number],target:[0,close?1.55:.96,0] as [number,number,number],fov:40,roll:0,ease:'hold' as const});
doc.camera.keys=[camera(0,true),camera(55),camera(224,true),camera(287),camera(392,true),camera(451),camera(681,true),camera(729),camera(791)];
const checked=validateDirector(doc);writeFileSync(root+'参考动作-完整导演工程.json',JSON.stringify(checked));
const world=createDirectorWorld(doc),puppet=world.puppets.get(doc.objects[0]!.id)!;
let minimumFoot=Infinity,headClearance=Infinity;let nearHeadFrames=0;
for(let frame=0;frame<doc.duration*24;frame++){
 applyDirectorFrame(world,doc,frame);world.scene.updateMatrixWorld(true);
 minimumFoot=Math.min(minimumFoot,...puppet.feet.map(foot=>new Box3().setFromObject(foot).min.y));
 const head=puppet.joints.head.localToWorld(new Vector3(0,.12,0));
 let clearance=Infinity;
 for(const side of ['left','right'] as const){const elbow=puppet.joints[`${side}Elbow`];const hand=elbow.localToWorld(new Vector3(0,-.32,0));clearance=Math.min(clearance,head.distanceTo(hand)-.21,head.distanceTo(elbow.getWorldPosition(new Vector3()))-.205);}
 headClearance=Math.min(headClearance,clearance);if(clearance<0)nearHeadFrames++;
}
disposeDirectorWorld(world);
const report={sourceDuration:recording.duration,documentDuration:doc.duration,samples:recording.samples.length,detected:recording.samples.filter(s=>s.world.length===33).length,keys:doc.objects[0]!.keys.length,frames:doc.duration*24,minimumFoot,minimumHeadJointClearance:headClearance,nearHeadFrames,scope:'foot soles and hand/elbow spheres against own head; monocular pose estimate, not full collision or motion-capture acceptance'};
writeFileSync(root+'设计校验.json',JSON.stringify(report,null,2));console.log(report);
