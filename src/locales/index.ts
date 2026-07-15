import { createI18n } from 'vue-i18n';
import enUS from './en-US';
import zhCN from './zh-CN';
import type { AppLocale, MessageSchema } from './types';

const isDev = import.meta.env.DEV;

export const i18n = createI18n<[MessageSchema], AppLocale>({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
  missingWarn: isDev,
  fallbackWarn: isDev,
});

export default i18n;

/** 供非组件模块（request.ts、router 守卫）直接使用全局 t */
export const t = i18n.global.t;
