import { computed, ref, watch } from 'vue';

import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import state from '../state.ts';
import { bfs } from './bfs.ts';
import type { BasicSearchTrace } from './types.ts';

const { startNode } = state;

export const useBFS = (graph: Graph) => {
  const trace = ref<BasicSearchTrace[]>([]);

  const { standard: adjacencyList } = graph.adjacencyLists;

  const update = () => {
    const node = startNode.get(graph);
    if (!node) return;

    trace.value = bfs(adjacencyList.value, node.id);
  };

  watch([startNode.ref, adjacencyList], update, { immediate: true });

  return {
    trace: computed(() => trace.value),
  };
};
