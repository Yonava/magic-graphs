import { CoreNode } from '@magic/graph-core-infra/types';

import { computed } from 'vue';

import { WeightedAdjacencyList } from '../adjacency-lists/types.ts';
import { TransitionMatrix, TransitionMatrixPlugin } from './types.ts';

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

export const transitionMatrix: TransitionMatrixPlugin = ({
  controls,
  ...rest
}) => ({
  controls: {
    transitionMatrix: computed(() =>
      getTransitionMatrix(
        controls.adjacencyLists.weighted.value,
        controls.nodeIdToIndex.value,
      ),
    ),
  },
  ...rest,
});
