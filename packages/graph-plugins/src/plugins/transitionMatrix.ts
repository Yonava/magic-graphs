import { GraphPlugin } from '@magic/graph/plugins/types';
import type { CodeEdge, CoreNode } from '@magic/graph/types';

import { ComputedRef, computed } from 'vue';

import type {
  AdjacencyListsPlugin,
  WeightedAdjacencyList,
} from './adjacencyLists.ts';

/**
 * a 2D array (matrix) where matrix[i][j] represents the weight of
 * transitioning from node i to node j
 */
export type TransitionMatrix = CodeEdge['weight'][][];

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

export type TransitionMatrixPlugin = GraphPlugin<{
  controls: { transitionMatrix: ComputedRef<TransitionMatrix> };
  dependsOn: [AdjacencyListsPlugin];
}>;

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
