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
    console.log(graph.adjacencyLists.directed.value);
  };

  onMounted(sync);

  graph.events.subscribe('onStructureChange', save);
  graph.events.subscribe('onNodeDrop', save);

  graph.events.subscribe('onStructureChange', () => {
    console.log('structure changed');
  });
  graph.events.subscribe('onNodesAdded', () => {
    console.log('nodes added');
  });
  graph.events.subscribe('onEdgesAdded', () => {
    console.log('edges added');
  });
  graph.events.subscribe('onEdgeWeightsCommitted', () => {
    console.log('weight changed');
  });
};
