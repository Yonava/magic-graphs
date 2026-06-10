import { computed } from 'vue';

import { CoreEventMap } from './core/events.ts';
import type { CoreGraph } from './core/types.ts';
import type { GEdge, GNode } from './types.ts';
import type {
  AdjacencyLists,
  WeightedAdjacencyList,
} from './useAdjacencyList.ts';

/**
 * a 2D array (matrix) where matrix[i][j] represents the weight of
 * transitioning from node i to node j
 */
export type TransitionMatrix = GEdge['weight'][][];

/**
 * generates a transition matrix for a directed or undirected graph
 *
 * @param graph the graph instance
 * @returns a {@link TransitionMatrix}
 */
export const getTransitionMatrix = (
  adjList: Readonly<WeightedAdjacencyList>,
  nodeToIndex: Map<GNode['id'], number>,
) => {
  const nodeCount = Object.keys(adjList).length;

  const matrix: TransitionMatrix = Array.from({ length: nodeCount }, () =>
    Array(nodeCount).fill(0),
  );

  for (const [nodeId, neighbors] of Object.entries(adjList)) {
    const fromIndex = nodeToIndex.get(nodeId)!;

    for (const neighbor of neighbors) {
      const toIndex = nodeToIndex.get(neighbor.id)!;
      matrix[fromIndex][toIndex] = neighbor.weight;
    }
  }

  return matrix;
};

export const useTransitionMatrix = <A, B extends CoreEventMap, C>({
  graph,
  adjacencyList,
}: {
  graph: CoreGraph<A, B, C>;
  adjacencyList: Pick<AdjacencyLists, 'weightedAdjacencyList'>;
}) => {
  const { weightedAdjacencyList } = adjacencyList;

  const transitionMatrix = computed(() => {
    return getTransitionMatrix(
      weightedAdjacencyList.value,
      graph.nodeIdToIndex.value,
    );
  });

  return transitionMatrix;
};
