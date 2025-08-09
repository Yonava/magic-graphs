import type { Graph } from '@graph/types';
import { mergeSetArrayIntoSet } from '@utils/sets';

import { computed } from 'vue';

import { useMarkovClasses } from './useMarkovClasses';
import { useNodeIdToOutboundWeight } from './useMarkovNodeWeights';
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

  const isErgodic = computed(() => {
    return !isPeriodic.value && isIrreducible.value
  })

  const nodeIdToOutgoingWeight = useNodeIdToOutboundWeight(graph);

  const invalidStates = computed(() => {
    const invalidStatesArr = graph.nodes.value
      .map((node) => node.id)
      .filter((nodeId) => {
        const outgoingWeight = nodeIdToOutgoingWeight.value.get(nodeId)!
        return outgoingWeight.valueOf() !== 1
      })
    return new Set(invalidStatesArr)
  });

  const isChainValid = computed(() => invalidStates.value.size > 0)

  const steadyState = useMarkovSteadyState(graph);
  const uniqueSteadyState = computed(() => {
    if (!isChainValid.value) return { type: 'error-invalid' } as const;
    if (recurrentClasses.value.length > 1) return { type: 'error-not-unique' } as const;
    if (isPeriodic.value) return { type: 'error-no-convergence' } as const
    return { type: 'success', data: steadyState.value } as const;
  })

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

    uniqueSteadyState,

    nodeIdToOutgoingWeight,

    invalidStates,
    isChainValid,
    isErgodic,
  };
};

export type MarkovChain = ReturnType<typeof useMarkovChain>;
