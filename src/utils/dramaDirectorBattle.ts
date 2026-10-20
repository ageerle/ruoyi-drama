import {emptyDirector,newDirectorObject,validateDirector,type ObjectKey,type Vec3,type ActionClip} from './dramaDirector.ts';

/** Editable siege blocking: attackers fire at the gate; defenders react to damage. */
export function battleDirector() {
  const doc=emptyDirector();doc.duration=12;
  const castle=newDirectorObject('castle');castle.id='gate';castle.name='城池 · 受击城门';castle.color='#b4c0ca';castle.locked=true;
  const cannon=newDirectorObject('cannon');cannon.id='cannon';cannon.name='土匪攻城炮 · 7秒发射';cannon.color='#526577';cannon.fireFrame=168;cannon.targetId=castle.id;
  const key=(frame:number,position:Vec3,yaw=0):ObjectKey=>({frame,position,yaw,action:'idle',ease:'smooth'});
  cannon.keys=[key(0,[0,0,9.4],180),key(168,[0,0,9.4],180),key(173,[0,0,9.75],180),key(192,[0,0,9.4],180)];
  const clip=(action:ActionClip['action'],start:number,end:number,strength=.8):ActionClip=>({id:crypto.randomUUID(),action,start,end,speed:1,strength,blend:6});
  const gunner=newDirectorObject('actor');gunner.id='gunner';gunner.name='土匪 · 炮手';gunner.color='#b49878';gunner.grounded=true;
  gunner.keys=[key(0,[1.25,0,9.15],-90),{...key(120,[1.25,0,9.15],-90),pose:{torso:[12,0,0]}},key(166,[1.25,0,9.15],-90),key(180,[1.7,0,9.5],-90),key(216,[1.7,0,9.5],180),key(280,[2.1,0,6.5],180),key(287,[2.1,0,6.5],180)];
  gunner.clips=[clip('reach',48,166,.8),clip('crouch',168,198,.4),clip('run',216,280,.65)];
  const leader=newDirectorObject('actor');leader.id='leader';leader.name='土匪 · 指挥推进';leader.color='#927a63';leader.grounded=true;
  leader.keys=[key(0,[-1.7,0,9.1],180),key(168,[-1.7,0,9.1],180),key(192,[-2,0,9.3],180),key(216,[-2,0,9.3],180),key(280,[-2.2,0,6.3],180),key(287,[-2.2,0,6.3],180)];
  leader.clips=[clip('point',24,144,.7),clip('crouch',168,198,.35),clip('run',216,280,.65)];
  const defender=(id:string,name:string,x:number,color:string)=>{
    const actor=newDirectorObject('actor');actor.id=id;actor.name=name;actor.color=color;
    actor.keys=[key(0,[x,3.85,0]),key(168,[x,3.85,0]),key(287,[x,3.85,0])];
    actor.clips=[clip('point',24,144,.55),clip('crouch',177,234,.95)];return actor;
  };
  doc.objects=[castle,cannon,gunner,leader,defender('guard-left','官军 · 左城墙守卫',-3.1,'#789dc1'),defender('guard-right','官军 · 右城墙守卫',3.1,'#4f759d')];
  doc.camera.keys=[{frame:0,position:[12,7,16],target:[0,2.9,4.1],fov:48,roll:0,ease:'smooth'},
    {frame:144,position:[10,6,14.3],target:[0,3,3.6],fov:48,roll:0,ease:'smooth'},
    {frame:216,position:[10,6,14.3],target:[0,3,3.6],fov:48,roll:0,ease:'smooth'},
    {frame:287,position:[10.5,6.5,14.8],target:[0,2.7,3.2],fov:48,roll:0}];
  doc.markers=[{frame:0,label:'土匪架炮 · 官军守城'},{frame:72,label:'炮手准备'},{frame:168,label:'向城门开炮'},{frame:180,label:'命中城门 · 碎砖崩落'},{frame:198,label:'官军伏身避险'},{frame:216,label:'破口留下 · 土匪推进'}];
  return validateDirector(doc);
}
