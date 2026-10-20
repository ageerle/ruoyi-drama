import {test} from 'node:test';
import assert from 'node:assert/strict';
import {battleDirector} from '../src/utils/dramaDirectorBattle.ts';
import {resizeDirector,validateDirector} from '../src/utils/dramaDirector.ts';
import {createDirectorWorld,applyDirectorFrame,disposeDirectorWorld} from '../src/pages/short-drama/components/director/directorScene.ts';

test('siege points at the gate and supports shortening safely',()=>{
  const doc=battleDirector();assert.equal(doc.objects.filter(o=>o.kind==='actor').length,4);
  assert.equal(doc.objects.find(o=>o.kind==='cannon')!.fireFrame,168);
  assert.equal(doc.objects.find(o=>o.kind==='cannon')!.targetId,'gate');
  assert.doesNotThrow(()=>validateDirector(resizeDirector(doc,6)));
  assert.equal(resizeDirector(doc,6).objects.find(o=>o.kind==='cannon')!.fireFrame,undefined);
  doc.objects.find(o=>o.kind==='cannon')!.fireFrame=288;assert.throws(()=>validateDirector(doc));
});
test('cannon effects are deterministic when seeking forward and backwards across the shot',()=>{
  const doc=battleDirector(),world=createDirectorWorld(doc),root=world.objects.get('cannon')!;
  try {
    applyDirectorFrame(world,doc,160);assert.equal(root.getObjectByName('fire-flash')!.visible,false);
    applyDirectorFrame(world,doc,168);assert.equal(root.getObjectByName('fire-flash')!.visible,true);
    applyDirectorFrame(world,doc,183);assert.equal(root.getObjectByName('fire-flash')!.visible,false);assert.equal(root.getObjectByName('fire-impact')!.visible,false);
    assert.equal(world.objects.get('gate')!.getObjectByName('gate-dust')!.visible,true);
    const puff=root.getObjectByName('fire-smoke')!.children[0]!,position=puff.position.clone(),scale=puff.scale.clone();
    applyDirectorFrame(world,doc,250);assert.equal(root.getObjectByName('fire-smoke')!.visible,false);
    applyDirectorFrame(world,doc,183);assert.deepEqual(puff.position.toArray(),position.toArray());assert.deepEqual(puff.scale.toArray(),scale.toArray());
    applyDirectorFrame(world,doc,0);assert.equal(root.getObjectByName('fire-impact')!.visible,false);
  }finally{disposeDirectorWorld(world);}
});
test('gate damage persists after dust clears and scrubbing restores the intact wall',()=>{
  const doc=battleDirector(),world=createDirectorWorld(doc),bricks=world.objects.get('gate')!.getObjectByName('gate-bricks')!;
  try {
    const initial=bricks.children.map(b=>b.position.toArray());
    applyDirectorFrame(world,doc,170);assert.deepEqual(bricks.children.map(b=>b.position.toArray()),initial);
    applyDirectorFrame(world,doc,287);assert.ok(bricks.children.every(b=>b.position.y<.4));
    assert.equal(world.objects.get('gate')!.getObjectByName('gate-dust')!.visible,false);
    applyDirectorFrame(world,doc,0);assert.deepEqual(bricks.children.map(b=>b.position.toArray()),initial);
    const invalid=battleDirector();invalid.objects.find(o=>o.kind==='cannon')!.targetId='gunner';assert.throws(()=>validateDirector(invalid));
  }finally{disposeDirectorWorld(world);}
});
