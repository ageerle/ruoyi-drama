<script setup lang="ts">
import { onUnmounted, shallowRef } from 'vue';
import type { DirectorDocument } from '@/utils/dramaDirector';
import { captureVideo } from './directorCapture';
const emit=defineEmits<{ close:[]; import:[document:DirectorDocument] }>();
const source=shallowRef(''),name=shallowRef(''),address=shallowRef(''),start=shallowRef(0),end=shallowRef(60),progress=shallowRef(0),busy=shallowRef(false),error=shallowRef('');
const result=shallowRef<Awaited<ReturnType<typeof captureVideo>>>();
let controller:AbortController|undefined,blobUrl='';
function release(){if(blobUrl)URL.revokeObjectURL(blobUrl);blobUrl='';}
function select(event:Event){const file=(event.target as HTMLInputElement).files?.[0];if(!file)return;error.value='';result.value=undefined;if(file.size>200*1024*1024){error.value='视频不能超过 200MB';return;}release();source.value=blobUrl=URL.createObjectURL(file);name.value=file.name;}
function existing(){try{const url=new URL(address.value,location.origin);if(url.origin!==location.origin)throw new Error('请使用当前站点内的视频素材');release();source.value=url.href;name.value='已有参考视频';result.value=undefined;error.value='';}catch(e){error.value=e instanceof Error?e.message:'视频地址无效';}}
async function run(){if(!source.value||busy.value)return;busy.value=true;error.value='';result.value=undefined;progress.value=0;controller=new AbortController();try{result.value=await captureVideo(source.value,start.value,end.value,v=>progress.value=v,controller.signal);}catch(e){error.value=e instanceof Error?e.message:'动作解析失败';}finally{busy.value=false;}}
function close(){controller?.abort();emit('close');}
onUnmounted(()=>{controller?.abort();release();});
</script>
<template>
  <div class="capture-overlay"><section role="dialog" aria-modal="true" aria-label="从参考视频提取动作" class="capture-dialog">
    <header><div><small>LOCAL MOTION CAPTURE / 预览</small><h2>从参考视频提取动作</h2></div><button aria-label="关闭动作提取" @click="close">×</button></header>
    <p>选择单人视频，在本机提取关节动作，生成可编辑的白模关键帧。视频不会上传，遮挡、转身和近景中的隐藏肢体仍需手动修正。</p>
    <label class="file">选择本地参考视频<input type="file" accept="video/*" aria-label="动作参考视频" :disabled="busy" @change="select"></label>
    <details><summary>引用当前站点的已有视频素材</summary><div class="source-row"><input v-model="address" aria-label="已有参考视频地址" placeholder="粘贴当前站点的视频地址" :disabled="busy"><button :disabled="busy" @click="existing">使用此视频</button></div></details>
    <video v-if="source" :src="source" controls preload="metadata"/>
    <div class="range"><label>开始（秒）<input v-model.number="start" aria-label="动作提取开始秒数" type="number" min="0" step=".1" :disabled="busy"></label><label>结束（秒）<input v-model.number="end" aria-label="动作提取结束秒数" type="number" min="2" step=".1" :disabled="busy"></label></div>
    <p class="hint">{{name || '建议固定机位、人物全身入镜'}} · 最多 60 秒，12 次采样/秒，输出 24 fps。应用时会备份当前未保存的工程。</p>
    <div v-if="busy" class="progress"><progress :value="progress" max="1"/>{{Math.round(progress*100)}}%<button @click="controller?.abort()">取消解析</button></div>
    <p v-if="error" role="alert" class="error">{{error}}</p>
    <p v-if="result" class="success">已识别 {{result.detected}} / {{result.samples}} 次采样；{{result.document.duration}} 秒，{{result.document.objects[0]?.keys.length}} 个可编辑关键帧。应用后请检查脚底、转体与遮挡部位。</p>
    <footer><button :disabled="busy || !source" @click="run">{{busy ? '正在本地解析…' : '解析参考动作'}}</button><button class="primary" :disabled="!result || busy" @click="result && emit('import',result.document)">应用为导演工程</button></footer>
  </section></div>
</template>
<style scoped>
.capture-overlay{position:fixed;inset:0;z-index:2900;background:#203b6459;display:grid;place-items:center}.capture-dialog{width:min(650px,90vw);max-height:90vh;overflow:auto;border-radius:12px;padding:26px;background:white;color:#486381;box-shadow:0 24px 80px #18355440}.capture-dialog header{display:flex;justify-content:space-between;align-items:center}.capture-dialog h2{font-size:20px;font-weight:550;margin:8px 0}.capture-dialog small{font-size:10px;color:#6d91ba}.capture-dialog p{font-size:12px;line-height:1.8}.capture-dialog button{border:1px solid #d5e1ef;border-radius:6px;background:#f5f9ff;padding:9px 14px;color:#5277a0;cursor:pointer;font:12px inherit}.capture-dialog header button{border:0;background:none;font-size:24px}.capture-dialog button:disabled{opacity:.4;cursor:default}.file{display:grid;gap:10px;padding:16px;border:1px dashed #b8cde5;border-radius:8px;font-size:12px;margin:18px 0}.capture-dialog input{font:12px inherit;color:#466587;border:1px solid #dbe5f0;border-radius:5px;padding:9px;min-width:0}.capture-dialog details{font-size:11px;margin:14px 0}.source-row{display:flex;gap:8px;margin:12px 0}.source-row input{flex:1}.capture-dialog video{width:100%;max-height:240px;background:#172234;border-radius:6px}.range{display:flex;gap:20px;margin:16px 0}.range label{display:grid;gap:8px;flex:1;font-size:12px}.hint{color:#8b9fb6}.progress{display:flex;align-items:center;gap:12px;font-size:12px}.progress progress{flex:1;accent-color:#4487df}.error{color:#b74e43}.success{background:#edf7ff;color:#3575b7;border-radius:6px;padding:12px}.capture-dialog footer{display:flex;justify-content:flex-end;gap:10px;margin-top:22px}.capture-dialog .primary{background:#397fdb;color:white;border-color:#397fdb}
</style>
