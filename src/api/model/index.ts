import type { GetSessionListVO } from './types';
import { get, put } from '@/utils/request';

export function getModelList(params?: { category?: string }) {
  const query = params?.category ? `?category=${encodeURIComponent(params.category)}` : '';
  return get<GetSessionListVO[]>(`/system/model/modelList${query}`).json();
}

/**
 * 按厂商批量更新密钥
 */
export function batchUpdateKeyByProvider(providerCode: string, apiKey: string) {
  return put<void>('/system/model/batchKeyByProvider', { providerCode, apiKey }).json();
}

