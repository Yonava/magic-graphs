import type { ProductInfo } from 'src/types';
import type { Graph } from '@graph/types';
import state from './state';
import { useSimulationRunner } from './sim/runner';
import { canRunFordFulkerson } from './sim/guard';

const info: ProductInfo = {
  route: {
    path: '/flow',
    component: () => import('./MainView.vue'),
  },
  name: 'Network Flow',
  description: 'Visualize Network Flow',
  productId: 'network-flow',
  menu: {
    name: 'Network Flow',
    description: 'Visualize Network Flow',
    thumbnail: '/products/thumbnails/network-flow.png',
    category: 'algorithms',
  },
  simulations: (graph: Graph) => [
    {
      name: 'Ford Fulkerson',
      description:
        'Iteratively find augmenting paths until the residual graph is revealed',
      thumbnail: '/products/thumbnails/network-flow.png',
      canRun: canRunFordFulkerson(graph),
      runner: useSimulationRunner(graph),
    },
  ],
  state,
};

export default info;
