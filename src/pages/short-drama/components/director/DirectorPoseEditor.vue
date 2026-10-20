<script setup lang="ts">
import { computed } from 'vue';
import { directorJoints, type DirectorJoint, type DirectorPose, type Vec3 } from '@/utils/dramaDirector';
import DirectorVectorFields from './DirectorVectorFields.vue';
const props = defineProps<{ pose: DirectorPose; joint: DirectorJoint; locked: boolean; canPaste: boolean }>();
const emit = defineEmits<{ joint: [joint: DirectorJoint]; patch: [pose: DirectorPose]; copy: []; paste: []; mirror: [] }>();
const rotation = computed(() => props.pose[props.joint] || [0,0,0] as Vec3);
const templates: Record<string,DirectorPose> = { '右手抬起':{rightArm:[-85,0,-25],rightElbow:[-45,0,0]}, '双手前伸':{leftArm:[-75,0,0],rightArm:[-75,0,0],leftElbow:[-15,0,0],rightElbow:[-15,0,0]}, '回头看':{head:[0,60,0],torso:[0,12,0]}, '身体前倾':{torso:[25,0,0],head:[-12,0,0]} };
function axis(index: number,event: Event) { const value:Vec3=[...rotation.value];value[index]=Number((event.target as HTMLInputElement).value);emit('patch',{...props.pose,[props.joint]:value}); }
</script>
<template>
  <section class="pose-editor" aria-label="人物关节姿态编辑">
    <div class="pose-title"><strong>选择身体部位</strong><span>{{Object.keys(directorJoints).length}} 个关节</span></div>
    <div class="joint-picker"><button v-for="(label,j) in directorJoints" :key="j" :class="{active:j===joint,edited:pose[j]?.some(n=>n!==0)}" @click="emit('joint',j)">{{label}}<i v-if="pose[j]?.some(n=>n!==0)"/></button></div>
    <div class="rotation-heading"><strong>{{directorJoints[joint]}} · 旋转偏移</strong><button :disabled="locked" @click="emit('patch',{...pose,[joint]:[0,0,0]})">复位此关节</button></div>
    <DirectorVectorFields :value="rotation" :label="`${directorJoints[joint]}角度`" :min="-180" :max="180" :disabled="locked" @change="emit('patch',{...pose,[joint]:$event})"/>
    <label v-for="(axisName,i) in ['X · 前后弯曲','Y · 左右转动','Z · 侧向抬起']" :key="i" class="axis-slider"><span>{{axisName}}<b>{{Math.round(rotation[i]!)}}°</b></span><input type="range" min="-180" max="180" step="1" :value="rotation[i]" :aria-label="`${directorJoints[joint]} ${axisName}`" :disabled="locked" @change="axis(i,$event)"></label>
    <label class="height-field">身体高度偏移（米）<input type="number" min="-0.9" max="1" step="0.05" :value="Number((pose.height || 0).toFixed(3))" aria-label="身体高度偏移" :disabled="locked" @change="emit('patch',{...pose,height:Number(($event.target as HTMLInputElement).value)})"></label>
    <p class="tip">切换到上方「姿态」工具，可直接点身体部位、拖旋转环。这里的角度叠加在动作之上，修改会记录当前帧；在下一时刻设不同角度，就能连续抬手或转头。</p>
    <div class="pose-title"><strong>姿态模板</strong><span>点击应用并继续调整</span></div>
    <div class="pose-templates"><button v-for="(poseValue,label) in templates" :key="label" :disabled="locked" @click="emit('patch',poseValue)">{{label}}</button></div>
    <div class="pose-actions"><button :disabled="locked" @click="emit('mirror')">左右镜像</button><button @click="emit('copy')">复制姿态</button><button :disabled="locked || !canPaste" @click="emit('paste')">粘贴姿态</button></div>
    <button class="reset-pose" :disabled="locked" @click="emit('patch',{})">清除当前帧全部姿态微调</button>
  </section>
</template>
<style scoped>
.pose-title{display:flex;justify-content:space-between;align-items:center;margin-bottom:13px;font-size:11px;color:#526e90}.pose-title span{font-size:9px;color:#95a7be}.joint-picker{display:grid;grid-template-columns:1fr 1fr;gap:5px}.joint-picker button{display:flex;align-items:center;justify-content:space-between;padding:8px 11px;background:#f8fafc;border:1px solid #dfe7f1;border-radius:4px;font:10px inherit;color:#6a819f;cursor:pointer}.joint-picker .active{background:#edf5ff;border-color:#96bae7;color:#2e77d5}.joint-picker i{background:#4384d8;width:4px;height:4px;border-radius:50%}.rotation-heading{display:flex;justify-content:space-between;align-items:center;margin:22px 0 12px;font-size:11px;color:#476687}.rotation-heading button{border:0;background:none;color:#8a9cb4;font:9px inherit;cursor:pointer}.axis-slider{display:grid;gap:5px;margin-top:14px;font-size:10px;color:#8093ad}.axis-slider span{display:flex;justify-content:space-between}.axis-slider b{font-weight:500;color:#5f7fa6}.axis-slider input{accent-color:#3d80d7;width:100%;margin:3px 0}.height-field{display:grid;gap:8px;margin-top:18px;font-size:10px;color:#69809d}.height-field input{box-sizing:border-box;width:100%;border:1px solid #dbe5f0;border-radius:4px;background:#f8fafc;padding:8px;font:11px inherit;color:#496687}.tip{font-size:10px;line-height:1.9;color:#92a2b7;margin:15px 0 22px}.pose-templates{display:grid;grid-template-columns:1fr 1fr;gap:7px}.pose-templates button,.pose-actions button,.reset-pose{border:1px solid #dce6f1;border-radius:4px;padding:9px 5px;background:#f8fbff;font:10px inherit;color:#5b7c9f;cursor:pointer}.pose-actions{display:flex;gap:6px;margin-top:14px}.pose-actions button{flex:1}.reset-pose{width:100%;margin-top:10px;background:white;color:#8b9bb1}.pose-editor button:disabled,.pose-editor input:disabled{opacity:.4;cursor:default}
</style>
