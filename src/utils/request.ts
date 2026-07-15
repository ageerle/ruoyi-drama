import type { HookFetchPlugin } from 'hook-fetch';
import { ElMessage } from 'element-plus';
import hookFetch from 'hook-fetch';
import { sseTextDecoderPlugin } from 'hook-fetch/plugins';
import i18n from '@/locales';
import router from '@/routers';
import { useUserStore } from '@/stores';

interface BaseResponse {
  code: number;
  data: never;
  msg: string;
  rows: never;
}

export const request = hookFetch.create<BaseResponse, 'data' | 'rows'>({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  plugins: [sseTextDecoderPlugin({ json: true, prefix: 'data:' })],
});

function jwtPlugin(): HookFetchPlugin<BaseResponse> {
  return {
    name: 'jwt',
    beforeRequest: async (config) => {
      const userStore = useUserStore();
      config.headers = new Headers(config.headers);
      if (userStore.token) config.headers.set('authorization', `Bearer ${userStore.token}`);
      if (import.meta.env.VITE_CLIENT_ID) config.headers.set('ClientID', import.meta.env.VITE_CLIENT_ID);
      return config;
    },
    afterResponse: async (response) => {
      const code = response.result?.code;
      if (code === 200 || code === undefined) return response;

      if (code === 401) {
        const userStore = useUserStore();
        const redirect = router.currentRoute.value.fullPath;
        userStore.logout();
        await router.replace({ name: 'login', query: { redirect } });
      }
      const message = response.result?.msg || i18n.global.t('common.requestFailed');
      ElMessage.error(message);
      return Promise.reject(new Error(message));
    },
  };
}

request.use(jwtPlugin());

export const post = request.post;
export const get = request.get;
export const put = request.put;
export const del = request.delete;

export default request;
