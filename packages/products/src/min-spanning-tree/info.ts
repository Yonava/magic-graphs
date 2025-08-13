import type { Graph } from '@magic/graph/types';
import type { ProductInfo } from '../types';

import { canRunMST } from './sim/guard';
import {
  useKruskalSimulationRunner,
  usePrimSimulationRunner,
} from './sim/runner';
import templates from './templates';

const info: ProductInfo = {
  route: {
    path: '/mst',
    component: () => import('./MainView.vue'),
  },
  name: 'Minimum Spanning Trees',
  description: 'Visualize Minimum Spanning Trees',
  productId: 'mst',
  menu: {
    name: 'Minimum Spanning Trees',
    description: 'Visualize Minimum Spanning Trees',
    thumbnail: '/products/thumbnails/mst.png',
    category: 'algorithms',
  },
  simulations: (graph: Graph) => [
    {
      name: "Kruskal's Algorithm",
      description:
        'Sort edges by weight and add them to the MST if they do not create a cycle',
      thumbnail: '/products/thumbnails/mst.png',
      canRun: canRunMST(graph),
      runner: useKruskalSimulationRunner(graph),
    },
    {
      name: "Prim's Algorithm",
      description:
        'Start with a single vertex and grow the MST by adding the smallest edge',
      thumbnail: '/products/thumbnails/mst.png',
      canRun: canRunMST(graph),
      runner: usePrimSimulationRunner(graph),
    },
  ],
  templates,
};

export default info;
