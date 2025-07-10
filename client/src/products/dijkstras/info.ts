import type { ProductInfo } from 'src/types';
import { useSimulationRunner } from './sim/runner';
import state from './state';
import { canRunDijkstras } from './sim/guard';
import templates from './templates';

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
  templates,
};

export default info;
