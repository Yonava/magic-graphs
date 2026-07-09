import { CoreNode } from '@graph/primitives/types';

import { AdjacencyListsControls } from '../adjacency-lists/types.ts';
import { TransitionMatrix, TransitionMatrixPlugin } from './types.ts';

export const getTransitionMatrix = (
  adjList: AdjacencyListsControls['weighted'],
  nodeToIndex: (id: CoreNode['id']) => number,
) => {
  const adjListEntries = Object.entries(adjList);
  const nodeCount = adjListEntries.length;

  const matrix: TransitionMatrix = Array.from({ length: nodeCount }, () =>
    Array(nodeCount).fill(0),
  );

  for (const [nodeId, neighbors] of adjListEntries) {
    const fromIndex = nodeToIndex(nodeId)!;

    for (const neighbor of neighbors) {
      const toIndex = nodeToIndex(neighbor.id)!;
      matrix[fromIndex][toIndex] = neighbor.weight;
    }
  }

  return matrix;
};

export const transitionMatrix: TransitionMatrixPlugin = ({
  controls,
  ...rest
}) => ({
  name: 'transitionMatrix',
  controls: () =>
    getTransitionMatrix(
      controls.adjacencyLists.weighted,
      controls.nodeIdToIndex,
    ),
  ...rest,
});
