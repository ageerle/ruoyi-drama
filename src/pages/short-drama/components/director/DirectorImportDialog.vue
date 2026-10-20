<script setup lang="ts">
import { shallowRef } from 'vue';
import { validateDirector, type DirectorDocument } from '@/utils/dramaDirector';
const emit=defineEmits<{ close: []; import: [document: DirectorDocument] }>();
const source=shallowRef(''),error=shallowRef('');
function apply(){
  try{
    if(new TextEncoder().encode(source.value).length>1024*1024)throw new Error('工程不能超过 1MB');
    const document=validateDirector(JSON.parse(source.value));
    error.value='';emit('import',document);
  }catch(e){error.value=e instanceof SyntaxError?'JSON 格式不正确，请粘贴完整工程内容':e instanceof Error?e.message:'工程导入失败';}
}
</script>
<template>
  <div class="import-mask" @pointerdown.self="emit('close')">
    <section class="import-card" role="dialog" aria-modal="true" aria-label="粘贴导演工程">
      <header class="import-heading"><div><small>DIRECTOR PROJECT</small><h2>粘贴工程 JSON</h2></div><button aria-label="关闭工程粘贴" @click="emit('close')">×</button></header>
      <p class="import-note">把导出的 JSON 文件内容粘贴到这里。导入会替换当前节点的场景，原场景可通过撤销恢复。</p>
      <textarea v-model="source" class="import-source" aria-label="导演工程 JSON 内容" placeholder="粘贴完整的工程 JSON…" spellcheck="false" autofocus/>
      <p v-if="error" class="import-error" role="alert">{{error}}</p>
      <footer class="import-footer"><span>支持动作、姿态关键帧与机位 · 最大 1 MB</span><button :disabled="!source.trim()" @click="apply">导入此工程</button></footer>
    </section>
  </div>
</template>
<style scoped>
.import-mask{position:absolute;inset:0;z-index:2900;display:grid;place-items:center;background:#19355535}.import-card{width:min(700px,calc(100vw - 40px));padding:26px;background:#fff;border:1px solid #d6e2f1;border-radius:10px;box-shadow:0 22px 70px #18345230}.import-heading{display:flex;justify-content:space-between;align-items:center}.import-heading small{font-size:9px;letter-spacing:2px;color:#91a6c1}.import-heading h2{font-size:20px;font-weight:500;color:#315a87;margin:9px 0}.import-heading button{border:0;background:none;color:#849bb5;font-size:25px;cursor:pointer}.import-note{font-size:12px;line-height:1.8;color:#8397b1;margin:17px 0}.import-source{box-sizing:border-box;display:block;width:100%;height:280px;resize:vertical;padding:15px;border:1px solid #d9e5f3;border-radius:5px;background:#f7faff;color:#486687;font:12px/1.7 Consolas,monospace;outline:none}.import-source:focus{border-color:#74a5df}.import-error{font-size:12px;color:#b4674d;margin:13px 0}.import-footer{display:flex;justify-content:space-between;align-items:center;gap:15px;margin-top:20px;font-size:10px;color:#9aaac0}.import-footer button{border:1px solid #347edb;border-radius:5px;background:#347edb;color:#fff;padding:10px 20px;font:12px inherit;cursor:pointer}.import-footer button:disabled{opacity:.4;cursor:default}
</style>
