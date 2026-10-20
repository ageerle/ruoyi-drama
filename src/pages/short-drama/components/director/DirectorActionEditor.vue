<script setup lang="ts">
import { computed } from 'vue';
import { directorActions, type ActionClip, type DirectorAction, type DirectorObject } from '@/utils/dramaDirector';
const props = defineProps<{ object: DirectorObject; frame: number; end: number; selectedClip: string }>();
const emit = defineEmits<{ add: [action: DirectorAction]; select: [id: string]; patch: [id: string, patch: Partial<ActionClip>]; remove: [id: string]; duplicate: [id: string] }>();
const clips = computed(() => props.object.clips || []);
const clip = computed(() => clips.value.find(c => c.id === props.selectedClip));
const inUse = computed(() => clips.value.some(c => props.frame>=c.start && props.frame<c.end));
function seconds(event: Event) { return Math.round(Number((event.target as HTMLInputElement).value)*24); }
function value(event: Event) { return Number((event.target as HTMLInputElement).value); }
function time(id: string, patch: Partial<ActionClip>) { const c=clips.value.find(c=>c.id===id); if(c) { const length=(patch.end??c.end)-(patch.start??c.start); emit('patch',id,{...patch,blend:Math.min(c.blend,Math.max(0,Math.floor(length/2)))}); } }
</script>
<template>
  <section class="action-editor" aria-label="人物动作编排">
    <div class="section-title"><strong>动作库</strong><span>加入当前 {{(frame/24).toFixed(2)}}s</span></div>
    <div class="action-library"><button v-for="(label,action) in directorActions" :key="action" :disabled="object.locked || inUse" :aria-label="`添加${label}动作片段`" @click="emit('add',action)">{{label}}<small>＋</small></button></div>
    <p class="tip">先把时间轴移到空白时段，再添加动作。人物位移在「走位」中另设，行走动作不会自动改变位置。</p>
    <div class="section-title"><strong>动作片段</strong><span>{{clips.length}} 段</span></div>
    <div class="clip-list"><button v-for="c in clips" :key="c.id" :class="{selected:c.id===selectedClip,live:frame>=c.start && frame<c.end}" @click="emit('select',c.id)"><i/><b>{{directorActions[c.action]}}</b><span>{{(c.start/24).toFixed(2)}}–{{(c.end/24).toFixed(2)}}s</span></button></div>
    <p v-if="!clips.length" class="tip">尚未编排动作。可按顺序加入行走、招手、伸手和点头。</p>
    <div v-if="clip" class="clip-form">
      <label>片段动作<select :value="clip.action" aria-label="片段动作" :disabled="object.locked" @change="emit('patch',clip.id,{action:($event.target as HTMLSelectElement).value as DirectorAction})"><option v-for="(label,action) in directorActions" :key="action" :value="action">{{label}}</option></select></label>
      <div class="time-inputs"><label>开始（秒）<input type="number" min="0" :max="end/24" step="0.125" :value="Number((clip.start/24).toFixed(3))" aria-label="动作开始秒数" :disabled="object.locked" @change="time(clip.id,{start:seconds($event)})"></label><label>结束（秒）<input type="number" min="0" :max="(end+1)/24" step="0.125" :value="Number((clip.end/24).toFixed(3))" aria-label="动作结束秒数" :disabled="object.locked" @change="time(clip.id,{end:seconds($event)})"></label></div>
      <label>动作速度 <b>{{clip.speed.toFixed(2)}}×</b><input type="range" min="0.25" max="3" step="0.05" :value="clip.speed" aria-label="动作速度倍率" :disabled="object.locked" @change="emit('patch',clip.id,{speed:value($event)})"></label>
      <label>动作幅度 <b>{{Math.round(clip.strength*100)}}%</b><input type="range" min="0" max="1.5" step="0.05" :value="clip.strength" aria-label="动作幅度" :disabled="object.locked" @change="emit('patch',clip.id,{strength:value($event)})"></label>
      <label>首尾过渡（帧）<input type="number" min="0" :max="Math.floor((clip.end-clip.start)/2)" :value="clip.blend" aria-label="动作过渡帧数" :disabled="object.locked" @change="emit('patch',clip.id,{blend:value($event)})"></label>
      <div class="actions"><button :disabled="object.locked" @click="emit('duplicate',clip.id)">接在后面复制</button><button :disabled="object.locked" @click="emit('remove',clip.id)">删除片段</button></div>
      <p class="tip">过渡会把动作淡入、淡出到基础动作；速度只改变动作节奏，不改变片段长度。</p>
    </div>
  </section>
</template>
<style scoped>
.section-title{display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#476381;margin:4px 0 12px}.section-title span{font-size:9px;color:#9aaabe}.action-library{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.action-library button{display:flex;justify-content:space-between;padding:10px 8px;border:1px solid #d9e5f4;border-radius:5px;background:#f5f9ff;font:10px inherit;color:#547394;cursor:pointer}.action-library button:hover{border-color:#70a1df;background:#eaf3ff}.action-library small{color:#9fb9d9}.tip{font-size:10px;color:#8b9bb1;line-height:1.8;margin:12px 0 22px}.clip-list{display:grid;gap:5px}.clip-list button{display:flex;align-items:center;gap:8px;border:1px solid #dfe7f1;border-radius:5px;padding:10px 9px;background:#fafcff;color:#607995;text-align:left;font:10px inherit;cursor:pointer}.clip-list b{font-weight:500}.clip-list span{margin-left:auto;font-size:9px;color:#95a6ba}.clip-list i{width:5px;height:5px;border-radius:50%;background:#c1d0e3}.clip-list .selected{border-color:#93b6e4;background:#edf5ff;color:#2c74d1}.clip-list .live i{background:#3b83dc}.clip-form{margin-top:15px;padding-top:17px;border-top:1px solid #e7edf5}.clip-form label{display:block;font-size:10px;color:#657b97;margin-bottom:15px}.clip-form label>b{float:right;font-size:10px;font-weight:500;color:#367bd0}.clip-form input,.clip-form select{box-sizing:border-box;width:100%;margin-top:8px;accent-color:#4384d7}.clip-form input[type=number],.clip-form select{border:1px solid #d9e4f1;border-radius:4px;height:32px;padding:0 8px;background:#f8fafc;font:11px inherit;color:#456484}.time-inputs{display:flex;gap:10px}.time-inputs label{flex:1;min-width:0}.actions{display:flex;gap:8px}.actions button{flex:1;border:1px solid #dbe5f1;background:#fff;color:#617b9b;border-radius:4px;padding:8px 3px;font:10px inherit;cursor:pointer}.action-editor button:disabled,.action-editor input:disabled,.action-editor select:disabled{opacity:.4;cursor:default}
</style>
