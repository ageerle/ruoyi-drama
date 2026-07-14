import type { LoginRequest, LoginResponse } from './types';
import { post } from '@/utils/request';

export function login(data: LoginRequest) {
  return post<LoginResponse>('/auth/login', data).json();
}
