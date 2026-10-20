<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef, watch, shallowRef } from 'vue';
import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { objectAt, type DirectorDocument, type DirectorJoint, type Vec3 } from '@/utils/dramaDirector';
import { createDirectorWorld, applyDirectorFrame, disposeDirectorWorld, directorRenderer, type DirectorWorld } from './directorScene';
const props = defineProps<{ document: DirectorDocument; frame: number; selected: string; joint: DirectorJoint; tool: 'translate' | 'rotate' | 'scale' | 'pose'; playing: boolean; guides: boolean }>();
const emit = defineEmits<{ select: [id: string]; joint: [joint: DirectorJoint]; jointRotation: [joint: DirectorJoint, rotation: Vec3]; seek: [frame: number]; transform: [id: string, position: Vec3, yaw: number, scale: Vec3]; error: [message: string] }>();
const host = useTemplateRef<HTMLDivElement>('host'), monitor = useTemplateRef<HTMLDivElement>('monitor'), failure = shallowRef('');
let renderer: T.WebGLRenderer | undefined, preview: T.WebGLRenderer | undefined, world: DirectorWorld | undefined, orbit: OrbitControls | undefined, transform: TransformControls | undefined;
const editor = new T.PerspectiveCamera(45, 1, .05, 300), ray = new T.Raycaster();
let raf = 0, observer: ResizeObserver | undefined, start: [number, number] = [0, 0], wasDragging = false;
let jointStart: Vec3 = [0,0,0];
function attach() {
  if (!world || !transform) return; transform.detach();
  const selected = props.document.objects.find(o => o.id === props.selected);
  const object = props.tool === 'pose' ? selected?.visible && !selected.locked ? world.puppets.get(selected.id)?.joints[props.joint] : undefined : props.selected === 'camera' ? world.cameraMarker : selected?.visible && !selected.locked ? world.objects.get(selected.id) : undefined;
  if (object && !props.playing && !(props.selected === 'camera' && props.tool !== 'translate')) transform.attach(object);
  transform.setMode(props.tool === 'pose' ? 'rotate' : props.tool); transform.setSpace(props.tool === 'pose' ? 'local' : 'world'); transform.setSize(props.tool === 'pose' ? .6 : .85);
  transform.showX = props.tool !== 'rotate'; transform.showZ = props.tool !== 'rotate'; transform.showY = true;
}
function rebuild() {
  if (!renderer) return; transform?.detach();
  if (world) { if (transform) world.scene.remove(transform.getHelper()); disposeDirectorWorld(world); }
  world = createDirectorWorld(props.document); if (transform) world.scene.add(transform.getHelper()); resize(); attach();
}
function resize() {
  if (renderer && host.value) { const { width, height } = host.value.getBoundingClientRect(); renderer.setSize(Math.max(1, width), Math.max(1, height)); editor.aspect = width / Math.max(1, height); editor.updateProjectionMatrix(); }
  if (preview && world && monitor.value) { const width = monitor.value.clientWidth, height = monitor.value.clientHeight; preview.setSize(Math.max(1, width), Math.max(1, height)); world.camera.aspect = props.document.aspect === '16:9' ? 16 / 9 : 9 / 16; world.camera.updateProjectionMatrix(); }
}
function down(event: PointerEvent) { start = [event.clientX, event.clientY]; wasDragging = false; }
function up(event: PointerEvent) {
  if (!world || !renderer || wasDragging || props.playing || Math.hypot(event.clientX - start[0], event.clientY - start[1]) > 4) return;
  const rect = renderer.domElement.getBoundingClientRect(); ray.setFromCamera(new T.Vector2((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1), editor);
  const hits = ray.intersectObjects([...world.objects.values(), world.guides], true);
  for (const hit of hits) { let object: T.Object3D | null = hit.object;
    let ancestor: T.Object3D | null=hit.object, hidden=false; while(ancestor){if(!ancestor.visible)hidden=true;ancestor=ancestor.parent;} if(hidden)continue;
    while (object) { if (object.userData.objectId) { if (!object.visible || !hit.object.visible) break; emit('select', object.userData.objectId); if(props.tool==='pose' && object.userData.joint) emit('joint',object.userData.joint); if (object.userData.keyFrame !== undefined) emit('seek', object.userData.keyFrame); return; } object = object.parent; }
  }
}
function focus(mode: 'perspective' | 'top' | 'selected') {
  if (!orbit || !world) return;
  const target = mode === 'selected' ? (world.objects.get(props.selected)?.position || world.cameraMarker.position).clone() : new T.Vector3(0, 1, 0);
  if(mode==='selected' && props.document.objects.find(o=>o.id===props.selected)?.kind==='actor')target.y+=.9;
  orbit.target.copy(target); editor.position.copy(target).add(mode === 'top' ? new T.Vector3(0, 14, .01) : mode === 'selected' ? new T.Vector3(3,2.2,4) : new T.Vector3(7, 5, 9)); editor.up.set(0, 1, 0); orbit.update();
}
function useView() { if (orbit) emit('transform', 'view', editor.position.toArray() as Vec3, 0, orbit.target.toArray() as Vec3); }
defineExpose({ focus });
onMounted(() => {
  try {
    renderer = directorRenderer(); preview = directorRenderer(); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); preview.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    host.value!.append(renderer.domElement); monitor.value!.append(preview.domElement);
    editor.position.set(8, 5, 9); orbit = new OrbitControls(editor, renderer.domElement); orbit.target.set(0, 1, 0); orbit.enableDamping = true; orbit.maxDistance = 100; orbit.minDistance = .4; orbit.update();
    transform = new TransformControls(editor, renderer.domElement); transform.setSize(.85);
    transform.addEventListener('dragging-changed', e => { if (orbit) orbit.enabled = !e.value; if (e.value) wasDragging = true; });
    transform.addEventListener('mouseDown', () => { const o=transform?.object; if(o) jointStart=[o.rotation.x,o.rotation.y,o.rotation.z].map(T.MathUtils.radToDeg) as Vec3; });
    transform.addEventListener('mouseUp', () => { const o = transform?.object; if (!o) return;
      if(props.tool==='pose') { const selected=props.document.objects.find(x=>x.id===props.selected); if(!selected)return; const previous=objectAt(selected,props.frame).pose?.[props.joint] || [0,0,0];
        const current=[o.rotation.x,o.rotation.y,o.rotation.z].map(T.MathUtils.radToDeg); emit('jointRotation',props.joint,current.map((v,i)=>Math.max(-180,Math.min(180,previous[i]!+((v-jointStart[i]!+540)%360)-180))) as Vec3); return; }
      const yaw = T.MathUtils.radToDeg(o.rotation.y); emit('transform', o.userData.objectId, o.position.toArray() as Vec3, ((yaw + 540) % 360) - 180, o.scale.toArray() as Vec3);
    });
    renderer.domElement.addEventListener('pointerdown', down); renderer.domElement.addEventListener('pointerup', up); rebuild();
    observer = new ResizeObserver(resize); observer.observe(host.value!); observer.observe(monitor.value!);
    function render() { raf = requestAnimationFrame(render); if (!world || !renderer || !preview) return;
      if (!transform?.dragging) applyDirectorFrame(world, props.document, props.frame); orbit?.update();
      world.guides.visible = props.guides; renderer.render(world.scene, editor);
      world.guides.visible = false; if (transform) transform.getHelper().visible = false; preview.render(world.scene, world.camera);
      world.guides.visible = props.guides; if (transform) transform.getHelper().visible = !!transform.object;
    } render();
  } catch (e) { failure.value = `三维视口未能启动：${e instanceof Error ? e.message : '请检查 WebGL 支持'}`; emit('error', failure.value); }
});
watch(() => props.document, rebuild); watch(() => [props.selected, props.joint, props.tool, props.playing], attach);
onUnmounted(() => { cancelAnimationFrame(raf); observer?.disconnect(); orbit?.dispose();
  if (world && transform) world.scene.remove(transform.getHelper()); transform?.dispose(); if (world) disposeDirectorWorld(world);
  renderer?.domElement.removeEventListener('pointerdown', down); renderer?.domElement.removeEventListener('pointerup', up);
  [renderer, preview].forEach(r => { r?.dispose(); r?.forceContextLoss(); r?.domElement.remove(); });
});
</script>
<template>
  <section class="director-stage" aria-label="三维场景编辑视口">
    <div ref="host" class="stage-host"/><div class="view-tools"><button @click="focus('perspective')">透视视图</button><button @click="focus('top')">俯视布局</button><button :disabled="!selected" @click="focus('selected')">聚焦选择</button><button @click="useView">当前视角设为机位</button></div>
    <div class="stage-legend"><i/> {{tool==='pose' ? '姿态编辑 · 点击身体部位，再拖动彩色旋转环' : '编辑视口 · 左键旋转 / 滚轮缩放 / 右键平移'}} <span>蓝线：人物路线 · 黄线：运镜路线</span></div>
    <div class="camera-monitor" :class="{portrait:document.aspect==='9:16'}"><header><span>● 摄影机监看</span><small>{{document.aspect}} · {{document.fps}} fps</small></header><div ref="monitor" class="monitor-host" :style="{aspectRatio: document.aspect==='16:9' ? '16/9' : '9/16'}"/><footer>导出使用此构图，辅助线不会进入视频</footer></div>
    <div v-if="!document.objects.length" class="stage-empty"><strong>从空场景开始调度</strong><span>左侧添加人物白模和道具，再沿时间轴设置动作与机位。</span></div>
    <p v-if="failure" class="stage-failure" role="alert">{{failure}}</p>
  </section>
</template>
<style scoped>
.director-stage{position:relative;min-width:0;min-height:0;overflow:hidden;background:#eef2f7}.stage-host{position:absolute;inset:0}.stage-host :deep(canvas){display:block;touch-action:none}.view-tools{position:absolute;top:18px;left:20px;display:flex;gap:5px}.view-tools button{border:1px solid #d4deeb;background:#ffffffed;border-radius:5px;padding:7px 11px;font:11px inherit;color:#455670;cursor:pointer}.view-tools button:disabled{opacity:.4}.stage-legend{position:absolute;left:20px;bottom:16px;font-size:10px;color:#61758e;pointer-events:none}.stage-legend i{display:inline-block;background:#437fd5;width:5px;height:5px;border-radius:50%;margin-right:6px}.stage-legend span{display:block;margin-top:7px;color:#8b99ad}.camera-monitor{position:absolute;right:18px;bottom:18px;width:270px;background:#fff;border:1px solid #d3deeb;border-radius:8px;overflow:hidden;box-shadow:0 8px 30px #243b5919;pointer-events:none}.camera-monitor.portrait{width:145px}.camera-monitor header{display:flex;justify-content:space-between;align-items:center;padding:11px 12px;font-size:10px;color:#42618a}.camera-monitor small{font-size:9px;color:#8b99ae}.monitor-host{width:100%;overflow:hidden;background:#e7ecf3}.monitor-host :deep(canvas){display:block;width:100%!important;height:100%!important}.camera-monitor footer{font-size:9px;color:#8a98ad;padding:9px 10px}.stage-empty{position:absolute;left:24px;top:125px;display:grid;gap:10px;pointer-events:none}.stage-empty strong{font-size:17px;font-weight:550;color:#4c627e}.stage-empty span{font-size:11px;color:#8291a8}.stage-failure{position:absolute;top:80px;left:20px;right:20px;padding:18px;background:#fff1ef;color:#c03a30;font-size:12px}
@media(max-width:1200px){.camera-monitor{width:220px}.stage-legend{max-width:210px;line-height:1.6}.view-tools{left:12px;top:12px}.view-tools button{padding:6px;font-size:10px}}
</style>
