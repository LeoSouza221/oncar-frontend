import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/simulation',
      name: 'simulation',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
});

export default router;
