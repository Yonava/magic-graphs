import { Graph } from '@graph/create-graph/index';
import { AdjacencyListsPlugin } from '@graph/plugins/adjacency-lists/types';
import { CharacteristicsPlugin } from '@graph/plugins/characteristics/index';

import { computed, shallowRef } from 'vue';

type CharacteristicsGraph = Graph<{
  plugins: [CharacteristicsPlugin, AdjacencyListsPlugin];
  presetName: string;
}>;

export const useCharacteristics = (graph: CharacteristicsGraph) => {
  const refresh = shallowRef(0);
  graph.events.subscribe('onStructureChange', () => refresh.value++);

  return {
    isComplete: computed(() => {
      refresh.value;
      return graph.characteristics.isComplete();
    }),
    cycles: computed(() => {
      refresh.value;
      return graph.characteristics.getCycles();
    }),
    sccs: computed(() => {
      refresh.value;
      return graph.characteristics.sccs();
    }),
    bidirectionalEdges: computed(() => {
      refresh.value;
      return graph.characteristics.bidirectionalEdges();
    }),
    bipartite: computed(() => {
      refresh.value;
      return graph.characteristics.bipartite();
    }),
    connected: computed(() => {
      refresh.value;
      return graph.characteristics.connected();
    }),
  };
};
