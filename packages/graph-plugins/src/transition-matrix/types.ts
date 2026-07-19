import { CoreGetters } from '@graph/core/getters';
import { GraphPlugin } from '@graph/plugins-shared/plugins';

import { AdjacencyListsPlugin } from '../adjacency-lists/types.ts';

/**
 * a 2D array (matrix) where matrix[i][j] represents the weight of
 * transitioning from node i to node j
 */
export type TransitionMatrix = CoreGetters['getEdge']['weight'][][];

export type TransitionMatrixControls = () => TransitionMatrix;

export type TransitionMatrixPlugin = GraphPlugin<{
  name: 'transitionMatrix';
  controls: TransitionMatrixControls;
  dependsOn: [AdjacencyListsPlugin];
}>;
