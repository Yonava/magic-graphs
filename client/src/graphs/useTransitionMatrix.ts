import { computed } from 'vue';

import type { BaseGraph } from './base';
import type { GNode, Weight } from './types';
import type { AdjacencyLists, WeightedAdjacencyList } from './useAdjacencyList';

/**
 * a 2D array (matrix) where matrix[i][j] represents the absolute weight of
 * transitioning from node i to node j
 */
export type TransitionMatrix<T extends Weight = number> = T[][];

/**
 * generates a transition matrix for a directed or undirected graph
 *
 * @param graph the graph instance
 * @returns a {@link TransitionMatrix}
 */
export const getTransitionMatrix = <T extends Weight>(
  adjList: Readonly<WeightedAdjacencyList<T>>,
  nodeToIndex: Map<GNode['id'], number>,
) => {
  const nodeCount = Object.keys(adjList).length;

  const matrix: TransitionMatrix<T> = Array.from({ length: nodeCount }, () =>
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

export const useTransitionMatrix = (
  graph: BaseGraph & {
    adjacencyList: Pick<
      AdjacencyLists,
      'weightedAdjacencyList' | 'weightedFracAdjacencyList'
    >;
  },
) => {
  const { weightedAdjacencyList, weightedFracAdjacencyList } =
    graph.adjacencyList;

  const transitionMatrix = computed(() => {
    return getTransitionMatrix(
      weightedAdjacencyList.value,
      graph.nodeIdToIndex.value,
    );
  });

  const fracTransitionMatrix = computed(() => {
    return getTransitionMatrix(
      weightedFracAdjacencyList.value,
      graph.nodeIdToIndex.value,
    );
  });

  return {
    /**
     * the transition matrix for the graph using standard number weights
     */
    transitionMatrix,
    /**
     * the transition matrix for the graph using fraction weights
     */
    fracTransitionMatrix,
  };
};
