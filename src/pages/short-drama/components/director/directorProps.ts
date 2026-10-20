import * as T from 'three';
import type { DirectorObject } from '@/utils/dramaDirector';

function part(parent:T.Object3D, geometry:T.BufferGeometry, material:T.Material, x=0,y=0,z=0) {
  const item=new T.Mesh(geometry,material);item.position.set(x,y,z);item.castShadow=true;item.receiveShadow=true;parent.add(item);return item;
}
export function createDirectorProp(object:DirectorObject):T.Group {
  const root=new T.Group(),mat=new T.MeshStandardMaterial({color:object.color,roughness:.8});
  const block=(x:number,y:number,z:number,w:number,h:number,d:number)=>part(root,new T.BoxGeometry(w,h,d),mat,x,y,z);
  if(object.kind==='castle') {
    block(-4,1.9,0,4,3.8,1.2);block(4,1.9,0,4,3.8,1.2);
    block(-1.75,3.3,0,.5,1,1.2);block(1.75,3.3,0,.5,1,1.2);
    const bricks=new T.Group();bricks.name='gate-bricks';root.add(bricks);
    for(let i=0;i<18;i++)part(bricks,new T.BoxGeometry(.5,1/3,1.2),mat,(i%6-2.5)*.5,2.8+1/6+Math.floor(i/6)/3,0);
    const dust=new T.Group();dust.name='gate-dust';dust.position.set(0,3.3,.65);root.add(dust);
    for(let i=0;i<11;i++){const puff=part(dust,new T.SphereGeometry(1,9,7),new T.MeshBasicMaterial({color:'#9d9388',transparent:true,opacity:0,depthWrite:false}));puff.castShadow=false;}
    for(const x of [-5.5,-4.5,-3.5,-2.5,2.5,3.5,4.5,5.5])block(x,4.05,0,.55,.5,1.25);
    for(const x of [-6,6]) {block(x,2.1,0,1.8,4.2,2);for(const dx of [-.55,.55])for(const z of [-.6,.6])block(x+dx,4.5,z,.55,.6,.55);}
    block(0,4.15,0,3.8,.25,2.1);block(0,4.85,0,2.8,1.15,1.6);
    const roof=part(root,new T.ConeGeometry(2.35,.9,4),mat,0,5.75,0);roof.rotation.y=Math.PI/4;roof.scale.z=.65;
    updateDirectorProp(root,object,0);return root;
  }
  if(object.kind==='cannon') {
    const wood=new T.MeshStandardMaterial({color:'#7a6c5a',roughness:.9});
    part(root,new T.BoxGeometry(.9,.22,1.65),wood,0,.65,0);
    for(const x of [-.65,.65])for(const z of [-.45,.45]) {const wheel=part(root,new T.CylinderGeometry(.48,.48,.16,16),wood,x,.48,z);wheel.rotation.z=Math.PI/2;}
    const barrel=new T.Group();barrel.name='cannon-barrel';barrel.position.set(0,1.02,0);barrel.rotation.x=-T.MathUtils.degToRad(8);root.add(barrel);
    const projectile=part(root,new T.SphereGeometry(.12,12,8),new T.MeshBasicMaterial({color:'#edb569'}));projectile.name='fire-projectile';projectile.castShadow=false;
    const tube=part(barrel,new T.CylinderGeometry(.16,.23,2.2,18),mat);tube.rotation.x=Math.PI/2;
    part(barrel,new T.SphereGeometry(.235,12,8),mat,0,0,-1.05);
    part(barrel,new T.TorusGeometry(.17,.035,8,18),mat,0,0,1.1);
    part(barrel,new T.CircleGeometry(.13,18),new T.MeshStandardMaterial({color:'#17222c',side:T.DoubleSide}),0,0,1.105);
    const flash=part(barrel,new T.ConeGeometry(.3,.75,8),new T.MeshBasicMaterial({color:'#ffb454',transparent:true,opacity:.9}),0,0,1.45);flash.rotation.x=Math.PI/2;flash.name='fire-flash';flash.castShadow=false;
    const light=new T.PointLight('#ffbc66',0,5);light.position.set(0,0,1.4);light.name='fire-light';barrel.add(light);
    for(const [name,parent,color,count] of [['fire-smoke',barrel,'#b7bcc1',7],['fire-impact',root,'#aa9a85',6]] as const) {
      const group=new T.Group();group.name=name;group.position.set(0,name==='fire-impact'?.05:0,name==='fire-impact'?4.5:1.35);parent.add(group);
      for(let i=0;i<count;i++){const puff=part(group,new T.SphereGeometry(1,8,6),new T.MeshBasicMaterial({color,transparent:true,opacity:0,depthWrite:false}));puff.castShadow=false;puff.receiveShadow=false;}
    }
    updateDirectorProp(root,object,0);return root;
  }
  if(object.kind==='door') {block(-.8,1.25,0,.15,2.5,.25);block(.8,1.25,0,.15,2.5,.25);block(0,2.5,0,1.75,.18,.25);}
  else block(0,.5,0,1,1,1);
  return root;
}
/** Derive effects from timeline time, so seeking and MP4 export produce the same shot. */
export function updateDirectorProp(root:T.Group,object:DirectorObject,frame:number,targetWorld?:T.Vector3,hitFrame?:number) {
  if(object.kind==='castle') {
    const t=hitFrame===undefined?-1:(frame-hitFrame)/24,fall=Math.max(0,Math.min(t,1.5));
    root.getObjectByName('gate-bricks')!.children.forEach((child,i)=>{
      const x=(i%6-2.5)*.5,y=2.8+1/6+Math.floor(i/6)/3;
      child.position.set(x+Math.sin(i*2.4)*fall*.75,Math.max(.18,y-2.1*fall*fall),fall*(.8+(i%4)*.35));
      child.rotation.set(fall*(i%3+1),fall*.6,fall*Math.sin(i));
    });
    const dust=root.getObjectByName('gate-dust')!;dust.visible=t>=0&&t<3;
    dust.children.forEach((child,i)=>{const puff=child as T.Mesh<T.SphereGeometry,T.MeshBasicMaterial>,age=Math.max(0,t);
      puff.position.set(Math.sin(i*2.4)*age*.7,Math.cos(i*1.9)*age*.5,age*(.3+i*.07));
      puff.scale.setScalar(.12+age*(.6+i*.04));puff.material.opacity=Math.max(0,.62*(1-age/3));
    });return;
  }
  if(object.kind!=='cannon')return;
  const age=object.fireFrame===undefined?-1:(frame-object.fireFrame)/24;
  const barrel=root.getObjectByName('cannon-barrel')!,projectile=root.getObjectByName('fire-projectile')!;
  projectile.visible=!!targetWorld&&age>=0&&age<.5;
  if(targetWorld) {
    root.updateMatrixWorld(true);const target=root.worldToLocal(targetWorld.clone()),direction=target.clone().sub(barrel.position);
    barrel.rotation.set(-Math.atan2(direction.y,Math.hypot(direction.x,direction.z)),Math.atan2(direction.x,direction.z),0);
    const muzzle=new T.Vector3(0,0,1.2).applyEuler(barrel.rotation).add(barrel.position);
    projectile.position.copy(muzzle.lerp(target,Math.max(0,Math.min(1,age/.5))));
  } else barrel.rotation.set(-T.MathUtils.degToRad(8),0,0);
  const flash=root.getObjectByName('fire-flash')!;flash.visible=age>=0&&age<.125;
  (root.getObjectByName('fire-light') as T.PointLight).intensity=flash.visible?8:0;
  for(const name of ['fire-smoke','fire-impact']) {
    const group=root.getObjectByName(name)!;const t=age-(name==='fire-impact'?.35:0);group.visible=t>=0&&t<2.2&&!(name==='fire-impact'&&object.targetId);
    group.children.forEach((child,i)=>{const puff=child as T.Mesh<T.SphereGeometry,T.MeshBasicMaterial>,phase=i*2.4;
      puff.position.set(Math.sin(phase)*t*.4,.1+t*(.4+i*.08),Math.cos(phase)*t*.35);
      puff.scale.setScalar(.12+t*(.35+i*.035));puff.material.opacity=Math.max(0,.52*(1-t/2.2));
    });
  }
}
