import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Box3,Vector3} from 'three';
import {emptyDirector,newDirectorObject,objectAt,resizeDirector,validateDirector} from '../src/utils/dramaDirector.ts';
import {captureDirector,retargetPose,type PoseRecording} from '../src/utils/dramaDirectorCapture.ts';
import {applyDirectorFrame,createDirectorWorld,directorFloorHeight,disposeDirectorWorld} from '../src/pages/short-drama/components/director/directorScene.ts';

test('extended pose documents preserve old rigs and validate 60 seconds with markers',()=>{
 const doc=emptyDirector();doc.duration=60;const actor=newDirectorObject('actor');actor.grounded=true;actor.quaternionPose=true;actor.keys[0]!.pose={pelvis:[0,25,0],leftShoulder:[0,0,-15],leftFoot:[20,0,0]};doc.objects=[actor];doc.markers=[{frame:1000,label:'后段'}];validateDirector(doc);
 assert.deepEqual(resizeDirector(doc,10).markers,[]);doc.duration=61;assert.throws(()=>validateDirector(doc));
});
test('pelvis rotation carries both leg and torso chains, ankle rotations carry only the foot',()=>{
 const doc=emptyDirector(),actor=newDirectorObject('actor');doc.objects=[actor];const world=createDirectorWorld(doc),p=world.puppets.get(actor.id)!;
 try{world.scene.updateMatrixWorld(true);const knee=p.joints.leftKnee.getWorldPosition(new Vector3());actor.keys[0]!.pose={pelvis:[0,0,25],leftFoot:[35,0,0],leftHand:[40,0,0]};applyDirectorFrame(world,doc,0);world.scene.updateMatrixWorld(true);assert.ok(knee.distanceTo(p.joints.leftKnee.getWorldPosition(new Vector3()))>.1);assert.ok(Math.abs(p.joints.leftFoot.rotation.x-35*Math.PI/180)<1e-8);assert.equal(p.joints.leftArm.parent,p.joints.leftShoulder);assert.equal(p.joints.leftHand.parent,p.joints.leftElbow);assert.ok(Math.abs(p.joints.leftHand.rotation.x-40*Math.PI/180)<1e-8);}finally{disposeDirectorWorld(world);}
});
test('grounding keeps a flexed support foot at ground without cancelling authored hop height',()=>{
 const doc=emptyDirector(),actor=newDirectorObject('actor');actor.grounded=true;actor.keys[0]!.pose={leftLeg:[-60,0,-25],leftKnee:[80,0,0],rightLeg:[-20,0,10],rightKnee:[40,0,0],pelvis:[0,0,15]};doc.objects=[actor];const world=createDirectorWorld(doc),p=world.puppets.get(actor.id)!;
 try{for(const height of [0,.2]){actor.keys[0]!.position[1]=height;applyDirectorFrame(world,doc,0);world.scene.updateMatrixWorld(true);assert.ok(Math.abs(Math.min(...p.feet.map(f=>new Box3().setFromObject(f).min.y))-height-directorFloorHeight-.003)<1e-8);}}finally{disposeDirectorWorld(world);}
});
test('quaternion pose interpolation follows the short turn rather than spinning through zero',()=>{
 const actor=newDirectorObject('actor');actor.quaternionPose=true;actor.keys=[{frame:0,position:[0,0,0],yaw:0,action:'idle',pose:{head:[0,0,170]}},{frame:24,position:[0,0,0],yaw:0,action:'idle',pose:{head:[0,0,-170]}}];assert.ok(Math.abs(objectAt(actor,12).pose!.head![2])>179);
});
test('capture fails closed for empty detections, non-finite coordinates and invalid frame order',()=>{
 assert.deepEqual(retargetPose({frame:0,world:[],image:[]}),{});
 const recording:PoseRecording={version:1,duration:3,samples:[{frame:0,world:[],image:[]}]};assert.throws(()=>captureDirector(recording),/足够/);recording.samples[0]!.world=Array.from({length:33},()=>[Infinity,0,0,1]);assert.throws(()=>captureDirector(recording),/格式/);
});
