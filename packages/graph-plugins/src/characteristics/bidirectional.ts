import { CoreEdge } from '@magic/graph-core-infra/types';

import { ComputedRef, computed } from 'vue';

import { Controls } from './index.ts';

export type BidirectionalEdgesControls = {
  bidirectionalEdges: ComputedRef<CoreEdge[]>;
  hasBidirectionalEdges: ComputedRef<boolean>;
};

/**
 * all edges that link two nodes in both directions
 * (i.e. edge A->B and B->A are a bidirectional pair of edges)
 */
export const useBidirectionalEdges = (
  controls: Controls,
): BidirectionalEdgesControls => {
  const bidirectionalEdges = computed(() => {
    const edges = controls.edges.value;
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
