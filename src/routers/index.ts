import { createRouter, createWebHistory } from 'vue-router';
import i18n from '@/locales';
import { useUserStore } from '@/stores';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/index.vue'),
      meta: { title: 'route.login' },
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
          meta: { title: 'route.home' },
        },
        {
          path: 'short-drama',
          name: 'shortDrama',
          component: () => import('@/pages/short-drama/index.vue'),
          meta: { title: 'route.shortDrama' },
        },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/home' },
  ],
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  const titleKey = typeof to.meta.title === 'string' ? to.meta.title : '';
  const title = titleKey ? i18n.global.t(titleKey) : '';
  // 页面标题后缀走 locale key；VITE_WEB_TITLE 仅作后台/品牌引用，不再承担 UI 本地化
  const webTitle = i18n.global.t('common.webTitle');
  document.title = title ? `${title} - ${webTitle}` : webTitle;

  if (!userStore.token && to.name !== 'login') {
    return { name: 'login', query: { redirect: to.fullPath } };
  }
  if (userStore.token && to.name === 'login') {
    return { name: 'home' };
  }
  return true;
});

export default router;
