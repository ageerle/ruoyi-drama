import type { LoginUser } from '@/api/auth/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore(
  'short-drama-user',
  () => {
    const token = ref<string>();
    const userInfo = ref<LoginUser>();

    function setToken(value: string) {
      token.value = value;
    }

    function setUserInfo(value: LoginUser) {
      userInfo.value = value;
    }

    function logout() {
      token.value = undefined;
      userInfo.value = undefined;
    }

    return { token, userInfo, setToken, setUserInfo, logout };
  },
  { persist: true },
);
