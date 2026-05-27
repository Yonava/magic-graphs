import type { ProductInfo } from '../types.ts';

const info: ProductInfo = {
  route: {
    path: '/ast',
    component: () => import('./MainView.vue'),
  },
  name: 'Abstract Syntax Trees',
  description:
    'See how TypeScript transforms the code you write into an AST for static analysis',
  productId: 'ast',
  menu: {
    name: 'Abstract Syntax Trees',
    description:
      'See how TypeScript transforms the code you write into an AST for static analysis',
    thumbnail: '/products/thumbnails/binary-tree.png',
    category: 'data structures',
  },
  simulations: () => [],
};

export default info;
