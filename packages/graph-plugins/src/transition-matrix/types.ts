import { CoreGetters } from '@magic/graph-core/getters';

import { ComputedRef } from 'vue';

import { GraphPlugin } from '../../../graph-plugins-shared/dist/types/plugins/internals/types.ts';
import { AdjacencyListsPlugin } from '../adjacency-lists/types.ts';

/**
 * a 2D array (matrix) where matrix[i][j] represents the weight of
 * transitioning from node i to node j
 */
export type TransitionMatrix = CoreGetters['getEdge']['weight'][][];

export type TransitionMatrixPlugin = GraphPlugin<{
  controls: { transitionMatrix: ComputedRef<TransitionMatrix> };
  dependsOn: [AdjacencyListsPlugin];
}>;
