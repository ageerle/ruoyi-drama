<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores';

const router = useRouter();
const userStore = useUserStore();

const displayName = computed(() => userStore.userInfo?.nickName || userStore.userInfo?.username || '创作者');
const initials = computed(() => displayName.value.slice(0, 1).toUpperCase());

async function handleLogout() {
  try {
    await ElMessageBox.confirm('退出后需要重新登录才能继续创作。', '确认退出？', {
      confirmButtonText: '退出登录',
      cancelButtonText: '取消',
      type: 'warning',
    });
    userStore.logout();
    ElMessage.success('已退出登录');
    await router.replace({ name: 'login' });
  }
  catch {
    // 用户取消退出。
  }
}
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <router-link class="brand" :to="{ name: 'home' }">
        <span class="brand-mark">
          <i class="frame-corner top-left" />
          <i class="frame-corner bottom-right" />
          <el-icon><VideoCameraFilled /></el-icon>
        </span>
        <div>
          <strong>RUOYI <em>DRAMA</em></strong>
          <small>AI STORY STUDIO</small>
        </div>
      </router-link>

      <nav class="main-nav" aria-label="主导航">
        <router-link :to="{ name: 'home' }"><el-icon><House /></el-icon><span>创作中心</span></router-link>
        <router-link :to="{ name: 'shortDrama' }"><el-icon><Film /></el-icon><span>项目工作台</span></router-link>
      </nav>

      <div class="header-actions">
        <el-button class="new-project" type="primary" @click="router.push({ name: 'shortDrama', query: { fresh: '1' } })">
          <el-icon><Plus /></el-icon> 新建短剧
        </el-button>
        <el-dropdown trigger="click" placement="bottom-end">
          <button class="account-button" type="button">
            <span class="avatar">{{ initials }}</span>
            <span class="account-copy"><strong>{{ displayName }}</strong><small>创作者</small></span>
            <el-icon><ArrowDown /></el-icon>
          </button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item disabled><el-icon><User /></el-icon>{{ displayName }}</el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout"><el-icon><SwitchButton /></el-icon>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </header>
    <main class="app-main">
      <router-view :key="$route.fullPath" />
    </main>
  </div>
</template>

<style scoped lang="scss">
.app-shell {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: var(--drama-canvas);
}

.app-header {
  position: relative;
  z-index: 50;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: var(--header-container-default-heigth);
  padding: 0 28px;
  color: var(--drama-text);
  background: rgb(255 255 255 / 90%);
  border-bottom: 1px solid rgb(219 231 245 / 88%);
  box-shadow: 0 8px 28px rgb(37 99 235 / 6%);
  backdrop-filter: blur(18px) saturate(1.2);
}

.brand {
  display: flex;
  gap: 11px;
  align-items: center;
  width: fit-content;
  color: inherit;
  text-decoration: none;
}

.brand-mark {
  position: relative;
  display: grid;
  width: 38px;
  height: 38px;
  color: #fff;
  background: linear-gradient(145deg, #2563eb, #38bdf8);
  border-radius: 11px;
  box-shadow: 0 9px 22px rgb(37 99 235 / 25%);
  place-items: center;
}

.frame-corner { position: absolute; width: 7px; height: 7px; opacity: .75; }
.frame-corner.top-left { top: 5px; left: 5px; border-top: 1px solid #fff; border-left: 1px solid #fff; }
.frame-corner.bottom-right { right: 5px; bottom: 5px; border-right: 1px solid #fff; border-bottom: 1px solid #fff; }

.brand > div { display: grid; gap: 2px; }
.brand strong { font-size: 14px; letter-spacing: .04em; }
.brand strong em { font-style: normal; color: var(--drama-primary); }
.brand small { font: 700 8px/1.2 monospace; letter-spacing: .16em; color: #7890b2; }

.main-nav {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 4px;
  background: #eff6ff;
  border: 1px solid #dbeafe;
  border-radius: 12px;
}

.main-nav a {
  display: flex;
  gap: 7px;
  align-items: center;
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 620;
  color: #64748b;
  text-decoration: none;
  border-radius: 9px;
  transition: .2s ease;
}

.main-nav a:hover { color: var(--drama-primary); }
.main-nav a.router-link-active { color: var(--drama-primary); background: #fff; box-shadow: 0 5px 16px rgb(37 99 235 / 12%); }

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;
}

.new-project { height: 36px; padding: 0 14px; font-size: 12px; background: linear-gradient(110deg, #2563eb, #38bdf8); border: 0; border-radius: 10px; box-shadow: 0 8px 20px rgb(37 99 235 / 24%); }
.account-button { display: flex; gap: 8px; align-items: center; padding: 3px 6px 3px 3px; color: #354052; cursor: pointer; background: transparent; border: 0; border-radius: 10px; }
.account-button:hover { background: #f2f4f7; }
.avatar { display: grid; width: 32px; height: 32px; font-size: 12px; font-weight: 700; color: #fff; background: linear-gradient(145deg, #3b82f6, #0ea5e9); border-radius: 9px; box-shadow: 0 5px 14px rgb(37 99 235 / 20%); place-items: center; }
.account-copy { display: grid; min-width: 52px; gap: 2px; text-align: left; }
.account-copy strong { max-width: 92px; overflow: hidden; font-size: 11px; text-overflow: ellipsis; white-space: nowrap; }
.account-copy small { font-size: 9px; color: #959da9; }
.account-button > .el-icon { font-size: 11px; color: #9ba3ae; }

.app-main {
  height: calc(100vh - var(--header-container-default-heigth));
  overflow: hidden;
}

@media (width <= 840px) {
  .app-header { grid-template-columns: auto 1fr auto; padding: 0 14px; }
  .main-nav { justify-self: center; }
  .main-nav a { padding: 8px 10px; }
  .brand > div, .account-copy, .new-project { display: none; }
}

@media (width <= 520px) {
  .main-nav a span { display: none; }
  .main-nav a { padding: 8px 11px; }
}
</style>
