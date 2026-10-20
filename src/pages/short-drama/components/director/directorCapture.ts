import { captureDirector, type PoseRecording, type PoseSample } from '../../../../utils/dramaDirectorCapture';
import {correctCaptureArms} from './directorCaptureCorrection';

/** All inference runs locally. The only requests are same-origin model/WASM assets. */
export async function captureVideo(source:string,start:number,end:number,progress:(value:number)=>void,signal:AbortSignal) {
  const video=document.createElement('video');video.muted=true;video.preload='auto';video.src=source;
  const event=(name:string)=>new Promise<void>((resolve,reject)=>{
    const timer=setTimeout(()=>finish(new Error('视频读取超时，请确认视频编码可播放')),15000);
    const success=()=>finish(),failure=()=>finish(new Error('浏览器不能解码此视频，请转换为 H.264 MP4')),cancel=()=>finish(new Error('动作解析已取消'));
    function finish(error?:Error){clearTimeout(timer);video.removeEventListener(name,success);video.removeEventListener('error',failure);signal.removeEventListener('abort',cancel);error?reject(error):resolve();}
    video.addEventListener(name,success,{once:true});video.addEventListener('error',failure,{once:true});signal.addEventListener('abort',cancel,{once:true});
    if(signal.aborted)cancel();
  });
  let detector:import('@mediapipe/tasks-vision').PoseLandmarker|undefined;
  try{
    if(video.readyState<1)await event('loadedmetadata');
    const finish=Math.min(end,video.duration),duration=finish-start;
    if(!Number.isFinite(duration)||duration<2||duration>60||start<0)throw new Error('请选择视频内 2–60 秒的连续区间');
    const {FilesetResolver,PoseLandmarker}=await import('@mediapipe/tasks-vision');
    const root=`${import.meta.env.BASE_URL}director-motion/`;
    detector=await PoseLandmarker.createFromOptions(await FilesetResolver.forVisionTasks(`${root}wasm`),{baseOptions:{modelAssetPath:`${root}pose_landmarker_full.task`,delegate:'CPU'},runningMode:'IMAGE',numPoses:1,minPoseDetectionConfidence:.5,minPosePresenceConfidence:.5});
    const samples:PoseSample[]=[],count=Math.ceil(duration*12);
    for(let index=0;index<count;index++){
      if(signal.aborted)throw new Error('动作解析已取消');
      const time=start+index/12;
      if(Math.abs(video.currentTime-time)>.001){const seek=event('seeked');video.currentTime=time;await seek;}
      if(video.readyState<2)await event('loadeddata');
      const result=detector.detect(video);
      const points=(list:{x:number;y:number;z:number;visibility?:number}[]|undefined)=>list?.map(p=>[p.x,p.y,p.z,p.visibility??0] as [number,number,number,number])||[];
      samples.push({frame:index*2,world:points(result.worldLandmarks[0]),image:points(result.landmarks[0])});
      progress((index+1)/count);
      await new Promise<void>(resolve=>setTimeout(resolve,0));
    }
    const recording:PoseRecording={version:1,duration,samples};
    return {document:correctCaptureArms(captureDirector(recording)),samples:samples.length,detected:samples.filter(s=>s.world.length===33).length};
  }finally{detector?.close();video.removeAttribute('src');video.load();}
}
