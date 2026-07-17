import { onMounted } from 'vue';

import { Graph } from '../graph/types.ts';

const localStorageKey = (id: string) => 'graph-data-' + id;

export const useLocalStorageGraphSync = (graph: Graph, productId: string) => {
  const save = () => {
    window?.localStorage.setItem(
      localStorageKey(productId),
      JSON.stringify(graph.transit.encode()),
    );
  };

  const sync = () => {
    const data = window?.localStorage.getItem(localStorageKey(productId));
    if (!data) return;
    graph.transit.decode(JSON.parse(data));
  };

  onMounted(sync);

  graph.events.subscribe('onStructureChange', save);
  graph.events.subscribe('onNodeDrop', save);
};
