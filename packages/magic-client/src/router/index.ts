import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: SandboxInfo.route.path,
    },
    ...productRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('./404View.vue'),
    },
  ],
});

export default router;
