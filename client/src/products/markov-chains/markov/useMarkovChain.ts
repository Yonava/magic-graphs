import type { Graph } from '@graph/types';
import { mergeSetArrayIntoSet } from '@utils/sets';

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

  const recurrentStates = computed(() => mergeSetArrayIntoSet(recurrentClasses.value));
  const transientStates = computed(() => mergeSetArrayIntoSet(transientClasses.value));

  const { isPeriodic, recurrentClassPeriods } = useMarkovPeriodicity(
    graph,
    recurrentClasses,
  );

  const absorbingStates = computed(() => {
    return mergeSetArrayIntoSet(recurrentClasses.value.filter((rc) => rc.size === 1))
  })

  const isChainAbsorbing = computed(() => {
    return absorbingStates.value.size > 0
  });

  const communicatingClasses = computed(() => {
    return graph.characteristics.stronglyConnectedComponents.value;
  });

  const isIrreducible = computed(() => {
    return recurrentClasses.value.length === 1 && transientClasses.value.length === 0
  })

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
    isChainAbsorbing,
    absorbingStates,
    isIrreducible,

    // TODO implement a correct version of steady state
    steadyState,

    nodeIdToOutgoingWeight,
    illegalNodeIds,
  };
};

export type MarkovChain = ReturnType<typeof useMarkovChain>;
