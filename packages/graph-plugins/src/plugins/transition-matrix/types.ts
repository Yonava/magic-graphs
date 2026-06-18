import { GraphPlugin } from '@magic/graph/plugins/types';
import { CoreEdge } from '@magic/graph/types';

import { ComputedRef } from 'vue';

import { AdjacencyListsPlugin } from '../adjacency-lists/types.ts';

/**
 * a 2D array (matrix) where matrix[i][j] represents the weight of
 * transitioning from node i to node j
 */
export type TransitionMatrix = CoreEdge['weight'][][];

export type TransitionMatrixPlugin = GraphPlugin<{
  controls: { transitionMatrix: ComputedRef<TransitionMatrix> };
  dependsOn: [AdjacencyListsPlugin];
}>;
