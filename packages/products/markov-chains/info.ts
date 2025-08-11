import type { Graph } from '@graph/types';
import type { ProductInfo } from 'src/types';

import { canRunMarkovChain } from './sim/guard';
import { useSimulationRunner } from './sim/runner';
import state from './state';

export const info: ProductInfo = {
  route: {
    path: '/markov-chains',
    component: () => import('./MainView.vue'),
  },
  name: 'Markov Chains',
  description:
    'Markov chains are a type of stochastic process that models a sequence of possible events in which the probability of each event depends only on the state attained in the previous event.',
  productId: 'markov-chains',
  simulations: (graph: Graph) => [
    {
      name: 'Markov Chain Probability',
      description:
        'Simulate the probability of being in each state after a certain number of steps.',
      thumbnail: '/products/thumbnails/markov-chains.png',
      runner: useSimulationRunner(graph),
      canRun: canRunMarkovChain(graph),
    },
  ],
  menu: {
    name: 'Markov Chains',
    description: 'Build and analyze your very own Markov Chains.',
    thumbnail: '/products/thumbnails/markov-chains.png',
    category: 'math',
  },
  state,
};

export default info;
