import SandboxInfo from '@magic/products/sandbox/info.js';
import { productRoutes } from '@magic/products/utils.js';

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

router.beforeEach((to, from) => {
  // prevents route from changing if only the query params are different
  if (to.path === from.path) return;
});

export default router;
