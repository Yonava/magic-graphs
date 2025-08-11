import type { ProductInfo } from 'src/types';

const route: ProductInfo = {
  route: {
    path: '/shape-playground',
    component: () => import('./ShapePlayground.vue'),
  },
  name: 'Shape Playground',
  description: 'A playground for shape algorithms',
  productId: 'shape-playground',
  menu: {
    name: 'Shape Playground',
    description: 'A playground for magic shapes',
    thumbnail: '/products/thumbnails/shape-playground.png',
    category: 'developer tools',
    allowGoWithGraph: false,
  },
};

export default route;
