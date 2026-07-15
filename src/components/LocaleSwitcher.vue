<script setup lang="ts">
import type { AppLocale } from '@/locales/types';
import { useAppStore } from '@/stores';

const appStore = useAppStore();

const options: Array<{ value: AppLocale; label: string }> = [
  { value: 'zh-CN', label: '中文' },
  { value: 'en-US', label: 'English' },
];

function onChange(value: AppLocale) {
  appStore.setLocale(value);
}
</script>

<template>
  <el-dropdown trigger="click" placement="bottom-end" @command="onChange">
    <button class="locale-switcher" type="button">
      <el-icon><Compass /></el-icon>
      <span>{{ appStore.locale === 'zh-CN' ? '中文' : 'EN' }}</span>
    </button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="o in options" :key="o.value" :command="o.value">{{ o.label }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
.locale-switcher {
  display: flex;
  gap: 6px;
  align-items: center;
  height: 36px;
  padding: 0 10px;
  font-size: 12px;
  color: #566986;
  cursor: pointer;
  background: rgb(255 255 255 / 82%);
  border: 1px solid #e2e8f1;
  border-radius: 10px;
  transition: .2s ease;
}

.locale-switcher:hover {
  color: var(--drama-primary);
  border-color: #93c5fd;
}
</style>
