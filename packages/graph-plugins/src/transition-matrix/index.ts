import { CoreNode } from '@graph/primitives/types';
import { computed } from '@reactive/primitives/index';
import Fraction from 'fraction.js';

import { AdjacencyListsControls } from '../adjacency-lists/types.ts';
import { TransitionMatrix, TransitionMatrixPlugin } from './types.ts';

export const getTransitionMatrix = (
  adjList: ReturnType<AdjacencyListsControls['weighted']>,
  nodeToIndex: (id: CoreNode['id']) => number,
) => {
  const adjListEntries = Object.entries(adjList);
  const nodeCount = adjListEntries.length;

  const matrix: TransitionMatrix = Array.from({ length: nodeCount }, () =>
    Array.from({ length: nodeCount }, () => new Fraction(0)),
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

export const transitionMatrix: TransitionMatrixPlugin = ({ controls }) => ({
  name: 'transitionMatrix',
  controls: computed(() =>
    getTransitionMatrix(
      controls.adjacencyLists.weighted(),
      controls.nodeIdToIndex,
    ),
  ),
});
