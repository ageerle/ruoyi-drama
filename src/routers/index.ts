import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/index.vue'),
      meta: { title: '登录' },
    },
    {
      path: '/',
      component: () => import('@/layouts/ShortDramaLayout.vue'),
      children: [
        { path: '', redirect: '/home' },
        {
          path: 'home',
          name: 'home',
          component: () => import('@/pages/home/index.vue'),
          meta: { title: '创作中心' },
        },
        {
          path: 'short-drama',
          name: 'shortDrama',
          component: () => import('@/pages/short-drama/index.vue'),
          meta: { title: '短剧创作' },
        },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/home' },
  ],
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  document.title = `${String(to.meta.title || '')}${to.meta.title ? ' - ' : ''}${import.meta.env.VITE_WEB_TITLE}`;

  if (!userStore.token && to.name !== 'login') {
    return { name: 'login', query: { redirect: to.fullPath } };
  }
  if (userStore.token && to.name === 'login') {
    return { name: 'home' };
  }
  return true;
});

export default router;
