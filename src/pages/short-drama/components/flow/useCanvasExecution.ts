import { ref, shallowRef, watch } from 'vue';
import { getShortDramaDetail, saveShortDramaScript, saveShortDramaCharacter, saveShortDramaAppearance, saveShortDramaLocation, saveShortDramaStoryboard, addShortDramaStoryboard, startImageGeneration, getPrediction, confirmAppearanceImage, confirmLocationImage, selectAppearanceImage, selectLocationImage, polishScript, analyzeAssets, planStoryboard } from '@/api/shortDrama';
import { post, put } from '@/utils/request';
import { readShortDramaResource } from '@/api/shortDrama/resources';
import { canvasInputs, orderedCanvasVideos, type CanvasDocument, type CanvasData } from '@/utils/dramaCanvas';
import { getVoice, saveVoice } from '@/api/shortDrama/voices';
import { flowContinuity, bindFlowReference, type FlowMedia } from '@/utils/dramaFlowGraph';
import type { ShortDramaDetail, ShortDramaStoryboard, ShortDramaCharacter } from '@/api/shortDrama/types';
import type { FlowActions } from './types';

type NodePatch = (id: string, patch: Partial<CanvasData>) => void;
async function businessRequest(request: Promise<any>) { const value = await request; if (value?.code !== 200) throw new Error(value?.msg || '操作未完成'); return value.data; }
export function useCanvasExecution(options: { project: string; initial: () => ShortDramaDetail; document: () => CanvasDocument; patch: NodePatch; persist: () => Promise<boolean>; actions: FlowActions; refresh: () => Promise<void> }) {
  const detail = ref(options.initial()), busy = shallowRef(false), error = shallowRef('');
  watch(options.initial, value => { detail.value = value; });
  const node = (id: string) => options.document().nodes.find(n => n.id === id)!;
  async function refresh() { detail.value = await getShortDramaDetail(options.project); await options.refresh(); }
  async function syncNode(id: string): Promise<void> {
    const n = node(id); if (!n) throw new Error('节点已移除');
    if (['text','group','previs'].includes(n.kind)) return;
    if (!n.data.title.trim()) throw new Error('请填写节点名称');
    const sources = canvasInputs(options.document(), id);
    for (const source of sources.filter(s => ['script','image'].includes(s.kind))) await syncNode(source.id);
    const text = sources.filter(s => ['text','script'].includes(s.kind)).map(s => s.data.content).filter(Boolean).join('\n\n');
    if (n.kind === 'script') {
      const previous = detail.value.script?.id === n.data.business?.id ? detail.value.script : undefined;
      const saved = await saveShortDramaScript({ ...previous, id:n.data.business?.id, projectId:options.project, scriptName:n.data.title, scriptText:n.data.content || text, sourceType:'manual' });
      options.patch(id, { business:{ id:saved.id!,type:'script' } }); detail.value.script = saved;
    }
    if (n.kind === 'image') {
      if (n.data.purpose === 'frame') return;
      const prompt = n.data.prompt || text;
      if (!prompt.trim()) throw new Error('请填写图片描述');
      if (n.data.purpose === 'character') {
        const previous = detail.value.characters.find(c => c.id === n.data.business?.id);
        const actor: ShortDramaCharacter = await saveShortDramaCharacter({ ...previous, id:n.data.business?.id, projectId:options.project, name:n.data.title, visualDescription:prompt });
        options.patch(id, { business:{ id:actor.id!,type:'character',appearanceId:n.data.business?.appearanceId } });
        if (!await options.persist()) throw new Error('角色编号未保存，请先重试保存画布');
        const before = actor.appearances?.find(a => a.id === n.data.business?.appearanceId);
        const appearance = await saveShortDramaAppearance({ ...before, id:n.data.business?.appearanceId, characterId:actor.id, description:prompt,
          referenceImageUrl:n.data.url || before?.referenceImageUrl, appearanceIndex:before?.appearanceIndex ?? 0, changeReason:before?.changeReason || '画布造型' });
        options.patch(id, { business:{ id:actor.id!, type:'character', appearanceId:appearance.id } });
        detail.value.characters = [...detail.value.characters.filter(c => c.id !== actor.id), { ...actor, appearances:[...(actor.appearances || []).filter(a => a.id !== appearance.id),appearance] }];
      } else if (n.data.purpose === 'location') {
        const previous = detail.value.locations.find(l => l.id === n.data.business?.id);
        const saved = await saveShortDramaLocation({ ...previous, id:n.data.business?.id, projectId:options.project, name:n.data.title, summary:prompt, descriptions:JSON.stringify([prompt]), referenceImageUrl:n.data.url || previous?.referenceImageUrl });
        options.patch(id, { business:{ id:saved.id!,type:'location' } });
        detail.value.locations = [...detail.value.locations.filter(l => l.id !== saved.id), saved];
      } else {
        let result;
        if (n.data.business?.id) result = await businessRequest(put(`/short-drama/${options.project}/visual-assets/prop/${n.data.business.id}`, { prompt,referenceImageUrl:n.data.url || '' }).json());
        else result = await businessRequest(post(`/short-drama/${options.project}/visual-assets/prop`, { title:n.data.title,prompt,shotNumbers:[],imageUrl:n.data.url || '' }).json());
        const asset = result.assets?.find((a: any) => n.data.business?.id ? String(a.id) === n.data.business.id : a.kind === 'prop' && a.title === n.data.title);
        if (!asset) throw new Error('道具保存后未返回编号');
        options.patch(id,{ business:{ id:String(asset.id),type:'prop' } });
      }
    }
    if (n.kind === 'audio') {
      const alreadyBound = !!n.data.business;
      const linked = sources.find(s => s.kind === 'image' && s.data.purpose === 'character');
      const actor = linked || node(n.data.actorNodeId || '');
      if (!actor || actor.kind !== 'image' || actor.data.purpose !== 'character') throw new Error('为声音节点选择一个角色图片节点');
      await syncNode(actor.id); options.patch(id,{ actorNodeId:actor.id,business:{ id:actor.data.business!.id,type:'voice' } });
      if (!alreadyBound && (n.data.prompt || n.data.content)) {
        const current = await getVoice(options.project, actor.data.business!.id);
        await saveVoice(options.project, actor.data.business!.id, { description:n.data.prompt || current.profile.description, sampleText:n.data.content || current.profile.sampleText });
      }
    }
    if (n.kind === 'video') {
      await refresh();
      const previous = detail.value.storyboards.find(s => s.id === n.data.business?.id);
      if (previous && options.actions.state(previous).blocked) throw new Error('原视频请求尚未确认，请先查询');
      if (!detail.value.script?.id && !sources.some(s => s.kind === 'script' && s.data.business)) {
        detail.value.script = await saveShortDramaScript({ projectId:options.project,scriptName:'画布剧本',scriptText:'',sourceType:'manual' });
      }
      let shot: ShortDramaStoryboard = previous ? { ...previous } : await addShortDramaStoryboard(options.project, sources.find(s => s.kind === 'script')?.data.business?.id || detail.value.script!.id!);
      // Preserve the ID immediately: a later validation failure must not create another blank panel.
      options.patch(id,{ business:{ id:shot.id!,type:'shot',scriptId:shot.scriptId } });
      if (!await options.persist()) throw new Error('镜头编号未保存，请先重试保存画布');
      let continuity = flowContinuity(shot);
      if (n.data.model) continuity.video_model = n.data.model;
      if (n.data.seconds == null) delete continuity.video_seconds; else continuity.video_seconds = n.data.seconds;
      if (n.data.resolution) continuity.video_resolution = n.data.resolution;
      if (n.data.useStartFrame !== undefined) continuity.video_use_start_frame = n.data.useStartFrame;
      const images = sources.filter(s => s.kind === 'image' && s.data.purpose !== 'frame');
      if (images.filter(s => s.data.purpose === 'location').length > 1) throw new Error('一个镜头只能引用一个拍摄场景');
      // Remove only canvas-controlled reference fields. Keep all other production metadata and media IDs.
      const cast = JSON.parse(shot.charactersJson || '[]');
      if (!Array.isArray(cast)) throw new Error('角色引用格式无效');
      shot.charactersJson = JSON.stringify(cast.filter(c => images.some(s => s.data.purpose === 'character' && detail.value.characters.find(a => a.id === s.data.business?.id)?.name === c.name)));
      shot.locationName = ''; continuity.visible_props = []; shot.continuityJson = JSON.stringify(continuity);
      for (const source of images) {
        const actor = detail.value.characters.find(c => c.id === source.data.business?.id);
        const appearance = actor?.appearances?.find(a => a.id === source.data.business?.appearanceId);
        const media: FlowMedia = { id:source.id,kind:source.data.purpose === 'character' ? 'character' : source.data.purpose === 'location' ? 'location' : 'prop',
          title:actor?.name || detail.value.locations.find(l => l.id === source.data.business?.id)?.name || source.data.title,subtitle:'',appearance:appearance?.appearanceIndex ?? 0 };
        Object.assign(shot, bindFlowReference(shot,media));
      }
      continuity = flowContinuity(shot);
      const speakers = sources.filter(s => s.kind === 'audio');
      for (const source of speakers) await syncNode(source.id);
      if (speakers.length || Array.isArray(continuity.voice_speakers)) continuity.voice_speakers = speakers.map(s => s.data.business!.id);
      shot = { ...shot,sceneTitle:n.data.title,sceneText:n.data.content,videoPrompt:n.data.prompt,sourceText:text || previous?.sourceText,continuityJson:JSON.stringify(continuity) };
      const saved = await saveShortDramaStoryboard(shot);
      const frame = sources.find(s => s.kind === 'image' && s.data.purpose === 'frame');
      if (frame?.data.url) await businessRequest(post(`/short-drama/${options.project}/visual-assets/${saved.id}/start-frame`, {imageUrl:frame.data.url}).json());
      options.patch(id,{ business:{id:saved.id!,type:'shot',scriptId:saved.scriptId} });
    }
  }
  async function perform(action: () => Promise<void>) {
    if (busy.value) return false; busy.value = true; error.value = '';
    try { await action(); await refresh(); return true; }
    catch (failure) { error.value = failure instanceof Error ? failure.message : '操作未完成'; return false; }
    finally { busy.value = false; }
  }
  const sync = (id: string) => perform(() => syncNode(id));
  const generate = (id: string) => perform(async () => {
    const n = node(id); if (!n) return;
    if (n.data.job && ['processing','submission_unknown'].includes(n.data.job.status)) throw new Error('请先查询原任务，不会重复提交');
    await syncNode(id); await refresh();
    if (n.kind === 'video') { if (!await options.actions.generate(n.data.business!.id)) throw new Error('视频提交未完成，请检查原任务状态和生成提示'); return; }
    if (n.kind === 'script') { const saved = await polishScript(options.project,n.data.prompt || '依据已保存剧本和输入资料完善可拍摄的短剧剧本，保留原有剧情与对白'); options.patch(id,{ content:saved.script?.scriptText || n.data.content,business:{id:saved.script!.id!,type:'script'} }); return; }
    if (n.kind !== 'image') throw new Error('请在角色声音面板中生成或上传样音');
    if (!n.data.model) throw new Error('请选择图片模型');
    if (n.data.purpose === 'frame') throw new Error('首帧图片可上传后连入视频；生成首帧请使用原分镜首帧功能');
    if (n.data.purpose === 'prop') { await businessRequest(post(`/short-drama/${options.project}/visual-assets/prop/${n.data.business!.id}/regenerate?model=${encodeURIComponent(n.data.model)}`).json()); options.patch(id,{ job:{id:n.data.business!.id,model:n.data.model,type:'prop',status:'processing'} }); return; }
    const reference = canvasInputs(options.document(),id).find(s => s.kind === 'image')?.data.url || n.data.url;
    options.patch(id,{ job:{id:'',model:n.data.model,type:n.data.purpose === 'character' ? 'appearance' : 'location',status:'submission_unknown'} });
    if (!await options.persist()) throw new Error('提交记录未保存，已停止图片生成');
    const job = await startImageGeneration(n.data.purpose === 'character' ? 'appearance' : 'location',n.data.business!.appearanceId || n.data.business!.id,n.data.model,reference || undefined);
    options.patch(id,{ job:{id:job.id,model:n.data.model,type:n.data.purpose === 'character' ? 'appearance' : 'location',status:job.status === 'completed' ? 'completed' : 'processing',url:job.url} });
  });
  const query = (id: string) => perform(async () => {
    const n = node(id); if (n.kind === 'video' && n.data.business) { await options.actions.query(n.data.business.id); return; }
    if (n.data.job?.type === 'prop') { const value = await readShortDramaResource<any>(`/short-drama/${options.project}/visual-assets`); const asset = value.assets.find((a:any) => String(a.id) === n.data.business?.id); if (asset) options.patch(id,{ url:asset.imageUrl || n.data.url,job:{...n.data.job,status:asset.status === 'done' ? 'completed' : asset.status} }); return; }
    if (!n.data.job?.id) throw new Error('尚无可查询的任务编号；未知提交请核对原供应商记录');
    const result = await getPrediction(n.data.job.model,n.data.job.id);
    if (result.status === 'completed') {
      const saved = n.data.job.type === 'appearance' ? await confirmAppearanceImage(n.data.business!.appearanceId!,n.data.job.id,n.data.job.model) : await confirmLocationImage(n.data.business!.id,n.data.job.id,n.data.job.model);
      const urls: string[] = JSON.parse(saved.imageUrls || '[]');
      options.patch(id,{ job:{...n.data.job,status:'completed',url:result.url || urls[urls.length-1]} });
    } else options.patch(id,{job:{...n.data.job,status:result.status}});
  });
  const accept = (id: string) => perform(async () => {
    const n = node(id); if (!n.data.job?.url) return;
    const actor = detail.value.characters.find(c => c.id === n.data.business?.id);
    const asset = n.data.purpose === 'character' ? actor?.appearances?.find(a => a.id === n.data.business?.appearanceId) : detail.value.locations.find(l => l.id === n.data.business?.id);
    const index = (JSON.parse(asset?.imageUrls || '[]') as string[]).indexOf(n.data.job.url);
    if (index < 0) throw new Error('请先查询任务并保存候选');
    if (n.data.purpose === 'character') await selectAppearanceImage(n.data.business!.appearanceId!,index); else await selectLocationImage(n.data.business!.id,index);
    options.patch(id,{url:n.data.job.url});
  });
  const plan = (id: string) => perform(async () => { await syncNode(id); const n = node(id); await analyzeAssets(options.project,n.data.business!.id); await planStoryboard(options.project,n.data.business!.id); });
  return { detail,busy,error,sync,generate,query,accept,plan,refresh,orderedVideos:() => orderedCanvasVideos(options.document()) };
}
