import type { ProductInfo } from 'src/types';

const info: ProductInfo = {
  route: {
    path: '/set-visualizer',
    redirect: 'https://set-theory.netlify.app/',
  },
  name: 'Set Visualizer',
  description: 'A visualizer for set theory',
  productId: 'set-visualizer',
  menu: {
    name: 'Set Visualizer',
    description: 'A visualizer for set theory',
    thumbnail: '/products/thumbnails/set-visualizer.png',
    category: 'math',
  },
};

export default info;
