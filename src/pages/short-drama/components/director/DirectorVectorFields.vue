<script setup lang="ts">
import type { Vec3 } from '@/utils/dramaDirector';
const props = withDefaults(defineProps<{ value: Vec3; label: string; min?: number; max?: number; disabled?: boolean }>(), { min: -100, max: 100, disabled: false });
const emit = defineEmits<{ change: [value: Vec3] }>();
function change(index: number, event: Event) {
  const input = event.target as HTMLInputElement, number = Number(input.value);
  if (!input.value || !Number.isFinite(number)) { input.value = String(props.value[index]); return; }
  const next: Vec3 = [...props.value]; next[index] = Math.max(props.min, Math.min(props.max, number)); emit('change', next);
}
</script>
<template><div class="vector-fields"><label v-for="(axis,i) in ['X','Y','Z']" :key="axis"><span>{{axis}}</span><input type="number" :aria-label="`${label} ${axis}`" :value="Number(value[i]?.toFixed(3))" :min="min" :max="max" :disabled="disabled" step="0.1" @change="change(i,$event)"></label></div></template>
<style scoped>
.vector-fields{display:flex;gap:6px}.vector-fields label{position:relative;min-width:0;flex:1}.vector-fields span{position:absolute;left:8px;top:9px;color:#95a4b9;font-size:10px;pointer-events:none}.vector-fields input{box-sizing:border-box;min-width:0;width:100%;height:32px;border:1px solid #dbe3ee;background:#f8fafc;border-radius:4px;padding:4px 3px 4px 24px;font-size:11px;color:#3c506b;outline:none}.vector-fields input:focus{border-color:#4889e0}
</style>
