import type { GNode, Graph } from '@graph/types';
import { Fraction } from 'mathjs';

import { computed } from 'vue';

/**
 * a map of node ids to the sum of their outgoing edge weights
 */
export type NodeIdToOutgoingWeight = Map<GNode['id'], Fraction>;

/**
 * reactive outgoing weights of nodes including computing illegal nodes/states
 * for a markov chain
 */
export const useMarkovNodeWeights = (graph: Graph) => {
  const { getOutboundEdges, getEdgeWeightFraction } = graph.helpers;

  const nodeIdToOutgoingWeight = computed(() => {
    return graph.nodes.value.reduce<NodeIdToOutgoingWeight>((acc, node) => {
      const outgoingEdges = getOutboundEdges(node.id);
      const weights = outgoingEdges.map((edge) =>
        getEdgeWeightFraction(edge.id),
      );

      const sum = weights.reduce((acc, curr) => acc.add(curr), new Fraction(0));
      acc.set(node.id, sum);

      return acc;
    }, new Map());
  });

  const illegalNodeIds = computed(() => {
    return new Set(
      graph.nodes.value
        .filter(
          (node) => nodeIdToOutgoingWeight.value.get(node.id)?.valueOf() !== 1,
        )
        .map((node) => node.id),
    );
  });

  return {
    /**
     * maps node ids to the sum of their outgoing edge weights
     */
    nodeIdToOutgoingWeight,
    /**
     * set of node ids with outgoing edge weights not equal to 1 (within tolerance)
     */
    illegalNodeIds,
  };
};

export type MarkovNodeWeights = ReturnType<typeof useMarkovNodeWeights>;
