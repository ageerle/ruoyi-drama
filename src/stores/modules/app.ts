import type { AppLocale } from '@/locales/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore(
  'short-drama-app',
  () => {
    const locale = ref<AppLocale>('zh-CN');

    function setLocale(value: AppLocale) {
      locale.value = value;
    }

    return { locale, setLocale };
  },
  { persist: true },
);
