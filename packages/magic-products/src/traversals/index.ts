import { defineAsyncComponent } from 'vue';

export const initTraversalsProduct = () => {
  return {
    meta: {
      title: 'Traversals!!',
      description: 'this is the traversals product',
    },
    component: defineAsyncComponent(() => import('./MainView.vue')),
  };
};
