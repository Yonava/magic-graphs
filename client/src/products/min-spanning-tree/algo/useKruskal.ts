import { computed, ref } from 'vue';
import type { Graph } from '@graph/types';
import { kruskal } from './kruskal';

export const useKruskal = (graph: Graph) => {
  /**
   * just the mst array, to get the first n steps, slice the array at (0, n)
   */
  const trace = ref(kruskal(graph));

  const update = () => (trace.value = kruskal(graph));

  graph.subscribe('onStructureChange', update);

  return {
    output: {
      mst: computed(() => trace.value.at(-1)),
    },
    trace: computed(() => trace.value),
  };
};
