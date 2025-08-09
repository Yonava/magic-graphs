import type { Graph } from '@graph/types';
import { SimulationGuard } from '@ui/product/sim/guard';

import definitions from '../markov/definitions';
import { useMarkovChain } from '../markov/useMarkovChain';
import { useInvalidStateColorizer } from '../ui/useInvalidStateColorizer';

export const canRunMarkovChain = (graph: Graph) => {
  const markov = useMarkovChain(graph);
  const { colorize, decolorize } = useInvalidStateColorizer(graph, markov);

  return new SimulationGuard(graph)
    .weighted()
    .nonNegativeEdgeWeights()
    .minNodes(1)
    .valid(() => markov.illegalNodeIds.value.size === 0, {
      title: 'Requires valid Markov Chain',
      description: definitions.valid,
      themer: {
        theme: colorize,
        untheme: decolorize,
      },
    });
};
