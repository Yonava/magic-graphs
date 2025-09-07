import type { ProductInfo } from '@magic/products/types'

const route: ProductInfo = {
  route: {
    path: '/canvas-demo',
    // @ts-ignore
    component: () => import('./StoryCanvas.vue'),
  },
  name: 'Canvas Demo',
  description: 'A demo of the magic canvas functionality',
  productId: 'canvas-demo',
  menu: {
    name: 'Canvas Demo',
    description: 'A demo of the magic canvas functionality',
    thumbnail: '/products/thumbnails/shape-playground.png',
    category: 'developer tools',
    allowGoWithGraph: false,
  },
};

export default route;
