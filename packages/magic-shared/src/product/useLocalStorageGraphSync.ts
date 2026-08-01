import { debounce } from '@core/utils/debounce';
import { effect } from '@reactive/primitives/index';

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

  // replaces a subscription to the old onGettersInvalidated. reading getNodes here
  // covers everything a node carries, plugin contributed fields included, which is
  // what that event was standing in for. save is debounced, so the eager evaluation
  // an effect forces does not cost a write per change
  effect(() => {
    graph.getNodes();
    save();
  });
  graph.events.subscribe('onStructureChange', save);
  graph.nodeDrag.events.subscribe('onNodeDrop', save);
};
