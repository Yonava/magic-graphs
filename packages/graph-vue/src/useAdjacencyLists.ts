import { StructuralEventMap } from '@graph/create-graph/structural-events';
import { AdjacencyListsControls } from '@graph/plugins/adjacency-lists/types';
import { ReadonlyEventHub } from '@graph/primitives/events/createEventHub';

import { computed, shallowRef } from 'vue';

export const useAdjacencyLists = (
  events: ReadonlyEventHub<StructuralEventMap>,
  adjacencyLists: AdjacencyListsControls,
) => {
  const refresh = shallowRef(0);
  events.subscribe('onStructureChange', () => refresh.value++);

  return {
    standard: computed(() => {
      refresh.value;
      return adjacencyLists.standard();
    }),
    directed: computed(() => {
      refresh.value;
      return adjacencyLists.directed();
    }),
    undirected: computed(() => {
      refresh.value;
      return adjacencyLists.undirected();
    }),
    weighted: computed(() => {
      refresh.value;
      return adjacencyLists.weighted();
    }),
  };
};
