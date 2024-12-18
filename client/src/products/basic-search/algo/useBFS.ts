import { computed, ref, watch } from "vue";
import type { GNode, Graph } from "@graph/types";
import { bfs } from "./bfs";
import state from "../state";
import { useAdjacencyList } from "@graph/useAdjacencyList";
import type { BasicSearchTrace } from "./types";

const { startNode } = state;

export const useBFS = (graph: Graph) => {
  const trace = ref<BasicSearchTrace>([]);

  const { adjacencyList } = useAdjacencyList(graph);

  const update = () => {
    const node = startNode.get(graph)
    if (!node) return;

    trace.value = bfs(adjacencyList.value, node.id)
  }

  watch([startNode.ref, adjacencyList], update, { immediate: true });

  return {
    trace: computed(() => trace.value),
  }
};
