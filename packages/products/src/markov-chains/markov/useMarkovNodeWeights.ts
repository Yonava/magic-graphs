import type { GNode, Graph } from '@magic/graph/types';
import { Fraction } from 'mathjs';

import { computed } from 'vue';

/**
 * a map of node ids to the sum of their outgoing edge weights
 */
export type NodeIdToOutgoingWeight = Map<GNode['id'], Fraction>;

/**
 * maps node ids to the sum of their outgoing edge weights
 */
export const useNodeIdToOutboundWeight = (graph: Graph) => {
  const { getOutboundEdges, getEdgeWeightFraction } = graph.helpers;

  return computed(() => {
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
};
