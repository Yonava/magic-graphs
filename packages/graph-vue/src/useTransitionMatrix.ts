import { Graph } from '@graph/create-graph/index';
import { AdjacencyListsPlugin } from '@graph/plugins/adjacency-lists/types';
import { TransitionMatrixPlugin } from '@graph/plugins/transition-matrix/types';

import { computed, shallowRef } from 'vue';

type TransitionMatrixGraph = Graph<{
  plugins: [TransitionMatrixPlugin, AdjacencyListsPlugin];
  presetName: string;
}>;

export const useTransitionMatrix = (graph: TransitionMatrixGraph) => {
  const refresh = shallowRef(0);
  graph.events.subscribe('onStructureChange', () => refresh.value++);

  return computed(() => {
    refresh.value;
    return graph.transitionMatrix();
  });
};
