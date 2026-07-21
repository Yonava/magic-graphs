import { debounce } from '@core/utils/debounce';

import { onMounted } from 'vue';

import { Graph } from '../graph/types.ts';

const localStorageKey = (id: string) => 'graph-data-' + id;

export const useLocalStorageGraphSync = (graph: Graph, productId: string) => {
  const save = debounce(() => {
    console.log('saving');
    window?.localStorage.setItem(
      localStorageKey(productId),
      JSON.stringify(graph.transit.encode()),
    );
  }, 500);

  const sync = () => {
    const data = window?.localStorage.getItem(localStorageKey(productId));
    if (!data) return;
    graph.transit.decode(JSON.parse(data));
  };

  onMounted(sync);

  graph.events._internal.gettersInvalidation.subscribe(
    'onGettersInvalidated',
    save,
  );
  graph.events.subscribe('onStructureChange', save);
  graph.nodeDrag.events.subscribe('onNodeDrop', save);
};
