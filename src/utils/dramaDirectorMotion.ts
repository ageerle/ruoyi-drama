import { directorJoints, easeValue, interpolatePose, objectAt, type ActionClip, type DirectorAction, type DirectorDocument, type DirectorJoint, type DirectorObject, type DirectorPose, type Vec3 } from './dramaDirector.ts';

/** Pure joint rotations in degrees. Shared by the viewport, exports and motion tests. */
export function actionPose(action: DirectorAction, seconds: number, strength = 1): DirectorPose {
  const p: DirectorPose = { height: 0 };
  const set = (joint: DirectorJoint, x = 0, y = 0, z = 0) => { p[joint] = [x, y, z]; };
  const fast = action === 'run', stride = Math.sin(seconds * (fast ? 12 : 7));
  if (action === 'walk' || fast) {
    set('leftLeg', stride * (fast ? 48 : 28)); set('rightLeg', -stride * (fast ? 48 : 28));
    set('leftArm', -stride * 25); set('rightArm', stride * 25);
    set('leftKnee', Math.max(0,-stride) * 35); set('rightKnee', Math.max(0,stride) * 35);
    set('leftElbow',fast ? -45 : -12); set('rightElbow',fast ? -45 : -12); set('torso',fast ? 10 : 0);
    p.height = Math.abs(Math.cos(seconds * (fast ? 12 : 7))) * (fast ? .07 : .025);
  } else if (action === 'wave') {
    // The right shoulder is on +X: positive Z raises the arm away from the head.
    set('rightArm',0,0,145); set('rightElbow',-30,0,Math.sin(seconds*8)*25); set('head',0,Math.sin(seconds*2)*6);
  } else if (action === 'reach' || action === 'point') {
    set('rightArm', action === 'point' ? -95 : -75, action === 'point' ? -15 : 0); set('rightElbow',-12); set('torso',8); set('head',-4,-8);
  } else if (action === 'sit') {
    p.height = -.43; set('leftLeg',-90); set('rightLeg',-90); set('leftKnee',90); set('rightKnee',90); set('leftArm',-18); set('rightArm',-18); set('leftElbow',-25); set('rightElbow',-25);
  } else if (action === 'crouch') {
    p.height = -.48; set('leftLeg',-70); set('rightLeg',-70); set('leftKnee',105); set('rightKnee',105); set('torso',30); set('leftArm',-38); set('rightArm',-38);
  } else if (action === 'bow') { set('torso',38); set('head',12); set('leftArm',-12); set('rightArm',-12); }
  else if (action === 'nod') set('head',Math.sin(seconds*5)*18);
  else if (action === 'shakeHead') set('head',0,Math.sin(seconds*5)*28);
  else if (action === 'talk') { set('rightArm',-25,0,-12); set('rightElbow',-55+Math.sin(seconds*4)*18); set('leftElbow',-20); set('head',Math.sin(seconds*2)*4); }
  for (const joint of Object.keys(directorJoints) as DirectorJoint[]) if (p[joint]) p[joint] = p[joint]!.map(v => v * strength) as Vec3;
  // Larger gesture strengths must not swing the raised arm back through the head.
  if (action === 'wave') p.rightArm![2] = Math.min(155,p.rightArm![2]);
  p.height! *= strength; return p;
}

export function actorMotion(object: DirectorObject, frame: number, doc?: DirectorDocument): DirectorPose {
  const key = objectAt(object,frame), anchor = object.keys.slice().reverse().find(k => k.frame <= frame) || object.keys[0]!;
  let result = actionPose(key.action,(frame-anchor.frame)/24);
  const clip = object.clips?.find(c => frame >= c.start && frame < c.end);
  if (clip) {
    const target = actionPose(clip.action,(frame-clip.start)/24*clip.speed,clip.strength);
    // A clip blends from/to the underlying action; custom joint offsets stay independent.
    const weight = clip.blend === 0 ? 1 : Math.min(easeValue(Math.min(1,(frame-clip.start)/clip.blend),'smooth'),easeValue(Math.min(1,(clip.end-frame)/clip.blend),'smooth'));
    result = interpolatePose(result,target,weight);
  }
  for (const joint of Object.keys(directorJoints) as DirectorJoint[]) {
    const a = result[joint] || [0,0,0], b = key.pose?.[joint] || [0,0,0]; result[joint] = a.map((v,i) => v+b[i]!) as Vec3;
  }
  result.height = (result.height || 0)+(key.pose?.height || 0);
  const target = doc?.objects.find(o => o.id === object.lookAtId);
  if (target) {
    const there = objectAt(target,frame), dx=there.position[0]-key.position[0], dz=there.position[2]-key.position[2];
    if(Math.hypot(dx,dz)>.01) { const angle = ((Math.atan2(dx,dz)*180/Math.PI-key.yaw+540)%360)-180; result.head![1] += Math.max(-70,Math.min(70,angle)); }
  }
  return result;
}

/** Finds an unoccupied interval beginning at the playhead. End is exclusive. */
export function newActionClip(object: DirectorObject, frame: number, last: number, action: DirectorAction): ActionClip {
  if (object.clips?.some(c => frame >= c.start && frame < c.end)) throw new Error('当前时刻已有动作片段，先移到空白时段或编辑该片段');
  const next = object.clips?.find(c => c.start > frame)?.start ?? last+1, end = Math.min(frame+48,next,last+1);
  if (end-frame < 2) throw new Error('片段末尾空间不足，请移到更早的时刻');
  return {id:crypto.randomUUID(),action,start:frame,end,speed:1,strength:1,blend:Math.min(6,Math.floor((end-frame)/2))};
}

export function mirrorDirectorPose(pose: DirectorPose): DirectorPose {
  const next: DirectorPose = {height:pose.height};
  for(const joint of Object.keys(directorJoints) as DirectorJoint[]) {
    const source = joint.startsWith('left') ? joint.replace('left','right') as DirectorJoint : joint.startsWith('right') ? joint.replace('right','left') as DirectorJoint : joint;
    if(pose[source]) next[joint] = [pose[source]![0],-pose[source]![1],-pose[source]![2]];
  }
  return next;
}
