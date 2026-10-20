import { readShortDramaResource } from './resources';
import { put } from '@/utils/request';
import type { DirectorDocument } from '@/utils/dramaDirector';
export interface SavedDirector { revision: number; document: DirectorDocument | null }
export const readDirector = (project: string, id: string) => readShortDramaResource<SavedDirector>(`/short-drama/${project}/director/${id}`);
export async function saveDirector(project: string, id: string, revision: number, document: DirectorDocument) {
  const response = await put<{ code: number; msg?: string; data: SavedDirector }>(`/short-drama/${project}/director/${id}`, { revision, document }).json();
  if (response.code !== 200) throw new Error(response.msg || '导演工程保存失败'); return response.data;
}
