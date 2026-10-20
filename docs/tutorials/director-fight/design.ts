/** Editable FK blocking exercise. No project media or model generation is used. */
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { Box3, Mesh, Vector3 } from 'three';
import { emptyDirector, newDirectorObject, validateDirector, type DirectorPose, type Vec3 } from '../../../src/utils/dramaDirector.ts';
import { applyDirectorFrame, createDirectorWorld, disposeDirectorWorld } from '../../../src/pages/short-drama/components/director/directorScene.ts';

const out=resolve('output/director-fight-tutorial');mkdirSync(out,{recursive:true});
const doc=emptyDirector();doc.duration=16;
const a=newDirectorObject('actor'),b=newDirectorObject('actor');
a.id='fighter-a';a.name='白方 · 进攻';a.color='#e5eaf0';
b.id='fighter-b';b.name='蓝方 · 格挡反击';b.color='#739cce';
doc.objects=[a,b];
const guard:DirectorPose={torso:[6,0,0],head:[-4,0,0],leftArm:[-48,0,-18],leftElbow:[-70,0,0],rightArm:[-42,0,18],rightElbow:[-65,0,0],leftLeg:[-12,0,-3],leftKnee:[12,0,0],rightLeg:[12,0,3],rightKnee:[10,0,0]};
const pose=(patch:DirectorPose={})=>({...structuredClone(guard),...patch});
type Beat=[number,number,number,DirectorPose?,number?];
// Explicit anticipation, strike, reaction, recovery and held end poses.
const aBeats:Beat[]=[
 [0,-1.05,0],[18,-1.05,0],
 [36,-.82,0,pose({leftLeg:[-24,0,-3],leftKnee:[8,0,0],rightLeg:[20,0,3],rightKnee:[28,0,0]})],
 [48,-.65,0],[60,-.65,0],
 [66,-.63,0,pose({torso:[4,-14,0],leftArm:[-30,0,-20],leftElbow:[-105,0,0]})],
 [72,-.52,0,pose({torso:[10,10,0],leftArm:[-86,0,-5],leftElbow:[-12,0,0],head:[-6,-8,0]})],
 [76,-.50,0,pose({torso:[10,10,0],leftArm:[-90,0,-5],leftElbow:[-5,0,0]})],
 [83,-.58,0,pose({torso:[5,0,0],leftArm:[-58,0,-16],leftElbow:[-60,0,0]})],
 [96,-.65,0],[112,-.65,0],
 [124,-.55,0,pose({torso:[10,15,0],rightArm:[-80,0,12],rightElbow:[-12,0,0],leftElbow:[-82,0,0]})],
 [132,-.64,0,pose({torso:[-8,-8,0],rightElbow:[-82,0,0],head:[8,12,0]})],
 [144,-.63,0],[166,-.58,0],
 [174,-.60,0,pose({leftLeg:[-18,0,-3],leftKnee:[15,0,0]})],
 [180,-.75,-.12,pose({torso:[-16,-12,-8],leftLeg:[30,0,-4],leftKnee:[58,0,0],rightLeg:[-6,0,3],rightKnee:[8,0,0],leftArm:[-62,0,-25],rightArm:[-62,0,25]})],
 [188,-.92,-.16,pose({torso:[-8,-8,-4],leftLeg:[20,0,-3],leftKnee:[32,0,0],rightLeg:[-10,0,3],rightKnee:[12,0,0]})],
 [204,-1.05,-.12],[220,-1.05,-.12],
 [240,-.90,-.08,pose({torso:[14,-18,0],leftArm:[-55,0,-30],leftElbow:[-95,0,0],rightArm:[-22,0,22],rightElbow:[-105,0,0]})],
 [248,-.72,-.05,pose({torso:[18,22,0],rightArm:[-84,-10,30],rightElbow:[-20,0,0],leftArm:[-65,0,-25]})],
 [256,-.82,-.05,pose({torso:[8,4,0],rightArm:[-65,0,25],rightElbow:[-55,0,0]})],
 [276,-1.10,-.10],[312,-1.10,-.10],[336,-1.10,-.10,pose({torso:[0,0,0],head:[0,0,0],leftArm:[-20,0,-10],rightArm:[-20,0,10],leftElbow:[-30,0,0],rightElbow:[-30,0,0]})],[383,-1.10,-.10,pose({torso:[0,0,0],head:[0,0,0],leftArm:[-20,0,-10],rightArm:[-20,0,10],leftElbow:[-30,0,0],rightElbow:[-30,0,0]})],
];
const bBeats:Beat[]=[
 [0,.90,0],[48,.65,0],[64,.65,0],
 [70,.66,.10,pose({torso:[-6,-10,0],leftArm:[-68,-15,-28],leftElbow:[-62,0,0],head:[3,12,0]})],
 [76,.72,.22,pose({torso:[-10,-18,0],leftArm:[-75,-18,-38],leftElbow:[-50,0,0],head:[5,18,0]})],
 [84,.70,.22,pose({torso:[3,-8,0],leftArm:[-62,-10,-25],leftElbow:[-72,0,0]})],
 [96,.63,.18],[112,.63,.18],
 [120,.63,.18,pose({torso:[-8,0,-5],leftArm:[-66,0,-25],leftElbow:[-92,0,0],rightArm:[-58,0,25],rightElbow:[-92,0,0]})],
 [130,.72,.24,pose({torso:[-18,12,-8],head:[8,-8,0],leftArm:[-68,0,-26],leftElbow:[-82,0,0]})],
 [144,.61,.20],[160,.57,.15],
 [170,.52,.13,pose({torso:[-6,10,3],rightLeg:[-32,0,4],rightKnee:[90,0,0],leftLeg:[-4,0,-3],leftKnee:[12,0,0],rightArm:[-25,0,25]})],
 [176,.50,.12,pose({torso:[-9,12,3],rightLeg:[-55,0,4],rightKnee:[52,0,0],leftLeg:[-5,0,-3],leftKnee:[15,0,0]})],
 [180,.50,.12,pose({torso:[-12,12,4],rightLeg:[-68,0,4],rightKnee:[12,0,0],leftLeg:[-7,0,-3],leftKnee:[14,0,0],rightArm:[-20,0,32]})],
 [186,.56,.15,pose({torso:[-7,6,2],rightLeg:[-36,0,4],rightKnee:[78,0,0],leftLeg:[-4,0,-3],leftKnee:[12,0,0]})],
 [198,.64,.18],[220,.64,.18],
 [240,.64,.18,pose({torso:[4,-14,0],leftArm:[-62,0,-28],leftElbow:[-96,0,0]})],
 [248,.68,.28,pose({torso:[-10,-22,-4],leftArm:[-75,-15,-35],leftElbow:[-50,0,0],head:[4,15,0]})],
 [256,.77,.32,pose({torso:[6,-16,0],leftArm:[-85,-8,-10],leftElbow:[-12,0,0]})],
 [264,.73,.28],[276,.90,.24],[312,.90,.24],[336,.90,.24,pose({torso:[0,0,0],head:[0,0,0],leftArm:[-20,0,-10],rightArm:[-20,0,10],leftElbow:[-30,0,0],rightElbow:[-30,0,0]})],[383,.90,.24,pose({torso:[0,0,0],head:[0,0,0],leftArm:[-20,0,-10],rightArm:[-20,0,10],leftElbow:[-30,0,0],rightElbow:[-30,0,0]})],
];
const keys=(beats:Beat[],yaw:number)=>beats.map(([frame,x,z,p=pose(),heading=yaw])=>({frame,position:[x,0,z] as Vec3,yaw:heading,action:'idle' as const,ease:'smooth' as const,pose:p}));
a.keys=keys(aBeats,90);b.keys=keys(bBeats,-90);
doc.camera.keys=[
 {frame:0,position:[.1,2.0,5.2],target:[0,1.02,0],fov:40,roll:0,ease:'smooth'},
 {frame:96,position:[.7,1.85,4.7],target:[0,1.04,.08],fov:40,roll:0,ease:'smooth'},
 {frame:160,position:[1.0,1.55,4.8],target:[0,.95,.05],fov:42,roll:0,ease:'smooth'},
 {frame:220,position:[.2,1.85,5.1],target:[-.05,1.0,.08],fov:41,roll:0,ease:'smooth'},
 {frame:312,position:[-.3,2.0,5.4],target:[0,1.03,.10],fov:41,roll:0,ease:'smooth'},
 {frame:383,position:[-.3,2.0,5.4],target:[0,1.03,.10],fov:41,roll:0,ease:'smooth'},
];
// Set a support foot at the stage for each designed pose; this is authoring, not runtime IK.
const world=createDirectorWorld(doc);
for(const actor of doc.objects)for(const key of actor.keys){
 applyDirectorFrame(world,doc,key.frame);world.scene.updateMatrixWorld(true);
 const p=world.puppets.get(actor.id)!;
 const feet=p.feet;
 const lowest=Math.min(...feet.map(f=>new Box3().setFromObject(f).min.y));
 key.pose!.height=Number((.015-lowest).toFixed(4));
}
const distances:number[]=[];
for(let f=0;f<384;f++){applyDirectorFrame(world,doc,f);world.scene.updateMatrixWorld(true);for(const actor of doc.objects){
 const p=world.puppets.get(actor.id)!,head=p.joints.head.localToWorld(new Vector3(0,.12,0));
 for(const side of ['left','right'] as const){const elbow=p.joints[`${side}Elbow`];distances.push(head.distanceTo(elbow.getWorldPosition(new Vector3()))-.205,head.distanceTo(elbow.localToWorld(new Vector3(0,-.32,0)))-.21);}
}}
disposeDirectorWorld(world);
const checked=validateDirector(doc);writeFileSync(resolve(out,'武打对练-完整工程.json'),JSON.stringify(checked,null,2));
writeFileSync(resolve(out,'设计校验.json'),JSON.stringify({frames:384,actorKeys:[a.keys.length,b.keys.length],cameraKeys:doc.camera.keys.length,minimumHeadJointClearance:Math.min(...distances),scope:'elbow and hand spheres against own head; not full collision validation'},null,2));
console.log(JSON.stringify({objects:checked.objects.length,keys:[a.keys.length,b.keys.length],headClearance:Math.min(...distances)}));
