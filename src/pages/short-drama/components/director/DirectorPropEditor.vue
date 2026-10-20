<script setup lang="ts">
import type { DirectorObject } from '@/utils/dramaDirector';
defineProps<{object:DirectorObject;objects:DirectorObject[];frame:number;end:number}>();
const emit=defineEmits<{patch:[value:Partial<DirectorObject>]}>();
</script>
<template>
  <section v-if="object.kind==='cannon'" class="prop-action">
    <strong>开炮预演</strong>
    <label>命中目标<select aria-label="大炮命中目标" :disabled="object.locked" :value="object.targetId||''" @change="emit('patch',{targetId:($event.target as HTMLSelectElement).value||undefined})"><option value="">前方空地</option><option v-for="target in objects.filter(o=>o.kind==='castle')" :key="target.id" :value="target.id">{{target.name}}</option></select></label>
    <label>发射时刻（秒）<input aria-label="开炮时刻（秒）" type="number" min="0" :max="end/24" step="0.25" :disabled="object.locked" :value="object.fireFrame===undefined?'':object.fireFrame/24" placeholder="留空不发射" @change="emit('patch',{fireFrame:($event.target as HTMLInputElement).value===''?undefined:Math.round(Number(($event.target as HTMLInputElement).value)*24)})"/></label>
    <div><button :disabled="object.locked" @click="emit('patch',{fireFrame:frame})">在当前帧开炮</button><button :disabled="object.locked||object.fireFrame===undefined" @click="emit('patch',{fireFrame:undefined})">取消发射</button></div>
    <p>选择城门后，炮口朝向命中点，半秒后显示墙体破口、碎砖和扬尘。向后拖动时间轴可恢复完好的城墙。炮身后坐用位置关键帧调整。</p>
  </section>
</template>
<style scoped>
.prop-action select{width:100%;padding:7px;background:white;color:#4776aa;border:1px solid #d3dfed;border-radius:4px}
.prop-action{padding:12px;margin:16px 0;border:1px solid #dce5f0;border-radius:6px;background:#f7faff;color:#56718f;font-size:11px}.prop-action strong{font-weight:500}.prop-action label{display:grid;gap:7px;margin:12px 0}.prop-action input{width:100%;box-sizing:border-box;padding:7px;border:1px solid #d3dfed;border-radius:4px}.prop-action div{display:flex;gap:6px}.prop-action button{font:10px inherit;background:white;border:1px solid #d3dfed;border-radius:4px;padding:6px;color:#4776aa;cursor:pointer}.prop-action p{font-size:10px;line-height:1.8;color:#879ab0}.prop-action button:disabled{opacity:.4;cursor:default}
</style>
