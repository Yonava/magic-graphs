import { computed } from 'vue';

import { GraphCoreControls } from '../core/types.ts';

/**
 * all edges that link two nodes in both directions
 * (i.e. edge A->B and B->A are a bidirectional pair of edges)
 */
export const useBidirectionalEdges = (
  graph: Pick<GraphCoreControls, 'edges'>,
) => {
  const bidirectionalEdges = computed(() => {
    const edges = graph.edges.value;
    return edges
      .filter((edge) => edge.source !== edge.target)
      .filter((edge) => {
        return edges.some((otherEdge) => {
          return (
            edge.source === otherEdge.target && edge.target === otherEdge.source
          );
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
