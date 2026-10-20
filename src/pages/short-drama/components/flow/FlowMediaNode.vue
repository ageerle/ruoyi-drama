<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core';
import { Picture, VideoCamera, Microphone, User, Location, Box, ArrowRight } from '@element-plus/icons-vue';
import GeneratedAssetImage from '../GeneratedAssetImage.vue';
import type { FlowMedia } from '@/utils/dramaFlowGraph';
import { flowKindLabels } from '@/utils/dramaFlowGraph';

defineProps<{ data: FlowMedia & { references: number; dirty: boolean; compact: boolean; blocked: boolean }; selected?: boolean }>();
const emit = defineEmits<{ inspect: [id: string] }>();
const icons = { character: User, location: Location, prop: Box, voice: Microphone, shot: VideoCamera };
</script>

<template>
  <article class="flow-media" :class="[data.kind, { selected, dirty: data.dirty, compact: data.compact }]">
    <Handle v-if="data.kind === 'shot'" type="target" :position="Position.Left" id="references" aria-label="镜头参考输入" />
    <div class="media-heading">
      <span class="media-kind"><el-icon><component :is="icons[data.kind]" /></el-icon>{{ flowKindLabels[data.kind] }}<template v-if="data.shot"> · {{ String(data.shot.sceneNo).padStart(2, '0') }}</template></span>
      <span v-if="data.dirty" class="media-status pending">待保存</span>
      <span v-else-if="data.shot" class="media-status" :class="{ done: data.shot.videoStatus === 'done', failed: data.shot.videoStatus === 'failed' }">{{ data.blocked ? '处理中' : data.shot.videoStatus === 'done' ? '已生成' : data.shot.videoStatus === 'failed' ? '失败' : '待生成' }}</span>
    </div>
    <div v-if="data.kind !== 'voice'" class="media-image" :class="{ 'has-image': data.imageUrl }">
      <GeneratedAssetImage v-if="data.imageUrl" :src="data.imageUrl" :title="data.title" :model="data.model" :prediction-id="data.predictionId" :interactive="false" />
      <div v-else class="media-placeholder"><el-icon><component :is="data.kind === 'shot' ? VideoCamera : Picture" /></el-icon><span>{{ data.kind === 'shot' ? '视频镜头' : '暂无参考图' }}</span></div>
      <span v-if="data.duration" class="duration">{{ data.duration }}s</span>
      <span v-if="data.kind === 'shot' && data.imageUrl" class="image-caption">参考画面</span>
    </div>
    <div v-else class="voice-art" aria-hidden="true"><i v-for="(height, index) in [12, 24, 18, 38, 30, 46, 22, 34, 42, 18, 28, 14, 36, 24, 40, 16, 28, 12]" :key="index" :style="{ height: `${height}px` }" /></div>
    <div class="media-copy"><h3 :title="data.title">{{ data.title }}</h3><p :title="data.subtitle">{{ data.subtitle }}</p></div>
    <div v-if="!data.compact" class="media-footer"><span>{{ data.kind === 'shot' ? `${data.references} 个素材引用` : data.kind === 'voice' ? '已选角色样音' : '素材参考' }}</span><button type="button" class="nodrag nopan" @click.stop="emit('inspect', data.id)">{{ data.kind === 'shot' ? '编辑镜头' : '查看' }}<el-icon><ArrowRight /></el-icon></button></div>
    <Handle v-if="['character', 'location', 'prop', 'voice'].includes(data.kind)" type="source" :position="Position.Right" id="asset" :connectable="data.kind !== 'voice'" aria-label="素材参考输出" />
  </article>
</template>

<style scoped>
.flow-media { width:224px; overflow:visible; border:1px solid var(--drama-border); border-radius:12px; background:var(--drama-surface-strong); box-shadow:0 4px 12px rgb(32 44 64 / 5%); transition:border-color .15s,box-shadow .15s; }
.flow-media.shot { width:320px; }
.flow-media.selected { border-color:var(--drama-primary); box-shadow:0 0 0 3px rgb(37 99 235 / 10%),0 8px 24px rgb(32 44 64 / 8%); }
.flow-media.dirty:not(.selected) { border-color:var(--drama-secondary); }
.media-heading { display:flex; align-items:center; justify-content:space-between; padding:11px 13px; gap:8px; }
.media-kind { display:flex; align-items:center; gap:6px; font-size:11px; font-weight:600; color:var(--drama-text-secondary); }
.media-kind .el-icon { font-size:13px; }.shot .media-kind { color:var(--drama-primary); }
.media-status { font-size:10px; color:var(--drama-text-tertiary); }.media-status.done { color:var(--drama-success); }.media-status.failed { color:var(--drama-danger); }.media-status.pending { color:var(--drama-primary); }
.media-image { position:relative; height:140px; margin:0 8px; border-radius:7px; overflow:hidden; background:var(--drama-image-surface); --asset-image-height:140px; }
.shot .media-image { height:170px; --asset-image-height:170px; }.media-image :deep(.el-image) { margin:0; display:block; width:100%; height:var(--asset-image-height); border:0; background:transparent; }
.media-placeholder { display:grid; gap:10px; place-content:center; justify-items:center; height:100%; color:var(--drama-text-tertiary); font-size:11px; }.media-placeholder .el-icon { font-size:27px; color:#a7b5ca; }
.duration,.image-caption { position:absolute; bottom:8px; right:8px; color:white; background:rgb(32 44 64 / 70%); border-radius:4px; padding:3px 5px; font-size:10px; }.image-caption { left:8px; right:auto; }
.media-copy { padding:13px 14px 11px; }.media-copy h3 { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:var(--drama-text); font-size:13px; font-weight:650; margin:0 0 6px; }.media-copy p { margin:0; color:var(--drama-text-tertiary); font-size:11px; line-height:1.5; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; height:33px; }
.media-footer { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; border-top:1px solid var(--drama-border-subtle); font-size:10px; color:var(--drama-text-tertiary); }.media-footer button { display:flex; align-items:center; gap:4px; padding:2px 0; border:0; color:var(--drama-text-secondary); font-size:11px; background:transparent; cursor:pointer; }.media-footer button:hover { color:var(--drama-primary); }
.voice-art { display:flex; align-items:center; justify-content:center; gap:5px; height:76px; margin:0 8px; border-radius:7px; background:var(--drama-primary-soft); }.voice-art i { width:3px; border-radius:3px; background:var(--drama-secondary); opacity:.65; }
.flow-media :deep(.vue-flow__handle) { width:10px; height:10px; background:var(--drama-surface-strong); border:2px solid #a8b8d0; }.flow-media :deep(.vue-flow__handle:hover) { background:var(--drama-primary); border-color:var(--drama-primary); }.flow-media :deep(.vue-flow__handle)::before { content:''; position:absolute; inset:-8px; }
.compact .media-heading,.compact .media-copy p { display:none; }.compact .media-image { margin:8px 8px 0; }.compact .media-copy { padding:10px 14px; }.compact .media-copy h3 { margin:0; }
@media(prefers-reduced-motion:reduce) { .flow-media { transition:none; } }
</style>
