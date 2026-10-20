import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Vector3 } from 'three';
import { emptyDirector, newDirectorObject, performanceDirector } from '../src/utils/dramaDirector.ts';
import { applyDirectorFrame, createDirectorWorld, disposeDirectorWorld } from '../src/pages/short-drama/components/director/directorScene.ts';

test('leaning the torso leaves pelvis leg chains planted and moves the upper body',()=>{
  const doc=emptyDirector(),actor=newDirectorObject('actor');doc.objects=[actor];const world=createDirectorWorld(doc),p=world.puppets.get(actor.id)!;
  try { world.scene.updateMatrixWorld(true); const knee=p.joints.leftKnee.getWorldPosition(new Vector3()),head=p.joints.head.getWorldPosition(new Vector3());
    actor.keys[0]!.pose={torso:[40,0,0]};applyDirectorFrame(world,doc,0);world.scene.updateMatrixWorld(true);
    assert.ok(p.joints.leftKnee.getWorldPosition(new Vector3()).distanceTo(knee)<1e-9);assert.ok(p.joints.head.getWorldPosition(new Vector3()).distanceTo(head)>.1);
    assert.equal(p.joints.leftLeg.parent,p.joints.pelvis);assert.equal(p.joints.leftElbow.parent,p.joints.leftArm);
  } finally {disposeDirectorWorld(world);}
});
test('a height offset moves both pelvis legs and torso together, and elbow rotations survive rendering',()=>{
  const doc=emptyDirector(),actor=newDirectorObject('actor');actor.keys[0]!.pose={height:-.3,rightElbow:[-45,0,0]};doc.objects=[actor];const world=createDirectorWorld(doc),p=world.puppets.get(actor.id)!;
  try {world.scene.updateMatrixWorld(true);assert.ok(Math.abs(p.joints.torso.getWorldPosition(new Vector3()).y-.7)<1e-9);assert.ok(Math.abs(p.joints.leftLeg.getWorldPosition(new Vector3()).y-.61)<1e-9);assert.ok(Math.abs(p.joints.rightElbow.rotation.x+Math.PI/4)<1e-9);}
  finally {disposeDirectorWorld(world);}
});

test('the waving right arm stays clear of the head throughout the example and supported strengths',()=>{
  const doc=performanceDirector(),actor=doc.objects.find(o=>o.kind==='actor')!,world=createDirectorWorld(doc),p=world.puppets.get(actor.id)!;
  const segmentDistance=(point:Vector3,a:Vector3,b:Vector3)=>{
    const direction=b.clone().sub(a),t=Math.max(0,Math.min(1,point.clone().sub(a).dot(direction)/direction.lengthSq()));
    return point.distanceTo(a.clone().addScaledVector(direction,t));
  };
  const check=(frame:number,label:string)=>{
    applyDirectorFrame(world,doc,frame);world.scene.updateMatrixWorld(true);
    const head=p.joints.head.localToWorld(new Vector3(0,.12,0)),shoulder=p.joints.rightArm.getWorldPosition(new Vector3());
    const elbow=p.joints.rightElbow.getWorldPosition(new Vector3()),hand=p.joints.rightElbow.localToWorld(new Vector3(0,-.32,0));
    assert.ok(head.distanceTo(elbow)>.14+.065,`${label}: elbow intersects head`);
    assert.ok(head.distanceTo(hand)>.14+.07,`${label}: hand intersects head`);
    assert.ok(segmentDistance(head,shoulder,elbow)>.14+.065,`${label}: upper arm intersects head`);
    assert.ok(segmentDistance(head,elbow,hand)>.14+.052,`${label}: forearm intersects head`);
  };
  try {
    for(let frame=72;frame<120;frame++)check(frame,`example frame ${frame}`);
    actor.keys=[{frame:0,position:[0,0,0],yaw:0,action:'idle'}];actor.lookAtId=undefined;
    for(const strength of [.25,.5,.85,1,1.25,1.5]){
      actor.clips=[{id:'wave',action:'wave',start:0,end:120,speed:1,strength,blend:0}];
      for(let frame=0;frame<120;frame++)check(frame,`strength ${strength}, frame ${frame}`);
    }
  }finally{disposeDirectorWorld(world);}
});
