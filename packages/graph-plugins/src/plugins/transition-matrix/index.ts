import type { CoreNode } from '@magic/graph/types';

import { computed } from 'vue';

import { WeightedAdjacencyList } from '../adjacency-lists/types.ts';
import { TransitionMatrix, TransitionMatrixPlugin } from './types.ts';

/**
 * generates a transition matrix for a directed or undirected graph
 *
 * @param graph the graph instance
 * @returns a {@link TransitionMatrix}
 */
export const getTransitionMatrix = (
  adjList: Readonly<WeightedAdjacencyList>,
  nodeToIndex: Map<CoreNode['id'], number>,
) => {
  const adjListEntries = Object.entries(adjList);
  const nodeCount = adjListEntries.length;

  const matrix: TransitionMatrix = Array.from({ length: nodeCount }, () =>
    Array(nodeCount).fill(0),
  );

  for (const [nodeId, neighbors] of adjListEntries) {
    const fromIndex = nodeToIndex.get(nodeId)!;

    for (const neighbor of neighbors) {
      const toIndex = nodeToIndex.get(neighbor.id)!;
      matrix[fromIndex][toIndex] = neighbor.weight;
    }
  }

  return matrix;
};

export const transitionMatrix: TransitionMatrixPlugin = (
  controls,
  events,
  actions,
  getters,
) => ({
  events,
  actions,
  getters,
  controls: {
    transitionMatrix: computed(() =>
      getTransitionMatrix(
        controls.adjacencyLists.weighted.value,
        controls.nodeIdToIndex.value,
      ),
    ),
  },
});
