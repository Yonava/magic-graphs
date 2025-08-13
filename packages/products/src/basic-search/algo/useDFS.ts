import type { Graph } from '@magic/graph/types';
import { useAdjacencyList } from '@magic/graph/useAdjacencyList';

import { computed, ref, watch } from 'vue';

import state from '../state';
import { dfs } from './dfs';
import type { BasicSearchTrace } from './types';

const { startNode } = state;

export const useDFS = (graph: Graph) => {
  const trace = ref<BasicSearchTrace[]>([]);

  const { adjacencyList } = useAdjacencyList(graph);

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
