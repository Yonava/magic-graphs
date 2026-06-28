import { CoreGetters } from '@magic/graph-core/getters';
import { GraphPlugin } from '@magic/graph-plugins-shared/plugins';

import { ComputedRef } from 'vue';

import { AdjacencyListsPlugin } from '../adjacency-lists/types.ts';

/**
 * a 2D array (matrix) where matrix[i][j] represents the weight of
 * transitioning from node i to node j
 */
export type TransitionMatrix = CoreGetters['getEdge']['weight'][][];

export type TransitionMatrixPlugin = GraphPlugin<{
  controls: ComputedRef<TransitionMatrix>;
  dependsOn: [AdjacencyListsPlugin];
}>;
