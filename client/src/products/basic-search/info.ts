import type { Graph } from '@graph/types';
import type { ProductInfo } from 'src/types';

import { canRunBasicSearch } from './sim/guard';
import { useBFSSimulationRunner, useDFSSimulationRunner } from './sim/runner';
import state from './state';

const info: ProductInfo = {
  route: {
    path: '/basic-search',
    component: () => import('./MainView.vue'),
  },
  name: 'Basic Search',
  description: 'Visualize basic search algorithms',
  productId: 'basic-search',
  menu: {
    name: 'Basic Search',
    description: 'Visualize basic search algorithms like BFS and DFS',
    thumbnail: '/products/thumbnails/basic-search.png',
    category: 'algorithms',
  },
  simulations: (graph: Graph) => [
    {
      name: 'Breadth First Search',
      description:
        'Explore all neighbors of a node before moving to the next level',
      thumbnail: '/products/sim-thumbnails/bfs.png',
      canRun: canRunBasicSearch(graph),
      runner: useBFSSimulationRunner(graph),
    },
    {
      name: 'Depth First Search',
      description:
        'Explore as far as possible along each branch before backtracking',
      thumbnail: '/products/sim-thumbnails/dfs.png',
      canRun: canRunBasicSearch(graph),
      runner: useDFSSimulationRunner(graph),
    },
  ],
  state,
};

export default info;
