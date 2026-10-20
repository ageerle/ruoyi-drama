<script setup lang="ts">
import { computed } from 'vue';
import { canvasLabels,canvasKinds,type CanvasKind } from '@/utils/dramaCanvas';
const props=defineProps<{x:number;y:number;target?:string;edge?:string;count:number;canUndo:boolean;canRedo:boolean;canPaste:boolean;origin?:string}>();
const emit=defineEmits<{add:[kind:CanvasKind];action:[name:string]}>();
const position=computed(()=>({left:`${Math.max(8,Math.min(props.x,window.innerWidth-238))}px`,top:`${Math.max(8,Math.min(props.y,window.innerHeight-510))}px`}));
</script>
<template>
  <div class="canvas-context" :style="position" role="menu" aria-label="画布右键菜单" @pointerdown.stop @contextmenu.prevent>
    <template v-if="edge"><button role="menuitem" @click="emit('action','unlink')">移除连线</button></template>
    <template v-else>
      <span class="menu-section">{{ origin ? '连接到新节点' : target ? `节点操作 · 已选 ${count}` : '添加节点' }}</span>
      <template v-if="!target"><button v-for="kind in canvasKinds" :key="kind" role="menuitem" @click="emit('add',kind)"><span>＋ {{canvasLabels[kind]}}</span></button></template>
      <template v-else><button role="menuitem" @click="emit('action','inspect')">编辑节点 <kbd>Enter</kbd></button><button role="menuitem" @click="emit('action','copy')">复制节点 <kbd>Ctrl C</kbd></button><button role="menuitem" @click="emit('action','duplicate')">创建副本 <kbd>Ctrl D</kbd></button><button role="menuitem" @click="emit('action','group')">成组 <kbd>Ctrl G</kbd></button><button role="menuitem" @click="emit('action','ungroup')">解组 <kbd>Ctrl Shift G</kbd></button><button role="menuitem" class="danger" @click="emit('action','remove')">从画布移除 <kbd>Delete</kbd></button></template>
      <hr><button role="menuitem" :disabled="!canPaste" @click="emit('action','paste')">粘贴节点 <kbd>Ctrl V</kbd></button><button role="menuitem" :disabled="!canUndo" @click="emit('action','undo')">撤销 <kbd>Ctrl Z</kbd></button><button role="menuitem" :disabled="!canRedo" @click="emit('action','redo')">重做 <kbd>Ctrl Shift Z</kbd></button><hr><button role="menuitem" @click="emit('action','overview')">适应画布 <kbd>Ctrl 0</kbd></button>
    </template>
  </div>
</template>
<style scoped>
.canvas-context{position:fixed;z-index:2200;width:220px;background:var(--drama-surface-strong);padding:7px;border:1px solid var(--drama-border);border-radius:10px;box-shadow:0 12px 40px #18293a26}.canvas-context button{display:flex;align-items:center;justify-content:space-between;width:100%;border:0;background:transparent;border-radius:5px;padding:9px 11px;text-align:left;color:var(--drama-text);font-size:12px;cursor:pointer}.canvas-context button:hover:not(:disabled){background:var(--drama-primary-soft);color:var(--drama-primary)}.canvas-context button:disabled{opacity:.35;cursor:default}.canvas-context .danger{color:var(--drama-danger)}.menu-section{display:block;padding:8px 11px;color:var(--drama-text-tertiary);font-size:10px}.canvas-context kbd{font:10px inherit;color:var(--drama-text-tertiary)}.canvas-context hr{border:0;border-top:1px solid var(--drama-border-subtle);margin:5px}
</style>
