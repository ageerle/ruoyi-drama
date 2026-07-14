import type { GetSessionListVO } from './types';
import { get } from '@/utils/request';

export function getModelList(params?: { category?: string }) {
  const query = params?.category ? `?category=${encodeURIComponent(params.category)}` : '';
  return get<GetSessionListVO[]>(`/system/model/modelList${query}`).json();
}
