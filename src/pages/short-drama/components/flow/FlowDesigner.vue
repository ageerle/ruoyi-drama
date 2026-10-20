<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue';
import { VueFlow, useVueFlow, MarkerType, type Node, type Edge, type Connection, type NodeDragEvent, type NodeMouseEvent } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';
import { ArrowLeft, Plus, Minus, FullScreen, Refresh, Grid, Connection as ConnectionIcon, User, Location, Box, Microphone, VideoCamera, Search, Close } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import { ElMessage } from '@/utils/message';
import { useUserStore } from '@/stores';
import { visibleFlowConnections } from '@/utils/flowConnectionVisibility';
import type { ShortDramaProject, ShortDramaCharacter, ShortDramaLocation, ShortDramaStoryboard } from '@/api/shortDrama/types';
import type { StoryboardVersionOption } from '@/composables/useStoryboardWorkspace';
import { buildDramaFlowGraph, bindFlowReference, flowShotSnapshot, flowKindLabels, type FlowMedia, type FlowShotPatch, type FlowKind, type FlowAsset, type FlowVoice } from '@/utils/dramaFlowGraph';
import type { FlowActions, FlowModelSettings } from './types';
import { useFlowLayout } from './useFlowLayout';
import { useFlowResources } from './useFlowResources';
import FlowMediaNode from './FlowMediaNode.vue';
import FlowInspector from './FlowInspector.vue';
import GeneratedAssetImage from '../GeneratedAssetImage.vue';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/minimap/dist/style.css';

const props = defineProps<{
  project: ShortDramaProject; characters: ShortDramaCharacter[]; locations: ShortDramaLocation[];
  shots: ShortDramaStoryboard[]; versions: StoryboardVersionOption[]; version: string;
  actions: FlowActions; settings: FlowModelSettings; assets?: FlowAsset[]; voices?: FlowVoice[];
}>();
const emit = defineEmits<{ close: []; edit: [media: FlowMedia]; prepare: []; 'update:version': [value: string] }>();
const user = useUserStore();
const { fitView, zoomIn, zoomOut, setViewport, viewport: flowViewport } = useVueFlow(`drama-${props.project.id}`);
const layout = useFlowLayout(() => `drama-flow:v1:${user.userInfo?.userId || 'local'}:${props.project.id}:${props.version || 'unassigned'}`);
// Restore before Vue Flow mounts: its initial viewport event must not overwrite stored coordinates.
layout.read();
const resources = useFlowResources(() => props.project.id!, () => props.characters, () => ({ assets: props.assets, voices: props.voices }));
const nodes = shallowRef<Node[]>([]), edges = shallowRef<Edge[]>([]);
const mode = ref<'workflow' | 'storyboard'>('workflow');
const selectedId = ref(''), libraryKind = ref<FlowKind>(), search = ref('');
const saving = ref(false), ready = ref(false), root = ref<HTMLElement>();
let restoring = true;
const drafts = ref<Record<string, { baseline: FlowShotPatch; patch: Partial<FlowShotPatch> }>>({});
const draftCount = computed(() => Object.keys(drafts.value).length);
const versionShots = computed(() => props.shots.filter(shot => (shot.scriptId || 'unassigned') === props.version).slice().sort((a, b) => a.sceneNo - b.sceneNo));
const effectiveShots = computed(() => versionShots.value.map(shot => ({ ...shot, ...drafts.value[shot.id || '']?.patch })));
const graph = computed(() => buildDramaFlowGraph({ characters: props.characters, locations: props.locations, shots: effectiveShots.value, assets: resources.assets.value, voices: resources.voices.value }));
const selected = computed(() => graph.value.media.find(media => media.id === selectedId.value));
const references = computed(() => graph.value.links.filter(link => link.target === selectedId.value).map(link => graph.value.media.find(media => media.id === link.source)!).filter(Boolean));
const library = computed(() => graph.value.media.filter(media => media.kind === libraryKind.value && `${media.title} ${media.subtitle}`.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())));
const available = computed(() => graph.value.media.filter(media => ['character', 'location', 'prop'].includes(media.kind)));
const completed = computed(() => versionShots.value.filter(shot => shot.videoStatus === 'done').length);
const categories = [{ kind: 'character' as const, icon: User }, { kind: 'location' as const, icon: Location }, { kind: 'prop' as const, icon: Box }, { kind: 'voice' as const, icon: Microphone }, { kind: 'shot' as const, icon: VideoCamera }];
const visibleEdges = computed(() => visibleFlowConnections(edges.value, selectedId.value).map(edge => ({
  ...edge, style: { ...edge.style, opacity: 1, stroke: '#528bf0', strokeWidth: 1.6 },
})));
const connectionHint = computed(() => selected.value
  ? `${selected.value.kind === 'shot' ? '本镜引用' : '关联镜头'} · ${visibleEdges.value.length} 条 · 点击空白收起`
    : '选中镜头或素材，查看相关连线');

function rebuild() {
  const previous = new Map(nodes.value.map(node => [node.id, node.position]));
  const occupied = new Set(nodes.value.filter(node => node.type === 'media').map(node => `${node.position.x}:${node.position.y}`));
  Object.values(layout.positions.value).forEach(position => occupied.add(`${position.x}:${position.y}`));
  const shots = graph.value.media.filter(media => media.kind === 'shot');
  const priority = (media: FlowMedia) => {
    const index = shots.findIndex(shot => graph.value.links.some(link => link.source === media.id && link.target === shot.id));
    return index < 0 ? Number.MAX_SAFE_INTEGER : index;
  };
  const assets = graph.value.media.filter(media => media.kind !== 'shot').slice().sort((a, b) => priority(a) - priority(b));
  const assetHeight = Math.max(340, Math.ceil(assets.length / 2) * 310 + 60);
  const shotHeight = Math.max(390, Math.ceil(shots.length / 2) * 355 + 70);
  nodes.value = [
    { id: 'lane:assets', type: 'collection', label: '素材参考', position: { x: 10, y: 0 }, draggable: false, selectable: false, connectable: false, style: { width: '548px', height: `${assetHeight}px` }, zIndex: -1 },
    { id: 'lane:shots', type: 'collection', label: '视频镜头', position: { x: 800, y: 0 }, draggable: false, selectable: false, connectable: false, style: { width: '744px', height: `${shotHeight}px` }, zIndex: -1 },
    ...graph.value.media.map(media => {
      const isShot = media.kind === 'shot';
      const index = (isShot ? shots : assets).findIndex(item => item.id === media.id);
      let position = layout.positions.value[media.id] || previous.get(media.id);
      if (!position) {
        position = { x: (isShot ? 828 : 40) + (index % 2) * (isShot ? 366 : 256), y: 60 + Math.floor(index / 2) * (isShot ? 355 : 310) };
        // Optional prop/voice reads may arrive after the first render. Reserve existing slots.
        while (occupied.has(`${position.x}:${position.y}`)) position.y += isShot ? 355 : 310;
        occupied.add(`${position.x}:${position.y}`);
      }
      return { id: media.id, type: 'media', position, selected: selectedId.value === media.id,
        data: { ...media, dirty: !!drafts.value[media.shot?.id || ''], references: graph.value.links.filter(link => link.target === media.id).length } };
    }),
  ];
  edges.value = graph.value.links.map(link => ({ ...link, type: 'default', label: undefined,
    sourceHandle: 'asset', targetHandle: 'references',
    selectable: false, focusable: false, animated: false,
    style: { stroke: drafts.value[graph.value.media.find(media => media.id === link.target)?.shot?.id || ''] ? '#528bf0' : '#b9c8df', strokeWidth: 1.3,
      strokeDasharray: drafts.value[graph.value.media.find(media => media.id === link.target)?.shot?.id || ''] ? '5 4' : undefined },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#b9c8df' },
  }));
}
watch(graph, rebuild, { immediate: true });
watch(() => props.version, async () => { restoring = true; selectedId.value = ''; nodes.value = []; layout.read(); rebuild(); await nextTick(); await restoreView(); });

async function restoreView() {
  if (!ready.value || mode.value !== 'workflow') return;
  restoring = true;
  const stored = layout.viewport.value ? { ...layout.viewport.value } : undefined;
  await nextTick();
  if (stored) await setViewport(stored);
  else await fitView({ nodes: nodes.value.filter(node => node.type === 'media' && node.data.kind !== 'shot').sort((a, b) => a.position.y - b.position.y || a.position.x - b.position.x).slice(0, 4).map(node => node.id).concat(graph.value.media.filter(media => media.kind === 'shot').slice(0, 2).map(media => media.id)), padding: .22, maxZoom: .85 });
  restoring = false;
  rememberView();
}
async function initialized() { if (ready.value) return; ready.value = true; await restoreView(); }
function rememberDrag({ node: active, nodes: moved }: NodeDragEvent) {
  moved = moved.length ? moved : [active];
  for (const node of moved) if (!node.id.startsWith('lane:')) layout.positions.value[node.id] = { ...node.position };
  layout.save();
}
function rememberView() { if (!ready.value || restoring) return; layout.viewport.value = { ...flowViewport.value }; layout.save(); }
async function changeZoom(direction: 'in' | 'out') { await (direction === 'in' ? zoomIn() : zoomOut()); rememberView(); }
async function overview() { await fitView({ padding: .15, maxZoom: .85, duration: 250 }); rememberView(); }
async function switchView(value: 'workflow' | 'storyboard') {
  if (mode.value === value) return;
  restoring = true; mode.value = value;
  if (value === 'workflow') { await nextTick(); await restoreView(); }
}
async function focusMedia(id: string) {
  mode.value = 'workflow'; selectedId.value = id; libraryKind.value = undefined;
  await nextTick();
  await fitView({ nodes: [id], padding: .8, maxZoom: .95, duration: 250 });
  restoring = false; rememberView();
}
function selectNode({ node }: NodeMouseEvent) { if (!node.id.startsWith('lane:')) selectedId.value = node.id; }
function patchShot(id: string, patch: Partial<FlowShotPatch>) {
  const shot = props.shots.find(row => row.id === id);
  if (!shot || saving.value || props.actions.state(shot).blocked) return;
  const current = drafts.value[id] || { baseline: flowShotSnapshot(shot), patch: {} };
  const next = { ...current.patch, ...patch };
  if (Object.entries(next).every(([key, value]) => value === current.baseline[key as keyof FlowShotPatch])) delete drafts.value[id];
  else drafts.value[id] = { baseline: current.baseline, patch: next };
}
function bind(id: string, shotId = selected.value?.shot?.id, remove = false) {
  const source = graph.value.media.find(media => media.id === id);
  const shot = effectiveShots.value.find(row => row.id === shotId);
  if (!source || !shot || !shot.id) return;
  try { patchShot(shot.id, bindFlowReference(shot, source, remove)); selectedId.value = `shot:${shot.id}`; }
  catch (e) { ElMessage.warning(e instanceof Error ? e.message : '引用调整失败'); }
}
function validConnection(connection: Connection) {
  return !!connection.source && !!connection.target && !saving.value && available.value.some(media => media.id === connection.source)
    && effectiveShots.value.some(shot => `shot:${shot.id}` === connection.target && !props.actions.state(shot).blocked);
}
function connect(connection: Connection) { if (validConnection(connection)) bind(connection.source!, graph.value.media.find(media => media.id === connection.target)?.shot?.id); }
async function saveShot(id: string) {
  const draft = drafts.value[id];
  if (!draft) return true;
  saving.value = true;
  try {
    const success = await props.actions.save(id, draft.patch, draft.baseline);
    if (success) delete drafts.value[id];
    return success;
  } catch (e) { ElMessage.error(e instanceof Error ? e.message : '镜头保存失败'); return false; }
  finally { saving.value = false; }
}
async function saveAll() { for (const id of Object.keys(drafts.value)) if (!await saveShot(id)) return false; return true; }
async function generate() {
  const id = selected.value?.shot?.id;
  if (!id || !await saveShot(id)) return;
  try { await props.actions.generate(id); } catch (e) { ElMessage.error(e instanceof Error ? e.message : '视频提交失败'); }
}
async function taskAction(action: 'query' | 'restore') {
  const id = selected.value?.shot?.id;
  if (!id) return;
  try { await props.actions[action](id); } catch (e) { ElMessage.error(e instanceof Error ? e.message : '任务状态读取失败'); }
}
async function close() {
  if (saving.value) return;
  if (draftCount.value) {
    try { await ElMessageBox.confirm(`还有 ${draftCount.value} 个镜头未保存。保存后退出流程设计器？`, '保存镜头修改', { confirmButtonText: '保存并退出', cancelButtonText: '继续编辑', closeOnClickModal: false }); }
    catch { return; }
    if (!await saveAll()) return;
  }
  rememberView(); layout.save(); emit('close');
}
async function edit(media: FlowMedia) { if (draftCount.value && !await saveAll()) return; emit('edit', media); }
async function resetLayout() {
  layout.reset(); nodes.value = []; rebuild(); await nextTick();
  await fitView({ padding: .15, maxZoom: .8, duration: 250 });
  rememberView();
}
function escape(event: KeyboardEvent) {
  if (event.key === 'Tab' && root.value && !(event.target as HTMLElement)?.closest('.el-popper,.el-overlay')) {
    const focusable = [...root.value.querySelectorAll<HTMLElement>('button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex="0"],summary')].filter(element => element.getClientRects().length);
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first && last) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last && first) { event.preventDefault(); first.focus(); }
    return;
  }
  if (event.key !== 'Escape' || document.querySelector('.el-overlay')) return;
  event.stopPropagation();
  if (selectedId.value) selectedId.value = ''; else void close();
}
let previousFocus: HTMLElement | null = null;
onMounted(() => { previousFocus = document.activeElement as HTMLElement; root.value?.focus(); document.addEventListener('keydown', escape); });
onUnmounted(() => { document.removeEventListener('keydown', escape); previousFocus?.focus(); });
</script>

<template>
  <div ref="root" class="drama-flow-designer" role="dialog" aria-modal="true" aria-label="短剧流程设计器" tabindex="-1">
    <header class="designer-header">
      <div class="project-heading"><button type="button" class="back-button" aria-label="返回短剧工作台" @click="close"><el-icon><ArrowLeft /></el-icon></button><div><span class="project-overline">RUOYI DRAMA / 素材关系图</span><h1>{{ project.projectName }}</h1></div></div>
      <nav class="view-switch" aria-label="画布视图"><button type="button" :class="{ active: mode === 'workflow' }" @click="switchView('workflow')"><el-icon><ConnectionIcon /></el-icon>工作流</button><button type="button" :class="{ active: mode === 'storyboard' }" @click="switchView('storyboard')"><el-icon><Grid /></el-icon>分镜板</button></nav>
      <div class="header-actions"><span class="layout-status">{{ layout.storageError.value ? '布局未保存' : '布局保存在本机' }}</span><el-button v-if="draftCount" type="primary" :loading="saving" @click="saveAll">保存 {{ draftCount }} 个镜头</el-button><el-button v-else :loading="resources.loading.value" :icon="Refresh" @click="resources.refresh">刷新素材</el-button></div>
    </header>
    <div class="designer-subbar"><div class="version-control"><span class="workspace-label">素材关系图</span><span class="subbar-divider" /><el-select :model-value="version" aria-label="分镜版本" :disabled="saving" @update:model-value="emit('update:version', $event)"><el-option v-for="option in versions" :key="option.scriptId" :value="option.scriptId" :label="option.label" /></el-select></div><div class="production-summary"><span>{{ graph.media.filter(media => media.kind !== 'shot').length }} 个素材</span><i /><span>{{ versionShots.length }} 个镜头</span><i /><span>{{ completed }} 个视频已生成</span></div></div>
    <div class="designer-body">
      <main class="canvas-region">
        <VueFlow v-if="mode === 'workflow'" :id="`drama-${project.id}`" v-model:nodes="nodes" :edges="visibleEdges" :min-zoom=".12" :max-zoom="1.8" :delete-key-code="null" :is-valid-connection="validConnection" :only-render-visible-elements="true" :nodes-connectable="true" :snap-to-grid="false" :pan-on-scroll="true" :zoom-on-double-click="false" @nodes-initialized="initialized" @node-click="selectNode" @node-double-click="({ node }) => focusMedia(node.id)" @pane-click="selectedId = ''" @node-drag-stop="rememberDrag" @move-end="rememberView" @connect="connect">
          <Background :gap="22" :size="1" pattern-color="#cfdae9" />
          <MiniMap :pannable="true" :zoomable="true" :node-color="node => node.type === 'collection' ? '#e9eef6' : node.data.kind === 'shot' ? '#92b7f8' : '#c0cddd'" :mask-color="'rgba(244,247,252,.7)'" :width="162" :height="106" />
          <template #node-collection="node"><span>{{ node.label }}</span></template>
          <template #node-media="node"><FlowMediaNode :data="{ ...node.data, compact: flowViewport.zoom < .38, blocked: node.data.shot ? actions.state(node.data.shot).blocked : false }" :selected="selectedId === node.id" @inspect="selectedId = $event" /></template>
        </VueFlow>
        <div v-else class="storyboard-view"><div class="board-heading"><div><span>STORYBOARD</span><h2>镜头顺序，清晰可见</h2></div><p>按分镜顺序查看，点击镜头继续编辑。</p></div><div class="storyboard-grid"><button v-for="media in graph.media.filter(item => item.kind === 'shot')" :key="media.id" type="button" class="storyboard-tile" :class="{ selected: selectedId === media.id }" @click="selectedId = media.id"><div class="board-image"><GeneratedAssetImage v-if="media.imageUrl" :src="media.imageUrl" :title="media.title" :model="media.model" :prediction-id="media.predictionId" :interactive="false" /><el-icon v-else><VideoCamera /></el-icon><span>{{ String(media.shot!.sceneNo).padStart(2, '0') }}</span></div><div class="board-copy"><h3>{{ media.title }}</h3><p>{{ media.subtitle }}</p><small>{{ media.shot?.videoStatus === 'done' ? '视频已生成' : '待生成' }}<span>{{ media.duration ? `${media.duration}s` : '时长未指定' }}</span></small></div></button></div></div>
        <nav v-if="mode === 'workflow'" class="asset-rail" aria-label="素材库"><button v-for="category in categories" :key="category.kind" type="button" :class="{ active: libraryKind === category.kind }" :title="`${flowKindLabels[category.kind]}库`" :aria-label="`${flowKindLabels[category.kind]}库`" :aria-expanded="libraryKind === category.kind" @click="libraryKind = libraryKind === category.kind ? undefined : category.kind; search = ''"><el-icon><component :is="category.icon" /></el-icon><span>{{ flowKindLabels[category.kind] }}</span></button></nav>
        <aside v-if="libraryKind && mode === 'workflow'" class="asset-library"><div class="library-heading"><h2>{{ flowKindLabels[libraryKind] }}库 <small>{{ library.length }}</small></h2><button type="button" class="icon-button" aria-label="关闭素材库" @click="libraryKind = undefined"><el-icon><Close /></el-icon></button></div><el-input v-model="search" :prefix-icon="Search" placeholder="搜索素材" clearable aria-label="搜索素材" /><div class="library-list"><button v-for="media in library" :key="media.id" type="button" @click="focusMedia(media.id)"><div class="library-thumb"><GeneratedAssetImage v-if="media.imageUrl" :src="media.imageUrl" :title="media.title" :model="media.model" :prediction-id="media.predictionId" :interactive="false" /><el-icon v-else><component :is="categories.find(category => category.kind === media.kind)?.icon" /></el-icon></div><div><strong>{{ media.title }}</strong><span>{{ media.subtitle }}</span></div></button><p v-if="!library.length" class="library-empty">暂无{{ flowKindLabels[libraryKind] }}{{ search ? '匹配结果' : '素材' }}</p></div></aside>
        <div v-if="!versionShots.length" class="canvas-empty"><el-icon><ConnectionIcon /></el-icon><h2>从已有素材开始</h2><p>生成或添加分镜后，镜头与素材引用将在这里展开。</p><el-button type="primary" @click="emit('prepare')">前往分镜制作</el-button></div>
        <div v-if="mode === 'workflow'" class="canvas-controls"><button type="button" aria-label="缩小画布" title="缩小" @click="changeZoom('out')"><el-icon><Minus /></el-icon></button><span>{{ Math.round(flowViewport.zoom * 100) }}%</span><button type="button" aria-label="放大画布" title="放大" @click="changeZoom('in')"><el-icon><Plus /></el-icon></button><i /><button type="button" aria-label="总览画布" title="总览画布" @click="overview"><el-icon><FullScreen /></el-icon></button><button type="button" aria-label="重排节点" title="重排节点" @click="resetLayout"><el-icon><Refresh /></el-icon></button></div>
        <div v-if="resources.error.value" class="resource-feedback" role="status">{{ resources.error.value }}<button type="button" @click="resources.refresh">重试</button></div>
        <span v-else-if="mode === 'workflow'" class="canvas-hint" role="status">{{ connectionHint }}</span>
      </main>
      <FlowInspector v-if="selected" :project-id="project.id!" :media="selected" :references="references" :available="available" :state="selected.shot ? actions.state(selected.shot) : undefined" :settings="settings" :dirty="!!drafts[selected.shot?.id || '']" :saving="saving" @close="selectedId = ''" @edit="edit" @patch="patchShot(selected!.shot!.id!, $event)" @bind="bind($event)" @remove="bind($event, selected!.shot!.id, true)" @save="saveShot(selected!.shot!.id!)" @generate="generate" @query="taskAction('query')" @restore="taskAction('restore')" @discard="delete drafts[selected!.shot!.id!]" />
    </div>
  </div>
</template>

<style scoped>
.drama-flow-designer { position:fixed; inset:0; z-index:1800; display:flex; flex-direction:column; background:var(--drama-canvas); color:var(--drama-text); font-family:inherit; outline:none; }
.designer-header { display:grid; grid-template-columns:minmax(0,1fr) auto minmax(0,1fr); align-items:center; height:78px; flex:none; padding:0 24px; border-bottom:1px solid var(--drama-border); background:var(--drama-surface-strong); gap:20px; }.project-heading { display:flex; gap:14px; align-items:center; min-width:0; }.back-button { display:grid; place-items:center; width:32px; height:32px; flex:none; border:1px solid var(--drama-border); border-radius:8px; background:white; color:var(--drama-text-secondary); cursor:pointer; }.project-heading>div { min-width:0; }.project-overline { color:var(--drama-text-tertiary); letter-spacing:1.4px; font-size:9px; }.project-heading h1 { font-size:16px; line-height:1.4; font-weight:650; margin:5px 0 0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }.view-switch { display:flex; gap:4px; padding:4px; border:1px solid var(--drama-border-subtle); border-radius:9px; background:var(--drama-surface-muted); }.view-switch button { display:flex; align-items:center; justify-content:center; gap:7px; min-width:100px; padding:9px 16px; border:0; border-radius:6px; cursor:pointer; background:transparent; font-size:12px; color:var(--drama-text-secondary); }.view-switch button.active { background:var(--drama-surface-strong); color:var(--drama-primary); box-shadow:0 1px 4px rgb(32 44 64 / 9%); }.header-actions { display:flex; justify-content:flex-end; align-items:center; gap:14px; }.layout-status { font-size:10px; color:var(--drama-text-tertiary); white-space:nowrap; }
.designer-subbar { display:flex; align-items:center; justify-content:space-between; height:48px; flex:none; padding:0 26px; background:var(--drama-surface-strong); border-bottom:1px solid var(--drama-border); gap:12px; }.version-control { display:flex; align-items:center; gap:14px; min-width:0; }.workspace-label { font-size:12px; font-weight:600; white-space:nowrap; }.subbar-divider { height:14px; width:1px; background:var(--drama-border); }.version-control .el-select { width:188px; }.version-control :deep(.el-select__wrapper) { box-shadow:none; background:transparent; min-height:28px; font-size:11px; }.production-summary { display:flex; align-items:center; gap:13px; font-size:11px; color:var(--drama-text-tertiary); white-space:nowrap; }.production-summary i { width:3px; height:3px; border-radius:50%; background:var(--drama-border); }
.designer-body { display:flex; flex:1; min-height:0; position:relative; overflow:hidden; }.canvas-region { position:relative; flex:1; min-width:0; height:100%; }.canvas-region :deep(.vue-flow) { background:var(--drama-canvas); }.canvas-region :deep(.vue-flow__node-collection) { background:rgb(255 255 255 / 34%); border:1px dashed #d4deec; border-radius:16px; text-align:left; padding:20px 28px; font-size:13px; font-weight:600; color:var(--drama-text-secondary); }.canvas-region :deep(.vue-flow__edge.selected .vue-flow__edge-path) { stroke:var(--drama-primary); }.canvas-region :deep(.vue-flow__minimap) { border:1px solid var(--drama-border); border-radius:9px; overflow:hidden; background:var(--drama-surface-strong); box-shadow:0 3px 14px rgb(32 44 64 / 4%); margin:20px; }
.asset-rail { position:absolute; left:20px; top:20px; width:56px; padding:7px 5px; display:grid; gap:4px; border:1px solid var(--drama-border); border-radius:11px; background:var(--drama-surface-strong); box-shadow:0 4px 16px rgb(32 44 64 / 6%); }.asset-rail button { display:grid; gap:5px; place-items:center; width:44px; padding:10px 0; font-size:10px; color:var(--drama-text-secondary); border:0; border-radius:6px; background:transparent; cursor:pointer; }.asset-rail .el-icon { font-size:17px; }.asset-rail button:hover,.asset-rail button.active { background:var(--drama-primary-soft); color:var(--drama-primary); }.asset-library { position:absolute; left:88px; top:20px; bottom:82px; width:256px; display:flex; flex-direction:column; padding:16px; border:1px solid var(--drama-border); border-radius:11px; background:var(--drama-surface-strong); box-shadow:0 8px 24px rgb(32 44 64 / 7%); }.library-heading { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }.library-heading h2 { font-size:13px; margin:0; font-weight:650; }.library-heading small { margin-left:5px; color:var(--drama-text-tertiary); font-size:11px; font-weight:400; }.icon-button { border:0; cursor:pointer; background:transparent; color:var(--drama-text-tertiary); padding:4px; display:grid; }.library-list { overflow:auto; margin-top:12px; display:grid; align-content:start; gap:6px; flex:1; }.library-list>button { display:flex; gap:10px; text-align:left; align-items:center; padding:8px; border:0; border-radius:6px; background:transparent; cursor:pointer; min-width:0; }.library-list>button:hover { background:var(--drama-surface-muted); }.library-thumb { width:48px; height:48px; flex:none; display:grid; place-items:center; border-radius:5px; overflow:hidden; background:var(--drama-image-surface); color:var(--drama-text-tertiary); --asset-image-height:48px; }.library-thumb :deep(.el-image) { display:block; margin:0; height:48px; width:48px; border:0; }.library-list>button>div:last-child { min-width:0; display:grid; gap:6px; }.library-list strong { font-size:12px; color:var(--drama-text); font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }.library-list span { font-size:10px; color:var(--drama-text-tertiary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }.library-empty { margin:28px 0; text-align:center; font-size:12px; color:var(--drama-text-tertiary); }
.canvas-controls { position:absolute; bottom:20px; left:20px; display:flex; align-items:center; gap:4px; padding:6px 8px; background:var(--drama-surface-strong); border:1px solid var(--drama-border); border-radius:9px; box-shadow:0 3px 12px rgb(32 44 64 / 5%); }.canvas-controls button { width:30px; height:30px; display:grid; place-items:center; border:0; border-radius:5px; background:transparent; color:var(--drama-text-secondary); cursor:pointer; }.canvas-controls button:hover,.canvas-controls button.active { color:var(--drama-primary); background:var(--drama-primary-soft); }.canvas-controls>span { min-width:40px; text-align:center; font-size:11px; font-variant-numeric:tabular-nums; color:var(--drama-text-secondary); }.canvas-controls>i { width:1px; height:16px; margin:0 4px; background:var(--drama-border); }.canvas-hint { position:absolute; bottom:32px; left:50%; transform:translateX(-50%); color:var(--drama-text-tertiary); font-size:10px; pointer-events:none; white-space:nowrap; }.resource-feedback { position:absolute; bottom:78px; left:20px; max-width:calc(100% - 40px); color:var(--drama-warning); font-size:11px; padding:9px 12px; border:1px solid var(--drama-border); border-radius:6px; background:var(--drama-surface-strong); }.resource-feedback button { cursor:pointer; border:0; background:transparent; color:var(--drama-primary); margin-left:8px; }
.canvas-empty { position:absolute; top:40%; left:50%; transform:translate(-50%,-50%); padding:24px; text-align:center; border:1px solid var(--drama-border); border-radius:12px; background:var(--drama-surface-strong); box-shadow:0 8px 30px rgb(32 44 64 / 5%); width:min(340px,70%); }.canvas-empty>.el-icon { color:var(--drama-primary); font-size:30px; }.canvas-empty h2 { margin:16px 0 10px; font-size:18px; }.canvas-empty p { font-size:12px; line-height:1.8; color:var(--drama-text-secondary); margin-bottom:20px; }
.storyboard-view { height:100%; overflow:auto; padding:32px; }.board-heading { display:flex; justify-content:space-between; align-items:flex-end; gap:16px; margin:4px 0 28px; }.board-heading span { font-size:10px; letter-spacing:2px; color:var(--drama-primary); }.board-heading h2 { margin:10px 0 0; font-size:22px; font-weight:600; }.board-heading p { color:var(--drama-text-tertiary); font-size:11px; }.storyboard-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(235px,1fr)); gap:22px; padding-bottom:48px; }.storyboard-tile { border:1px solid var(--drama-border); border-radius:11px; padding:0; overflow:hidden; text-align:left; background:var(--drama-surface-strong); cursor:pointer; color:inherit; }.storyboard-tile.selected { border-color:var(--drama-primary); box-shadow:0 0 0 2px rgb(37 99 235 / 12%); }.board-image { position:relative; aspect-ratio:16/9; display:grid; place-items:center; background:var(--drama-image-surface); --asset-image-height:100%; }.board-image :deep(.el-image) { display:block; width:100%; height:100%; margin:0; border:0; position:absolute; inset:0; }.board-image>.el-icon { font-size:34px; color:#a7b5ca; }.board-image>span { position:absolute; top:10px; left:10px; padding:4px 7px; border-radius:4px; background:rgb(32 44 64 / 65%); color:white; font-size:10px; }.board-copy { padding:16px; }.board-copy h3 { margin:0 0 8px; font-size:13px; font-weight:650; }.board-copy p { color:var(--drama-text-secondary); font-size:11px; line-height:1.7; height:37px; overflow:hidden; margin:0 0 16px; }.board-copy small { display:flex; justify-content:space-between; font-size:10px; color:var(--drama-text-tertiary); }
@media(max-width:1100px) { .designer-header { padding:0 16px; gap:12px; }.layout-status { display:none; }.canvas-hint { display:none; }.production-summary { gap:8px; } }
@media(max-width:700px) { .designer-header { height:112px; grid-template-columns:minmax(0,1fr) auto; gap:6px 12px; padding:12px 16px; }.project-overline { display:none; }.view-switch { grid-row:2; grid-column:1 / -1; justify-self:center; }.header-actions { grid-column:2; grid-row:1; }.header-actions .el-button { font-size:11px; padding:8px; }.designer-subbar { padding:0 16px; }.workspace-label,.subbar-divider,.production-summary { display:none; }.asset-rail { left:12px; top:12px; }.asset-library { left:76px; top:12px; width:min(256px,calc(100% - 92px)); }.storyboard-view { padding:22px 16px; }.board-heading p { display:none; }.board-heading h2 { font-size:18px; }.canvas-region :deep(.vue-flow__minimap) { display:none; } }
</style>
