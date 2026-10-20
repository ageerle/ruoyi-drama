import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cameraAt, emptyDirector, newDirectorObject, objectAt, resizeDirector, sampleDirector, performanceDirector, moveDirectorKey, totalFrames, upsertKey, validateDirector } from '../src/utils/dramaDirector.ts';
import { actorMotion, actionPose, newActionClip, mirrorDirectorPose } from '../src/utils/dramaDirectorMotion.ts';
import { cloneCanvasSelection, emptyCanvas, newCanvasNode, connectionIssue } from '../src/utils/dramaCanvas.ts';

test('new documents begin with no actors and a usable camera', () => { const doc = validateDirector(emptyDirector()); assert.equal(doc.objects.length,0); assert.equal(totalFrames(doc),192); assert.notDeepEqual(cameraAt(doc,0).position,cameraAt(doc,0).target); });
test('character paths interpolate while facing crosses the shortest angle', () => {
  const actor=newDirectorObject('actor'); actor.keys=[{frame:0,position:[0,0,0],yaw:170,action:'walk'},{frame:24,position:[4,0,0],yaw:-170,action:'wave'}];
  assert.deepEqual(objectAt(actor,12).position,[2,0,0]); assert.equal(Math.abs(objectAt(actor,12).yaw),180); assert.equal(objectAt(actor,12).action,'walk'); assert.equal(objectAt(actor,24).action,'wave');
});
test('joint offsets interpolate independently of movement and timed action clips',()=>{
  const doc=performanceDirector(),actor=doc.objects[0]!;validateDirector(doc);
  const halfway=objectAt(actor,144).pose!;assert.equal(halfway.rightElbow![0],-22.5);
  const result=actorMotion(actor,168);assert.equal(result.rightElbow![0],actionPose('reach',2)["rightElbow"]![0]-30);
  const early=actorMotion(actor,120);assert.equal(early.rightArm![0],0); // Smooth clip entrance starts at its baseline.
  const full=actorMotion(actor,132);assert.equal(full.rightArm![0],-75);
  actor.clips![2]!.strength=.5;assert.equal(actorMotion(actor,132).rightArm![0],-37.5);
  actor.clips![2]!.speed=2;assert.equal(actorMotion(actor,132).rightArm![0],-37.5); // Static reach unaffected by phase speed.
});
test('clip timing, playback speed and gaps produce deterministic actor poses',()=>{
  const actor=newDirectorObject('actor');const clip=newActionClip(actor,24,191,'walk');actor.clips=[{...clip,end:96,blend:0}];
  const normal=actorMotion(actor,30).leftLeg![0];actor.clips[0]!.speed=2;assert.notEqual(actorMotion(actor,30).leftLeg![0],normal);
  assert.equal(actorMotion(actor,23).leftLeg![0],0);assert.equal(actorMotion(actor,96).leftLeg![0],0);
  assert.throws(()=>newActionClip(actor,40,191,'wave'),/已有/);assert.equal(newActionClip(actor,96,191,'wave').start,96);
});
test('automatic facing, head targets and camera follow track moving objects',()=>{
  const doc=sampleDirector(),actor=doc.objects[0]!;actor.autoFace=true;assert.equal(objectAt(actor,12).yaw,90);assert.equal(objectAt(actor,191).yaw,90);
  doc.camera.follow={objectId:actor.id,mode:'follow',offset:[0,2,5],height:1.3};const camera=cameraAt(doc,48);assert.deepEqual(camera.position,[-1.5,2,5]);assert.deepEqual(camera.target,[-1.5,1.3,0]);
  doc.camera.follow.mode='aim';assert.notDeepEqual(cameraAt(doc,48).position,camera.position);
  actor.autoFace=false;actor.keys[0]!.yaw=0;actor.lookAtId=doc.objects[1]!.id;assert.equal(actorMotion(actor,0,doc).head![1],70);
});
test('shortening retains joint endpoints and trims action ranges without invalid blend lengths',()=>{
  const doc=performanceDirector();
  const six=resizeDirector(doc,6),expected=objectAt(doc.objects[0]!,143);validateDirector(six);assert.deepEqual(objectAt(six.objects[0]!,143).pose,expected.pose);
  assert.equal(six.objects[0]!.clips!.at(-1)!.end,144);assert.equal(six.objects[1]!.clips!.length,1);
});
test('retiming never overwrites a key or moves the initial anchor and pose mirror swaps limbs',()=>{
  const keys=sampleDirector().objects[0]!.keys;assert.throws(()=>moveDirectorKey(keys,0,48,191),/第 0 帧/);assert.throws(()=>moveDirectorKey(keys,96,191,191),/已有/);
  assert.deepEqual(moveDirectorKey(keys,96,120,191).map(k=>k.frame),[0,120,191]);assert.deepEqual(moveDirectorKey(keys,0,48,191,true).map(k=>k.frame),[0,48,96,191]);
  assert.deepEqual(mirrorDirectorPose({rightArm:[-60,10,-20]}).leftArm,[-60,-10,20]);
});
test('invalid poses, overlapping clips, dangling targets and bad follow geometry fail closed',()=>{
  const invalid = [ (d:ReturnType<typeof performanceDirector>)=>{d.objects[0]!.keys[0]!.pose={head:[0,181,0]};},
    (d:ReturnType<typeof performanceDirector>)=>{d.objects[0]!.clips![1]!.start=10;},(d:ReturnType<typeof performanceDirector>)=>{d.objects[0]!.clips![0]!.speed=0;},
    (d:ReturnType<typeof performanceDirector>)=>{d.objects[0]!.lookAtId='missing';},(d:ReturnType<typeof performanceDirector>)=>{d.camera.follow={objectId:d.objects[0]!.id,mode:'follow',offset:[0,1.3,0],height:1.3};} ];
  invalid.forEach(edit=>{const doc=performanceDirector();edit(doc);assert.throws(()=>validateDirector(doc));});
});
test('editing a key updates the same frame and shortening a clip keeps the interpolated endpoint', () => {
  const doc=sampleDirector(), original=cameraAt(doc,95), originalActor=objectAt(doc.objects[0]!,95); const shorter=resizeDirector(doc,4);
  assert.deepEqual(cameraAt(shorter,95),original); assert.deepEqual(objectAt(shorter.objects[0]!,95),originalActor); validateDirector(shorter);
  const keys=upsertKey(shorter.camera.keys,{...original,fov:52}); assert.equal(keys.length,shorter.camera.keys.length); assert.equal(keys[keys.length-1]!.fov,52);
});
test('unsafe imports reject invalid paths, missing initial frames, duplicate IDs and bad camera geometry', () => {
  let doc=sampleDirector(); doc.objects[0]!.keys[0]!.position[0]=Infinity; assert.throws(()=>validateDirector(doc));
  doc=sampleDirector(); doc.objects[0]!.keys.shift(); assert.throws(()=>validateDirector(doc));
  doc=sampleDirector(); doc.objects[1]!.id=doc.objects[0]!.id; assert.throws(()=>validateDirector(doc));
  doc=sampleDirector(); doc.camera.keys[0]!.target=[...doc.camera.keys[0]!.position]; assert.throws(()=>validateDirector(doc));
});
test('director node copies fork their scene and cannot silently act as generated video',()=>{
  const doc=emptyCanvas(), n=newCanvasNode('previs',{x:0,y:0}), video=newCanvasNode('video',{x:400,y:0}); doc.nodes=[n,video];
  const cloned=cloneCanvasSelection(doc,[n.id]).nodes[0]!; assert.notEqual(cloned.id,n.id); assert.equal(cloned.data.directorSourceId,n.id); assert.match(connectionIssue(doc,n.id,video.id),/尚未接入/);
});
