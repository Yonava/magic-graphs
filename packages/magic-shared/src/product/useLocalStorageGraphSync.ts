import { debounce } from '@core/utils/debounce';

import { onMounted } from 'vue';

import type { MagicGraph } from './useGraphProduct.ts';

const localStorageKey = (id: string) => 'graph-data-' + id;

export const useLocalStorageGraphSync = (graph: MagicGraph) => {
  const key = localStorageKey(graph.magic.manifest.id);

  const save = debounce(() => {
    window?.localStorage.setItem(key, JSON.stringify(graph.transit.encode()));
  }, 500);

  const sync = () => {
    const data = window?.localStorage.getItem(key);
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
