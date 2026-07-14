/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB_TITLE: string;
  readonly VITE_API_URL: string;
  readonly VITE_API_PROXY_TARGET?: string;
  readonly VITE_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
