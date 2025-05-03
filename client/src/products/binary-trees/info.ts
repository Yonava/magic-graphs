import type { ProductInfo } from 'src/types';
import state from './state';
import { GoWithGraphGuard } from '@ui/product/dropdown/goWithGraphGuard';
import type { Graph } from '@graph/types';

const allowGoWithGraph = (graph: Graph) => {
  const guard = new GoWithGraphGuard(graph);
  return guard.nodeLabelsAreNumbers();
};

const info: ProductInfo = {
  route: {
    path: '/binary-trees',
    component: () => import('./Main.vue'),
  },
  name: 'Binary Trees',
  description: 'Visualize Binary Trees',
  productId: 'binary-trees',
  menu: {
    name: 'Binary Trees',
    description: 'Binary trees are a commonly to store and search for data',
    thumbnail: '/products/thumbnails/binary-tree.png',
    category: 'data structures',
    allowGoWithGraph,
  },
  state,
};

export default info;
