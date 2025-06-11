import { computed, ref, watch } from 'vue';
import type { Graph } from '@graph/types';
import { dfs } from './dfs';
import state from '../state';
import { useAdjacencyList } from '@graph/useAdjacencyList';
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
