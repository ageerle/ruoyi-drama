<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import { Close, ArrowRight, Link, Headset } from '@element-plus/icons-vue';
import type { FlowMedia, FlowShotPatch } from '@/utils/dramaFlowGraph';
import { flowKindLabels } from '@/utils/dramaFlowGraph';
import { voiceBlob } from '@/api/shortDrama/voices';
import type { FlowModelSettings, FlowShotState } from './types';
import GeneratedAssetImage from '../GeneratedAssetImage.vue';
import ShotVideoPanel from '../ShotVideoPanel.vue';
import ShotVideoModel from '../ShotVideoModel.vue';
import ShotVideoDuration from '../ShotVideoDuration.vue';
import VideoPromptEditor from '../VideoPromptEditor.vue';

const props = defineProps<{
  projectId: string; media: FlowMedia; references: FlowMedia[]; available: FlowMedia[];
  state?: FlowShotState; settings: FlowModelSettings; dirty: boolean; saving: boolean;
}>();
const emit = defineEmits<{
  close: []; edit: [media: FlowMedia]; patch: [patch: Partial<FlowShotPatch>]; bind: [id: string];
  remove: [id: string]; save: []; generate: []; query: []; restore: []; discard: [];
}>();
const referenceId = ref('');
const shot = computed(() => props.media.shot);
const audioUrl = ref(''), audioBusy = ref(false), audioError = ref('');
let audioEpoch = 0;
function clearAudio() { audioEpoch++; if (audioUrl.value) URL.revokeObjectURL(audioUrl.value); audioUrl.value = ''; audioError.value = ''; audioBusy.value = false; }
watch(() => props.media.id, () => { referenceId.value = ''; clearAudio(); });
onUnmounted(clearAudio);
async function listen() {
  if (!props.media.characterId || !props.media.sampleId || audioBusy.value) return;
  const epoch = ++audioEpoch;
  audioBusy.value = true; audioError.value = '';
  try {
    const blob = await voiceBlob(props.projectId, props.media.characterId, props.media.sampleId);
    if (epoch === audioEpoch) audioUrl.value = URL.createObjectURL(blob);
  } catch (e) { if (epoch === audioEpoch) audioError.value = e instanceof Error ? e.message : '样音读取失败'; }
  finally { if (epoch === audioEpoch) audioBusy.value = false; }
}
</script>

<template>
  <aside class="flow-inspector" aria-label="节点详情">
    <header><div><span>{{ flowKindLabels[media.kind] }}节点</span><h2>{{ media.title }}</h2></div><button class="icon-button" type="button" aria-label="关闭节点详情" @click="emit('close')"><el-icon><Close /></el-icon></button></header>
    <div class="inspector-scroll">
      <template v-if="shot && state">
        <section class="inspector-section">
          <div class="section-label"><h3>镜头内容</h3><span>{{ dirty ? '有未保存修改' : '已与项目同步' }}</span></div>
          <el-form label-position="top">
            <el-form-item label="镜头标题"><el-input :model-value="shot.sceneTitle" :disabled="state.blocked || saving" @update:model-value="emit('patch', { sceneTitle: $event })" /></el-form-item>
            <VideoPromptEditor :key="media.id" :model-value="shot.videoPrompt" compact :disabled="state.blocked || saving" @update:model-value="emit('patch', { videoPrompt: $event })" />
            <details class="model-settings"><summary>模型与时长</summary><ShotVideoModel :continuity-json="shot.continuityJson" :models="settings.models" :fallback="settings.fallback" :disabled="state.blocked || saving" @update="emit('patch', { continuityJson: $event })" /><ShotVideoDuration :continuity-json="shot.continuityJson" :disabled="state.blocked || saving" @update="emit('patch', { continuityJson: $event })" /></details>
          </el-form>
        </section>
        <section class="inspector-section">
          <div class="section-label"><h3>素材引用 <small>{{ references.length }}</small></h3><el-icon><Link /></el-icon></div>
          <div class="reference-list"><div v-for="reference in references" :key="reference.id" class="reference-row"><span class="reference-kind">{{ flowKindLabels[reference.kind] }}</span><span :title="`${reference.title} · ${reference.subtitle}`">{{ reference.title }}<small>{{ reference.kind === 'character' ? reference.subtitle : '' }}</small></span><button v-if="reference.kind !== 'voice'" type="button" :disabled="state.blocked || saving" :aria-label="`移除${reference.title}引用`" @click="emit('remove', reference.id)"><el-icon><Close /></el-icon></button></div></div>
          <p v-if="!references.length" class="quiet">暂无画布中的素材引用</p>
          <div class="add-reference"><el-select v-model="referenceId" placeholder="添加角色、场景或道具" aria-label="选择素材引用" filterable :disabled="state.blocked || saving"><el-option v-for="asset in available" :key="asset.id" :value="asset.id" :label="`${flowKindLabels[asset.kind]} · ${asset.title}${asset.kind === 'character' ? ' · ' + asset.subtitle : ''}`" /></el-select><el-button :disabled="!referenceId || state.blocked || saving" @click="emit('bind', referenceId); referenceId = ''">添加</el-button></div>
          <p class="quiet">也可从素材右侧的圆点连到视频节点。声音自动匹配规则沿用现有分镜流程。</p>
        </section>
        <ShotVideoPanel :shot="shot" :preview-src="state.previewSrc" :blocked="state.blocked" :unknown="state.unknown" :hint="state.hint" :can-restore="state.canRestore" :disabled="saving || state.busy" @query="emit('query')" @restore="emit('restore')">
          <template #actions><el-button type="primary" :loading="state.busy" :disabled="!state.canGenerate || saving" @click="emit('generate')">{{ shot.videoStatus === 'done' ? '重新生成视频' : '生成视频' }}</el-button></template>
        </ShotVideoPanel>
        <button type="button" class="full-editor" :disabled="dirty" @click="emit('edit', media)">打开完整分镜编辑<el-icon><ArrowRight /></el-icon></button>
      </template>
      <template v-else>
        <GeneratedAssetImage v-if="media.imageUrl" :src="media.imageUrl" :title="media.title" :model="media.model" :prediction-id="media.predictionId" />
        <section class="asset-detail"><h3>{{ media.subtitle }}</h3><p>{{ media.kind === 'voice' ? '当前角色已选样音。样音选择与说话人设置沿用项目中的声音编辑。' : '这是项目已有素材。修改或生成候选图请进入原素材编辑。' }}</p></section>
        <template v-if="media.kind === 'voice'"><el-button v-if="!audioUrl" :icon="Headset" :loading="audioBusy" @click="listen">试听样音</el-button><audio v-else :src="audioUrl" controls autoplay aria-label="角色样音" /><p v-if="audioError" role="alert" class="audio-error">{{ audioError }}</p></template>
        <el-button :icon="ArrowRight" @click="emit('edit', media)">打开{{ media.kind === 'voice' ? '角色声音' : '素材' }}编辑</el-button>
      </template>
    </div>
    <footer v-if="shot"><el-button :disabled="!dirty || saving" @click="emit('discard')">撤销修改</el-button><el-button type="primary" :loading="saving" :disabled="!dirty || state?.blocked" @click="emit('save')">保存镜头</el-button></footer>
  </aside>
</template>

<style scoped>
.flow-inspector { width:360px; height:100%; display:flex; flex-direction:column; flex:none; background:var(--drama-surface-strong); border-left:1px solid var(--drama-border); box-shadow:-6px 0 20px rgb(32 44 64 / 3%); z-index:5; }
header { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; padding:22px 20px 18px; border-bottom:1px solid var(--drama-border-subtle); } header span { font-size:11px; color:var(--drama-text-tertiary); } header h2 { margin:8px 0 0; color:var(--drama-text); font-size:17px; line-height:1.5; font-weight:650; overflow-wrap:anywhere; }
.icon-button { display:grid; place-items:center; width:28px; height:28px; border:0; border-radius:5px; color:var(--drama-text-secondary); background:transparent; cursor:pointer; }.icon-button:hover { background:var(--drama-surface-muted); }
.inspector-scroll { flex:1; overflow:auto; padding:20px; --asset-image-height:220px; }.inspector-section { margin-bottom:22px; }.section-label { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; color:var(--drama-text-tertiary); }.section-label h3 { font-size:12px; color:var(--drama-text); font-weight:650; margin:0; }.section-label span { font-size:10px; }.section-label small { color:var(--drama-text-tertiary); margin-left:4px; }
.inspector-scroll :deep(.el-form-item) { margin-bottom:16px; }.inspector-scroll :deep(.el-form-item__label) { font-size:11px; color:var(--drama-text-secondary); margin-bottom:6px; }.inspector-scroll :deep(.el-textarea__inner) { font-size:12px; line-height:1.8; padding:10px; }.model-settings summary { cursor:pointer; font-size:11px; color:var(--drama-text-secondary); padding:4px 0 12px; }.model-settings :deep(.el-select) { width:100%; }
.reference-list { display:grid; gap:6px; }.reference-row { display:flex; align-items:center; gap:8px; padding:9px 10px; border:1px solid var(--drama-border-subtle); border-radius:6px; font-size:12px; }.reference-row>span:nth-child(2) { min-width:0; flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }.reference-row small { margin-left:6px; color:var(--drama-text-tertiary); font-size:10px; }.reference-kind { color:var(--drama-primary); font-size:10px; }.reference-row button { border:0; background:transparent; color:var(--drama-text-tertiary); cursor:pointer; display:grid; padding:2px; }
.add-reference { display:flex; gap:6px; margin-top:10px; }.add-reference .el-select { flex:1; }.quiet { font-size:11px; color:var(--drama-text-tertiary); line-height:1.8; margin:10px 0 0; }.asset-detail { margin:18px 0; }.asset-detail h3 { font-size:13px; line-height:1.6; }.asset-detail p { font-size:12px; line-height:1.8; color:var(--drama-text-secondary); } audio { width:100%; }.audio-error { color:var(--drama-danger); font-size:12px; }
.full-editor { display:flex; gap:6px; align-items:center; justify-content:center; width:100%; padding:14px; margin-top:14px; border:0; color:var(--drama-text-secondary); background:transparent; cursor:pointer; font-size:12px; }.full-editor:disabled { opacity:.5; cursor:default; } footer { display:flex; justify-content:flex-end; gap:8px; padding:16px 20px; border-top:1px solid var(--drama-border); } footer .el-button+.el-button { margin:0; }
@media(max-width:900px) { .flow-inspector { position:absolute; right:0; top:0; width:min(360px,92vw); } }
</style>
