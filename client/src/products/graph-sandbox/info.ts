import type { ProductInfo } from 'src/types';

export const info: ProductInfo = {
  route: {
    path: '/graph-sandbox',
    component: () => import('./MainView.vue'),
  },
  name: 'Graph Sandbox',
  description: 'Build a graph and run algorithms on it',
  productId: 'graph-sandbox',
  menu: {
    name: 'Graph Sandbox',
    description: 'Build a graph and run algorithms on it',
    thumbnail: '/products/thumbnails/graph-sandbox.png',
    category: 'sandbox',
  },
};

export default info;
