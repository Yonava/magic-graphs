import type { Graph } from '@magic/graph/types';

import { computed, ref, watch } from 'vue';

import state from '../state.ts';
import { dfs } from './dfs.ts';
import type { BasicSearchTrace } from './types.ts';

const { startNode } = state;

export const useDFS = (graph: Graph) => {
  const trace = ref<BasicSearchTrace[]>([]);

  const { adjacencyList } = graph.adjacencyList;

  const update = () => {
    const node = startNode.get(graph);
    if (!node) return;

    const rawTrace = dfs(adjacencyList.value, node.id);
    const { visited, currentNodeId } = rawTrace[rawTrace.length - 1];
    visited.add(currentNodeId ?? '');
    trace.value = [...rawTrace, { visited }];
  };

  watch([startNode.ref, adjacencyList], update, { immediate: true });

  return {
    trace: computed(() => trace.value),
  };
};
