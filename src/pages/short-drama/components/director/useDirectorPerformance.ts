import { computed, shallowRef, watch, type ShallowRef } from 'vue';
import { cloneDirector, cameraAt, upsertKey, moveDirectorKey, objectAt, type ActionClip, type CameraFollow, type DirectorAction, type DirectorDocument, type DirectorJoint, type DirectorPose, type Vec3 } from '@/utils/dramaDirector';
import { mirrorDirectorPose, newActionClip } from '@/utils/dramaDirectorMotion';

export function useDirectorPerformance(doc: ShallowRef<DirectorDocument>, selected: ShallowRef<string>, frame: ShallowRef<number>, mutate: (action:(doc:DirectorDocument)=>void)=>boolean, seek:(frame:number)=>void, patchKey:(patch:{pose?:DirectorPose})=>void) {
  const joint = shallowRef<DirectorJoint>('rightArm'), selectedClip = shallowRef(''), clipSelection = shallowRef(0), clipboard = shallowRef<DirectorPose>();
  const object = computed(() => doc.value.objects.find(o => o.id === selected.value));
  watch(selected,()=>{selectedClip.value='';});
  function addClip(action: DirectorAction) { let id=''; mutate(next=>{const o=next.objects.find(o=>o.id===selected.value);if(!o || o.locked)return; const clip=newActionClip(o,frame.value,next.duration*24-1,action);o.clips=[...(o.clips||[]),clip].sort((a,b)=>a.start-b.start);id=clip.id;}); if(object.value?.clips?.some(c=>c.id===id))selectedClip.value=id; }
  function selectClip(id:string) { const c=object.value?.clips?.find(c=>c.id===id);if(c){selectedClip.value=id;clipSelection.value++;seek(c.start);} }
  function patchClip(id:string,patch:Partial<ActionClip>) { mutate(next=>{const o=next.objects.find(o=>o.id===selected.value);if(!o || o.locked)return; o.clips=o.clips?.map(c=>c.id===id?{...c,...patch,id}:c).sort((a,b)=>a.start-b.start);}); }
  function removeClip(id:string) { mutate(next=>{const o=next.objects.find(o=>o.id===selected.value);if(o&&!o.locked)o.clips=o.clips?.filter(c=>c.id!==id);}); }
  function duplicateClip(id:string) { let copy='';mutate(next=>{const o=next.objects.find(o=>o.id===selected.value),c=o?.clips?.find(c=>c.id===id);if(!o||o.locked||!c)return;const clone={...cloneDirector(c),id:crypto.randomUUID(),start:c.end,end:c.end+c.end-c.start};o.clips=[...(o.clips||[]),clone].sort((a,b)=>a.start-b.start);copy=clone.id;}); if(object.value?.clips?.some(c=>c.id===copy))selectClip(copy); }
  function copyPose() { if(object.value)clipboard.value=cloneDirector(objectAt(object.value,frame.value).pose||{}); }
  function pastePose() { if(clipboard.value)patchKey({pose:cloneDirector(clipboard.value)}); }
  function mirrorPose() { if(object.value)patchKey({pose:mirrorDirectorPose(objectAt(object.value,frame.value).pose||{})}); }
  function rotateJoint(j:DirectorJoint,rotation:Vec3) { if(object.value)patchKey({pose:{...objectAt(object.value,frame.value).pose,[j]:rotation}}); }
  function retime(to:number,copy:boolean) { const from=frame.value;let changed=false;const ok=mutate(next=>{if(selected.value==='camera'){next.camera.keys=moveDirectorKey(next.camera.keys,from,to,next.duration*24-1,copy);changed=true;}else {const o=next.objects.find(o=>o.id===selected.value);if(o&&!o.locked){o.keys=moveDirectorKey(o.keys,from,to,next.duration*24-1,copy);changed=true;}}});if(ok && changed && (selected.value==='camera'?doc.value.camera.keys:object.value?.keys)?.some(k=>k.frame===to))seek(to); }
  function follow(id:string) { mutate(next=>{if(!id){const current=cameraAt(next,frame.value);delete next.camera.follow;next.camera.keys=upsertKey(next.camera.keys,current);return;}const o=next.objects.find(o=>o.id===id);if(!o)return;const p=objectAt(o,frame.value).position,k=cameraAt(next,frame.value);next.camera.follow={objectId:id,mode:'aim',height:o.kind==='actor'?1.3:.5,offset:k.position.map((v,i)=>v-p[i]!) as Vec3};}); }
  function patchFollow(patch:Partial<CameraFollow>) { mutate(next=>{if(next.camera.follow)Object.assign(next.camera.follow,patch);}); }
  return {joint,selectedClip,clipSelection,canPaste:computed(()=>!!clipboard.value),addClip,selectClip,patchClip,removeClip,duplicateClip,copyPose,pastePose,mirrorPose,rotateJoint,retime,follow,patchFollow};
}
