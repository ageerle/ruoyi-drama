import { Vector3 } from 'three';
import {cloneDirector,objectAt,upsertKey,type DirectorDocument} from '../../../../utils/dramaDirector.ts';
import {applyDirectorFrame,createDirectorWorld,disposeDirectorWorld} from './directorScene.ts';

/** Small authoring correction for the white-model's proportions, stored in editable shoulder keys.
 * This checks the head against arm segments only; it is not a physics/collision system. */
export function correctCaptureArms(document:DirectorDocument):DirectorDocument {
 const doc=cloneDirector(document),world=createDirectorWorld(doc);
 const distance=(p:Vector3,a:Vector3,b:Vector3)=>{const d=b.clone().sub(a);return p.distanceTo(a.clone().addScaledVector(d,Math.max(0,Math.min(1,p.clone().sub(a).dot(d)/Math.max(1e-9,d.lengthSq())))));};
 try{for(const actor of doc.objects.filter(o=>o.kind==='actor')){
  const puppet=world.puppets.get(actor.id)!;
  for(const key of actor.keys){if(!key.pose)continue;
   for(const side of ['left','right'] as const){
    const clearance=()=>{applyDirectorFrame(world,doc,key.frame);world.scene.updateMatrixWorld(true);const head=puppet.joints.head.localToWorld(new Vector3(0,.12,0)),shoulder=puppet.joints[`${side}Arm`].getWorldPosition(new Vector3()),elbow=puppet.joints[`${side}Elbow`].getWorldPosition(new Vector3()),hand=puppet.joints[`${side}Elbow`].localToWorld(new Vector3(0,-.32,0));return Math.min(distance(head,shoulder,elbow)-.205,distance(head,elbow,hand)-.195,head.distanceTo(hand)-.21);};
    const joint=`${side}Shoulder` as const,original=key.pose[joint]||[0,0,0];let best=clearance(),angle=original[2];
    if(best<.018){for(let offset=5;offset<=90;offset+=5){key.pose[joint]=[original[0],original[1],original[2]+offset*(side==='left'?-1:1)];const score=clearance();if(score>best){best=score;angle=key.pose[joint]![2];}if(score>=.018)break;}key.pose[joint]=[original[0],original[1],angle];
      if(best<.018){let tilt=original[0];for(const delta of [-5,5,-10,10,-15,15,-20,20,-30,30,-45,45]){key.pose[joint]=[original[0]+delta,original[1],angle];const score=clearance();if(score>best){best=score;tilt=original[0]+delta;}if(score>=.018)break;}key.pose[joint]=[tilt,original[1],angle];}
    }
   }
  }
  // Add an editable sample when an interpolated arm crosses the head between detections.
  for(let frame=0;frame<doc.duration*24;frame++){
   if(actor.keys.some(k=>k.frame===frame))continue;
   applyDirectorFrame(world,doc,frame);world.scene.updateMatrixWorld(true);
   const head=puppet.joints.head.localToWorld(new Vector3(0,.12,0));
   const crosses=['left','right'].some(side=>{const elbow=puppet.joints[`${side}Elbow` as 'leftElbow'|'rightElbow'];return head.distanceTo(elbow.getWorldPosition(new Vector3()))<.22||head.distanceTo(elbow.localToWorld(new Vector3(0,-.32,0)))<.225;});
   if(crosses){const key=objectAt(actor,frame);actor.keys=upsertKey(actor.keys,key);for(const side of ['left','right'] as const){const joint=`${side}Shoulder` as const,original=key.pose?.[joint]||[0,0,0];if(!key.pose)continue;for(let offset=5;offset<=70;offset+=5){key.pose[joint]=[original[0],original[1],original[2]+offset*(side==='left'?-1:1)];actor.keys=upsertKey(actor.keys,key);applyDirectorFrame(world,doc,frame);world.scene.updateMatrixWorld(true);const h=puppet.joints.head.localToWorld(new Vector3(0,.12,0)),elbow=puppet.joints[`${side}Elbow`];if(h.distanceTo(elbow.getWorldPosition(new Vector3()))>.225&&h.distanceTo(elbow.localToWorld(new Vector3(0,-.32,0)))>.23)break;}}}
  }
 }}finally{disposeDirectorWorld(world);}return doc;
}
