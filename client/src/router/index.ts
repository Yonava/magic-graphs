import { createWebHistory, createRouter } from 'vue-router';
import type { ProductInfo } from 'src/types';
import GraphSandboxInfo from '@product/sandbox/info';
import { collabControls } from '@graph/collab';

// import all info.ts files dynamically
const infoModules = import.meta.glob<{
  default: ProductInfo;
}>('/src/**/info.ts', { eager: true });

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: GraphSandboxInfo.route.path,
    },
    {
      path: '/canvas',
      component: () => import('../canvas/docs/StoryCanvas.vue')
    },
    ...Object.values(infoModules).flatMap((mod) => mod.default.route ?? []),
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('./404.vue'),
    },
  ],
});

router.beforeEach((to, from) => {
  // prevents route from changing if only the query params are different
  if (to.path === from.path) return;
  collabControls.disconnectFromRoom();
});

export default router;
