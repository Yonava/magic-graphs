import type { Graph } from '@graph/types';
import { reduceSet } from '@utils/sets';

import { computed } from 'vue';

import { useMarkovClasses } from './useMarkovClasses';
import { useMarkovNodeWeights } from './useMarkovNodeWeights';
import { useMarkovPeriodicity } from './useMarkovPeriodicity';
import { useMarkovSteadyState } from './useMarkovSteadyState';

/**
 * reactive markov chain characteristics
 */
export const useMarkovChain = (graph: Graph) => {
  const {
    recurrentClasses,
    transientClasses,
    nodeIdToRecurrentClassIndex,
    nodeIdToTransientClassIndex,
  } = useMarkovClasses(graph);

  const recurrentStates = computed(() => reduceSet(recurrentClasses.value));
  const transientStates = computed(() => reduceSet(transientClasses.value));

  const { isPeriodic, recurrentClassPeriods } = useMarkovPeriodicity(
    graph,
    recurrentClasses,
  );

  // TODO check with a pro to see if this is correct.
  const isAbsorbing = computed(() => {
    if (recurrentClassPeriods.value.length === 0) return false;
    return recurrentClasses.value.every((recurrentClass) => {
      return recurrentClass.size === 1;
    });
  });

  const communicatingClasses = computed(() => {
    return graph.characteristics.stronglyConnectedComponents.value;
  });

  const { nodeIdToOutgoingWeight, illegalNodeIds } =
    useMarkovNodeWeights(graph);

  const steadyState = useMarkovSteadyState();

  return {
    communicatingClasses,

    recurrentClasses,
    recurrentStates,
    recurrentClassPeriods,
    nodeIdToRecurrentClassIndex,

    transientClasses,
    transientStates,
    nodeIdToTransientClassIndex,

    isPeriodic,
    isAbsorbing,

    // TODO implement a correct version of steady state
    steadyState,

    nodeIdToOutgoingWeight,
    illegalNodeIds,
  };
};

export type MarkovChain = ReturnType<typeof useMarkovChain>;
