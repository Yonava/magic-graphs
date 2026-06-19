import { Fraction } from 'mathjs';

import { computed } from 'vue';

import type { Graph } from '../../shared/useGraphWithCanvas.ts';

/**
 * a map of node ids to the sum of their outgoing edge weights
 */
export type NodeIdToOutgoingWeight = Map<string, Fraction>;

/**
 * maps node ids to the sum of their outgoing edge weights
 */
export const useNodeIdToOutboundWeight = (graph: Graph) => {
  const { getOutboundEdges } = graph.helpers.nodes;

  return computed(() => {
    return graph.nodes.value.reduce<NodeIdToOutgoingWeight>((acc, node) => {
      const outgoingEdges = getOutboundEdges(node.id);
      const weights = outgoingEdges.map(
        (edge) => graph.getEdge(edge.id).weight,
      );

      const sum = weights.reduce((acc, curr) => acc.add(curr), new Fraction(0));
      acc.set(node.id, sum);

      return acc;
    }, new Map());
  });
};
