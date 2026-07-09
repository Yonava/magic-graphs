import { Graph } from '@magic/create-graph/index';
import { AdjacencyListsPlugin } from '@graph/plugins/adjacency-lists/types';

import { computed, shallowRef } from 'vue';

type AdjacencyListGraph = Graph<{
  plugins: [AdjacencyListsPlugin];
  presetName: string;
}>;

export const useAdjacencyLists = (graph: AdjacencyListGraph) => {
  const refresh = shallowRef(0);
  graph.events.subscribe('onStructureChange', () => refresh.value++);

  return {
    standard: computed(() => {
      refresh.value;
      return graph.adjacencyLists.standard();
    }),
    directed: computed(() => {
      refresh.value;
      return graph.adjacencyLists.directed();
    }),
    undirected: computed(() => {
      refresh.value;
      return graph.adjacencyLists.undirected();
    }),
    weighted: computed(() => {
      refresh.value;
      return graph.adjacencyLists.weighted();
    }),
  };
};
