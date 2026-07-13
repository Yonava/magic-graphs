import { defineAsyncComponent } from 'vue';

export const initPathFindingProduct = () => {
  return {
    meta: {
      title: 'Path Finding',
      description: 'Path finding description',
    },
    component: defineAsyncComponent(() => import('./MainView.vue')),
  };
};
