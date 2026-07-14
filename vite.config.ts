import path from 'node:path';
import process from 'node:process';
import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiPrefix = env.VITE_API_URL || '/dev-api';
  const proxyTarget = env.VITE_API_PROXY_TARGET || 'http://127.0.0.1:6039';
  const proxy = apiPrefix.startsWith('/')
    ? {
        [apiPrefix]: {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: (requestPath: string) => requestPath.replace(new RegExp(`^${apiPrefix}`), ''),
        },
      }
    : undefined;

  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue'],
        resolvers: [ElementPlusResolver()],
        dts: 'types/auto-imports.d.ts',
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: 'types/components.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '',
        },
      },
    },
    server: {
      headers: {
        'Cache-Control': 'no-store',
      },
      proxy,
    },
  };
});
