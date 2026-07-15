<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAppStore } from '@/stores';

const appStore = useAppStore();
const { locale } = useI18n();

const epLocaleMap = { 'zh-CN': zhCn, 'en-US': en } as const;
const epLocale = computed(() => epLocaleMap[appStore.locale]);

// app store 为唯一真相源，单向同步到 i18n 全局 locale
watch(() => appStore.locale, value => {
  locale.value = value;
}, { immediate: true });
</script>

<template>
  <ElConfigProvider :locale="epLocale">
    <router-view />
  </ElConfigProvider>
</template>
