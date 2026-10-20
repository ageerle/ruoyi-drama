import {writeFileSync} from 'node:fs';
import {battleDirector} from '../../../src/utils/dramaDirectorBattle.ts';
import {newDirectorObject, validateDirector, type Vec3, type ObjectKey} from '../../../src/utils/dramaDirector.ts';

const doc=battleDirector();
const key=(frame:number,position:Vec3,yaw=0):ObjectKey=>({frame,position,yaw,action:'idle',ease:'smooth'});
const time=(frame:number)=>frame<=168?Math.round(frame*120/168):120+Math.round((frame-168)*167/119);
const gate=doc.objects.find(o=>o.id==='gate')!;
gate.scale=[1.8,2,1.5];gate.name='主城门 · 门洞上缘受击';
for(const o of doc.objects.filter(o=>o.kind==='actor')) {
  o.keys=o.keys.map(k=>({...k,frame:time(k.frame),position:[k.position[0]*1.8,k.position[1]*2,k.position[2]+(k.position[1]===0?21:0)] as Vec3}));
  if(o.clips)o.clips=o.clips.map(c=>({...c,start:time(c.start),end:Math.min(288,time(c.end)),blend:Math.min(c.blend,4)}));
}
const cannon=doc.objects.find(o=>o.id==='cannon')!;
cannon.name='中路主炮 · 5秒发射';cannon.fireFrame=120;
cannon.keys=[key(0,[0,0,30.4],180),key(120,[0,0,30.4],180),key(125,[0,0,31.2],180),key(150,[0,0,31.2],180)];
for(const side of [-1,1]) {
  const flank=newDirectorObject('cannon');flank.id=`battery-${side}`;flank.name=side<0?'左翼待命炮':'右翼待命炮';flank.color='#526577';
  flank.targetId=gate.id;flank.keys=[key(0,[side*8,0,33],180)];doc.objects.push(flank);
  for(let part=0;part<2;part++) {
    const wall=newDirectorObject('wall');wall.id=`wing-${side}-${part}`;wall.name=`城墙${side<0?'左':'右'}翼 ${part+1}`;wall.color='#b4c0ca';wall.locked=true;
    wall.scale=[18,7.7,1.6];wall.keys=[key(0,[side*(19+18*part),0,0])];doc.objects.push(wall);
  }
}
for(let row=0;row<3;row++)for(let column=0;column<8;column++) {
  const actor=newDirectorObject('actor');actor.id=`attack-${row}-${column}`;actor.name=`土匪阵列 ${row+1}-${column+1}`;
  actor.color=['#b49878','#a4886d','#927a63'][(row+column)%3]!;actor.grounded=true;
  let x=(column-3.5)*2.4;if(Math.abs(x)<3.3)x+=Math.sign(x)*1.8;
  const z=35+row*2.8,move=170+row*8;
  actor.keys=[key(0,[x,0,z],180),key(move,[x,0,z],180),key(280,[x,0,z-5.8],180),key(287,[x,0,z-5.8],180)];
  actor.clips=[{id:crypto.randomUUID(),action:'crouch',start:121+(column%3)*2,end:155,strength:.35,speed:1,blend:4},
    {id:crypto.randomUUID(),action:'run',start:move,end:280,strength:.75,speed:1,blend:4}];doc.objects.push(actor);
}
for(const side of [-1,1])for(let i=0;i<6;i++) {
  const actor=newDirectorObject('actor');actor.id=`defend-${side}-${i}`;actor.name=`城墙${side<0?'左':'右'}翼守军 ${i+1}`;actor.color=i%2?'#4f759d':'#789dc1';
  actor.keys=[key(0,[side*(10.6+i*4.4),7.7,0]),key(287,[side*(10.6+i*4.4),7.7,0])];
  actor.clips=[{id:crypto.randomUUID(),action:'point',start:16,end:106,strength:.5,speed:1,blend:4},
    {id:crypto.randomUUID(),action:'crouch',start:134+(i%3)*2,end:247,strength:.8,speed:1,blend:4}];doc.objects.push(actor);
}
for(let i=0;i<3;i++) {
  const roof=newDirectorObject('box');roof.id=`city-${i}`;roof.name=`城内建筑占位 ${i+1}`;roof.color='#abb8c7';roof.locked=true;
  roof.scale=[5+i,8+i*2,4];roof.keys=[key(0,[i*12-12,0,-15-i*5])];doc.objects.push(roof);
}
doc.camera.keys=[{frame:0,position:[30,17,54],target:[0,5,19],fov:55,roll:0,ease:'smooth'},
  {frame:112,position:[22,12,42],target:[0,5.3,13],fov:52,roll:0,ease:'smooth'},
  {frame:150,position:[21,12,41],target:[0,5.3,12],fov:52,roll:0,ease:'smooth'},
  {frame:287,position:[19,11,34],target:[0,5.4,8],fov:50,roll:0,ease:'smooth'}];
doc.markers=[{frame:0,label:'城防纵深 · 三炮与攻守阵列'},{frame:72,label:'主炮准备 · 两翼待命'},
  {frame:120,label:'主炮发射 · 炮架后坐'},{frame:132,label:'命中门洞上缘 · 墙体塌落'},
  {frame:168,label:'守军伏身 · 炮烟与城门扬尘分开'},{frame:200,label:'攻城队列推进 · 缺口持续'}];
const result=validateDirector(doc);
writeFileSync('output/city-defense/宏大攻城-导演工程.json',JSON.stringify(result,null,2));
console.log(JSON.stringify({objects:result.objects.length,actors:result.objects.filter(o=>o.kind==='actor').length,cannons:result.objects.filter(o=>o.kind==='cannon').length,seconds:result.duration}));
