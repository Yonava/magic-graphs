import { Graph } from '@magic/shared/graph';

import { onMounted } from 'vue';

const localStorageKey = 'graph-data';

export const useLocalStorageGraphSync = (graph: Graph) => {
  const save = () => {
    window?.localStorage.setItem(
      localStorageKey,
      JSON.stringify(graph.transit.encode()),
    );
  };

  const sync = () => {
    const data = window?.localStorage.getItem(localStorageKey);
    if (!data) return;
    graph.transit.decode(JSON.parse(data));
  };

  onMounted(sync);

  graph.events.subscribe('onStructureChange', save);
  graph.events.subscribe('onNodeDrop', save);
};
