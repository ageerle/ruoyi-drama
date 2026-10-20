import assert from 'node:assert/strict';
import { test } from 'node:test';
import { newCanvasNode, emptyCanvas, connectionIssue, cloneCanvasSelection, groupCanvasSelection, removeCanvasNodes, orderedCanvasVideos, validateCanvas } from '../src/utils/dramaCanvas.ts';

test('typed input connections reject cycles, duplicates and unsupported dependencies', () => {
  const a=newCanvasNode('image',{x:0,y:0}), b=newCanvasNode('image',{x:350,y:0}), video=newCanvasNode('video',{x:700,y:0});
  const doc={...emptyCanvas(),nodes:[a,b,video],edges:[{id:'ab',source:a.id,target:b.id}]};
  assert.equal(connectionIssue(doc,b.id,video.id),'');
  assert.match(connectionIssue(doc,b.id,a.id),/循环/);
  assert.match(connectionIssue(doc,a.id,b.id),/存在/);
  assert.match(connectionIssue(doc,video.id,a.id),/不能/);
  assert.throws(()=>validateCanvas({...doc,edges:[...doc.edges,{id:'ba',source:b.id,target:a.id}]}),/循环/);
  assert.throws(()=>validateCanvas({...doc,edges:[{id:'lost',source:'missing',target:b.id}]}));
});

test('copying a production group resets task identity and remaps actor, membership and internal edges', () => {
  const actor=newCanvasNode('image',{x:0,y:0}), voice=newCanvasNode('audio',{x:350,y:0}), video=newCanvasNode('video',{x:700,y:0});
  actor.data.business={id:'actor-paid',type:'character',appearanceId:'approved'};actor.data.url='/approved.png';
  voice.data.actorNodeId=actor.id;video.data.business={id:'shot-paid',type:'shot'};video.data.job={id:'paid-task',model:'model',type:'video',status:'processing'};
  const base={...emptyCanvas(),nodes:[actor,voice,video],edges:[{id:'av',source:actor.id,target:video.id}]};
  const grouped=groupCanvasSelection(base,base.nodes.map(n=>n.id));
  const cloned=cloneCanvasSelection({...base,nodes:[grouped.group,...grouped.nodes]},[grouped.group.id]);
  assert.equal(cloned.nodes.length,4);
  const image=cloned.nodes.find(n=>n.kind==='image')!, audio=cloned.nodes.find(n=>n.kind==='audio')!, movie=cloned.nodes.find(n=>n.kind==='video')!;
  assert.equal(audio.data.actorNodeId,image.id);assert.equal(image.data.url,'/approved.png');
  assert.equal(movie.data.business,undefined);assert.equal(movie.data.job,undefined);
  assert.equal(image.parentId,cloned.nodes.find(n=>n.kind==='group')!.id);
  assert.equal(cloned.edges[0]!.source,image.id);assert.equal(cloned.edges[0]!.target,movie.id);
  assert.equal(video.data.job.id,'paid-task');
});

test('removing a group keeps business media and dissolves membership; removing a node removes its edges', () => {
  const actor=newCanvasNode('image',{x:0,y:0}), movie=newCanvasNode('video',{x:350,y:0});
  movie.data.business={id:'existing',type:'shot'};
  const base={...emptyCanvas(),nodes:[actor,movie],edges:[{id:'am',source:actor.id,target:movie.id}]};
  const grouped=groupCanvasSelection(base,[actor.id,movie.id]);
  const dissolved=removeCanvasNodes({...base,nodes:[grouped.group,...grouped.nodes]},[grouped.group.id]);
  assert.equal(dissolved.nodes.length,2);assert.equal(dissolved.nodes[1]!.data.business?.id,'existing');
  assert.equal(dissolved.nodes[0]!.parentId,undefined);assert.equal(dissolved.edges.length,1);
  assert.equal(removeCanvasNodes(dissolved,[actor.id]).edges.length,0);
});

test('explicit video sequence controls composition ahead of numeric order', () => {
  const first=newCanvasNode('video',{x:0,y:0}), second=newCanvasNode('video',{x:350,y:0});
  assert.equal(first.data.useStartFrame,false);
  first.data.order=20;second.data.order=1;
  const doc={...emptyCanvas(),nodes:[second,first],edges:[{id:'seq',source:first.id,target:second.id}]};
  assert.deepEqual(orderedCanvasVideos(doc).map(n=>n.id),[first.id,second.id]);
  assert.deepEqual(validateCanvas(doc),doc);
  assert.throws(()=>validateCanvas({...doc,nodes:[{...first,parentId:'missing-group'},second]}),/分组/);
});
