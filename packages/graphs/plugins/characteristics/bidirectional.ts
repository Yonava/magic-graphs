import type { BaseGraph } from '@graph/base';

import { computed } from 'vue';

/**
 * all edges that link two nodes in both directions
 * (i.e. edge A->B and B->A are a bidirectional pair of edges)
 */
export const useBidirectionalEdges = (graph: BaseGraph) => {
  const bidirectionalEdges = computed(() => {
    const edges = graph.edges.value;
    return edges
      .filter((edge) => edge.from !== edge.to)
      .filter((edge) => {
        return edges.some((otherEdge) => {
          return edge.from === otherEdge.to && edge.to === otherEdge.from;
        });
      });
  });

  const hasBidirectionalEdges = computed(() => {
    return bidirectionalEdges.value.length > 0;
  });

  return {
    bidirectionalEdges,
    hasBidirectionalEdges,
  };
};

export type CharacteristicBidirectional = ReturnType<
  typeof useBidirectionalEdges
>;
