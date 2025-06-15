import type { ProductInfo } from 'src/types';

export const info: ProductInfo = {
  route: {
    path: '/sandbox',
    component: () => import('./MainView.vue'),
  },
  name: 'Sandbox',
  description: 'Build a graph and run algorithms on it',
  productId: 'sandbox',
  menu: {
    name: 'Sandbox',
    description: 'Build a graph and run algorithms on it',
    thumbnail: '/products/thumbnails/graph-sandbox.png',
    category: 'sandbox',
  },
};

export default info;
