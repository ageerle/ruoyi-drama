import type {
  ShortDramaCharacter,
  ShortDramaCharacterAppearance,
  ShortDramaComposeVideoRequest,
  ShortDramaComposeVideoResult,
  ShortDramaDetail,
  ShortDramaIdea,
  ShortDramaLocation,
  SnowflakeId,
  ShortDramaProject,
  ShortDramaScript,
  ShortDramaStoryboard,
} from './types';
import { del, get, post, put } from '@/utils/request';
import { useUserStore } from '@/stores';

type ApiPayload<T> = T | { data?: T; rows?: T };

const IMAGE_GENERATION_TIMEOUT = 5 * 60 * 1000;

async function unwrap<T>(request: Promise<ApiPayload<T>>): Promise<T> {
  const response = await request;
  if (response && typeof response === 'object') {
    const payload = response as { data?: T; rows?: T };
    if (payload.data !== undefined)
      return payload.data;
    if (payload.rows !== undefined)
      return payload.rows;
  }
  return response as T;
}

export function listShortDramaProjects() {
  return unwrap(get<ShortDramaProject[]>('/short-drama/projects').json());
}

export function getShortDramaDetail(projectId: SnowflakeId) {
  return unwrap(get<ShortDramaDetail>(`/short-drama/${projectId}`).json());
}

export function createShortDramaFromIdea(data: ShortDramaIdea) {
  return unwrap(post<ShortDramaDetail>('/short-drama/create-from-idea', data).json());
}

export function saveShortDramaProject(data: ShortDramaProject) {
  return unwrap(post<SnowflakeId>('/short-drama/project', data).json());
}

export function updateShortDramaProject(data: ShortDramaProject) {
  return unwrap(put<SnowflakeId>('/short-drama/project', data).json());
}

export function deleteShortDramaProject(projectId: SnowflakeId) {
  return unwrap(del<void>(`/short-drama/project/${projectId}`).json());
}

export function saveShortDramaScript(data: ShortDramaScript) {
  return unwrap(post<ShortDramaScript>('/short-drama/script', data).json());
}

/** Phase 1: 剧本打磨 */
export function polishScript(projectId: SnowflakeId) {
  return unwrap(post<ShortDramaDetail>(`/short-drama/${projectId}/polish-script`).json());
}

/** Phase 2: 资产分析 */
export function analyzeAssets(projectId: SnowflakeId, scriptId: SnowflakeId) {
  return unwrap(post<ShortDramaDetail>(
    `/short-drama/${projectId}/analyze-assets?scriptId=${scriptId}`,
  ).json());
}

/** Phase 3-6: 分镜全流程 */
export function planStoryboard(projectId: SnowflakeId, scriptId: SnowflakeId, model?: string) {
  return unwrap(post<ShortDramaStoryboard[]>(
    `/short-drama/${projectId}/plan-storyboard?scriptId=${scriptId}${model ? `&model=${encodeURIComponent(model)}` : ''}`,
  ).json());
}

/** Phase 4: 重生成摄影规则 */
export function generatePhotographyRules(projectId: SnowflakeId, scriptId: SnowflakeId) {
  return unwrap(post<ShortDramaStoryboard[]>(
    `/short-drama/${projectId}/photography-rules?scriptId=${scriptId}`,
  ).json());
}

/** Phase 5: 重生成表演指导 */
export function generateActingDirections(projectId: SnowflakeId, scriptId: SnowflakeId) {
  return unwrap(post<ShortDramaStoryboard[]>(
    `/short-drama/${projectId}/acting-directions?scriptId=${scriptId}`,
  ).json());
}

export function generateStoryboards(projectId: SnowflakeId, scriptId: SnowflakeId) {
  return unwrap(post<ShortDramaStoryboard[]>(
    `/short-drama/storyboards/generate?projectId=${projectId}&scriptId=${scriptId}`,
  ).json());
}

export function saveShortDramaStoryboard(data: ShortDramaStoryboard) {
  return unwrap(post<ShortDramaStoryboard>('/short-drama/storyboard', data).json());
}

export function generateStoryboardVideo(storyboardId: SnowflakeId, model: string) {
  return unwrap(post<ShortDramaStoryboard>(
    `/short-drama/storyboard/${storyboardId}/generate-video?model=${encodeURIComponent(model)}`,
  ).json());
}

export function retrieveStoryboardVideo(storyboardId: SnowflakeId, model: string) {
  return unwrap(get<ShortDramaStoryboard>(
    `/short-drama/storyboard/${storyboardId}/video-result?model=${encodeURIComponent(model)}`,
  ).json());
}

export function generateAllVideos(projectId: SnowflakeId, model: string) {
  return unwrap(post<ShortDramaStoryboard[]>(
    `/short-drama/${projectId}/generate-all-videos?model=${encodeURIComponent(model)}`,
  ).json());
}

export function composeShortDramaVideo(projectId: SnowflakeId, data: ShortDramaComposeVideoRequest) {
  return unwrap(post<ShortDramaComposeVideoResult>(
    `/short-drama/${projectId}/compose-video`,
    data,
  ).json());
}

export async function getShortDramaComposeStatus(projectId: SnowflakeId) {
  const result = await unwrap(get<ShortDramaComposeVideoResult | null>(
    `/short-drama/${projectId}/compose-video`,
  ).json());
  return result && typeof result === 'object' && 'status' in result ? result : null;
}

export async function downloadShortDramaVideo(projectId: SnowflakeId) {
  const userStore = useUserStore();
  const apiBase = String(import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
  const response = await fetch(`${apiBase}/short-drama/${projectId}/compose-video/download`, {
    headers: {
      authorization: `Bearer ${userStore.token}`,
      ClientID: import.meta.env.VITE_CLIENT_ID,
    },
  });
  const contentType = response.headers.get('content-type') || '';
  if (!response.ok || contentType.includes('application/json')) {
    let message = '成片下载失败';
    try {
      const payload = await response.json() as { msg?: string };
      if (payload.msg) message = payload.msg;
    } catch { /* keep the fallback message */ }
    throw new Error(message);
  }
  return response.blob();
}

/** 角色 CRUD */
export function saveShortDramaCharacter(data: ShortDramaCharacter) {
  return unwrap(post<ShortDramaCharacter>('/short-drama/character', data).json());
}

export function deleteShortDramaCharacter(characterId: SnowflakeId) {
  return unwrap(del<void>(`/short-drama/character/${characterId}`).json());
}

/** 场景 CRUD */
export function saveShortDramaLocation(data: ShortDramaLocation) {
  return unwrap(post<ShortDramaLocation>('/short-drama/location', data).json());
}

export function deleteShortDramaLocation(locationId: SnowflakeId) {
  return unwrap(del<void>(`/short-drama/location/${locationId}`).json());
}

/** 形象图片管理 */
function referenceImageQuery(referenceImageUrl?: string) {
  return referenceImageUrl?.trim()
    ? `&referenceImageUrl=${encodeURIComponent(referenceImageUrl.trim())}`
    : '';
}

export function regenerateAppearanceImage(appearanceId: SnowflakeId, model: string, referenceImageUrl?: string) {
  return unwrap(post<ShortDramaCharacterAppearance>(
    `/short-drama/character-appearance/${appearanceId}/regenerate?model=${encodeURIComponent(model)}${referenceImageQuery(referenceImageUrl)}`,
    {},
    { timeout: IMAGE_GENERATION_TIMEOUT },
  ).json());
}

export function selectAppearanceImage(appearanceId: SnowflakeId, index: number) {
  return unwrap(post<ShortDramaCharacterAppearance>(
    `/short-drama/character-appearance/${appearanceId}/select-image?index=${index}`,
  ).json());
}

export function deleteAppearanceImage(appearanceId: SnowflakeId, index: number) {
  return unwrap(del<ShortDramaCharacterAppearance>(
    `/short-drama/character-appearance/${appearanceId}/image?index=${index}`,
  ).json());
}

export function undoAppearanceImage(appearanceId: SnowflakeId) {
  return unwrap(post<ShortDramaCharacterAppearance>(
    `/short-drama/character-appearance/${appearanceId}/undo-image`,
  ).json());
}

/** 场景图片管理 */
export function regenerateLocationImage(locationId: SnowflakeId, model: string, referenceImageUrl?: string) {
  return unwrap(post<ShortDramaLocation>(
    `/short-drama/location/${locationId}/regenerate?model=${encodeURIComponent(model)}${referenceImageQuery(referenceImageUrl)}`,
    {},
    { timeout: IMAGE_GENERATION_TIMEOUT },
  ).json());
}

export function selectLocationImage(locationId: SnowflakeId, index: number) {
  return unwrap(post<ShortDramaLocation>(
    `/short-drama/location/${locationId}/select-image?index=${index}`,
  ).json());
}

export function deleteLocationImage(locationId: SnowflakeId, index: number) {
  return unwrap(del<ShortDramaLocation>(
    `/short-drama/location/${locationId}/image?index=${index}`,
  ).json());
}

export function undoLocationImage(locationId: SnowflakeId) {
  return unwrap(post<ShortDramaLocation>(
    `/short-drama/location/${locationId}/undo-image`,
  ).json());
}

/** 异步图片生成 */
export interface PredictionResponse {
  type: string;
  id: string;
  status: string;
  url?: string;
}

export function startImageGeneration(assetType: string, assetId: SnowflakeId, model: string, referenceImageUrl?: string) {
  return unwrap(post<PredictionResponse>(
    `/short-drama/image/start?assetType=${assetType}&assetId=${assetId}&model=${encodeURIComponent(model)}${referenceImageQuery(referenceImageUrl)}`,
    {},
    { timeout: IMAGE_GENERATION_TIMEOUT },
  ).json());
}

/** 上传本地照片到 Atlas Cloud，返回当前生成会话使用的临时 URL。 */
export async function uploadReferenceImage(file: File, model: string): Promise<string> {
  const userStore = useUserStore();
  const apiBase = String(import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${apiBase}/short-drama/image/upload-reference?model=${encodeURIComponent(model)}`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${userStore.token}`,
      ClientID: import.meta.env.VITE_CLIENT_ID,
    },
    body: formData,
  });
  const payload = await response.json() as { code?: number; msg?: string; data?: string };
  // 兼容旧后端误命中 R.ok(String msg) 重载、把URL放进msg的响应。
  const temporaryUrl = payload.data || (/^https?:\/\//.test(payload.msg || '') ? payload.msg : '');
  if (!response.ok || payload.code !== 200 || !temporaryUrl) {
    throw new Error(payload.msg || '参考图上传失败');
  }
  return temporaryUrl;
}

export function confirmAppearanceImage(appearanceId: SnowflakeId, predictionId: string, model: string) {
  return unwrap(post<ShortDramaCharacterAppearance>(
    `/short-drama/character-appearance/${appearanceId}/confirm-image?predictionId=${predictionId}&model=${encodeURIComponent(model)}`,
  ).json());
}

export function confirmLocationImage(locationId: SnowflakeId, predictionId: string, model: string) {
  return unwrap(post<ShortDramaLocation>(
    `/short-drama/location/${locationId}/confirm-image?predictionId=${predictionId}&model=${encodeURIComponent(model)}`,
  ).json());
}

/** 轮询 prediction 状态（通用） */
export function getPrediction(model: string, predictionId: string) {
  return unwrap(get<PredictionResponse>(
    `/media/prediction?model=${encodeURIComponent(model)}&predictionId=${predictionId}`,
  ).json());
}


