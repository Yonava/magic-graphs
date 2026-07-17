import { defineAsyncComponent } from 'vue';

export const initTreesProduct = () => {
  return {
    meta: {
      title: 'Basic Trees',
      description: 'this is the basic trees product',
    },
    component: defineAsyncComponent(() => import('./MainView.vue')),
  };
};
