import type { ProductInfo } from '../types.ts';
import { canRunDijkstras } from './sim/guard.ts';
import { useSimulationRunner } from './sim/runner.ts';
import state from './state.ts';

const info: ProductInfo = {
  route: {
    path: '/dijkstras',
    component: () => import('./MainView.vue'),
  },
  name: 'Dijkstras',
  description: 'Visualize Dijkstras Algorithm',
  productId: 'dijkstras',
  menu: {
    name: 'Dijkstras Algorithm',
    description: 'Visualize Dijkstras Algorithm',
    thumbnail: '/products/thumbnails/dijkstras.png',
    category: 'algorithms',
  },
  simulations: (graph) => [
    {
      name: 'Dijkstras Algorithm',
      description:
        'Finds the shortest path from a source node to all other nodes in a graph',
      thumbnail: '/products/thumbnails/dijkstras.png',
      canRun: canRunDijkstras(graph),
      runner: useSimulationRunner(graph),
    },
  ],
  state,
};

export default info;
