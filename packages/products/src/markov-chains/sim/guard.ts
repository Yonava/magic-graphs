import type { Graph } from '../../shared/useGraphWithCanvas.ts';

import { SimulationGuard } from '../../shared/ui/general/sim/guard/index.ts';
import definitions from '../markov/definitions.ts';
import { useMarkovChain } from '../markov/useMarkovChain.ts';
import { useInvalidStateColorizer } from '../ui/useInvalidStateColorizer.ts';

export const canRunMarkovChain = (graph: Graph) => {
  const markov = useMarkovChain(graph);
  const { colorize, decolorize } = useInvalidStateColorizer(graph, markov);

  return new SimulationGuard(graph)
    .weighted()
    .nonNegativeEdgeWeights()
    .minNodes(1)
    .valid(() => markov.isChainValid.value, {
      title: 'Requires valid Markov Chain',
      description: definitions.valid,
      themer: {
        theme: colorize,
        untheme: decolorize,
      },
    });
};
