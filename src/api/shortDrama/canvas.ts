import { readShortDramaResource } from './resources';
import { put } from '@/utils/request';
import type { CanvasDocument } from '@/utils/dramaCanvas';
export interface SavedCanvas { revision: number; document: CanvasDocument | null }
export const readCanvas = (project: string) => readShortDramaResource<SavedCanvas>(`/short-drama/${project}/canvas`);
export async function saveCanvas(project: string, revision: number, document: CanvasDocument) {
  const response = await put<{ code: number; msg?: string; data: SavedCanvas }>(`/short-drama/${project}/canvas`, { revision, document }).json();
  if (response.code !== 200) throw new Error(response.msg || '画布保存失败');
  return response.data;
}
