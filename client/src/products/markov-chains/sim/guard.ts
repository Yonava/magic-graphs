import type { Graph } from '@graph/types';
import { SimulationGuard } from '@ui/product/sim/guard';
import { useMarkovChain } from '../markov/useMarkovChain';
import { useIllegalStateColorizer } from '../ui/useIllegalStateColorizer';
import definitions from '../markov/definitions';

export const canRunMarkovChain = (graph: Graph) => {
  const markov = useMarkovChain(graph);
  const { colorize, decolorize } = useIllegalStateColorizer(graph, markov);

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
