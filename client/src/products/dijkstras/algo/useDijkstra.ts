import { computed, ref, watch } from 'vue';
import type { GNode, Graph } from '@graph/types';
import { dijkstras } from './dijkstra';
import state from '../state';
import { useTransitionMatrix } from '@graph/useTransitionMatrix';

export type DijkstrasOutput = {
  startNode: GNode;
  distances: Record<GNode['id'], number>;
};

export type DijkstrasTraceAtStep = {
  /**
   * the node the algorithm is currently at. is undefined if the algorithm
   * is in its initialization phase, or if it has finished
   */
  currentNode?: GNode;
  /**
   * a map of the distances from the start node to each node in the graph
   * as of the current step
   */
  distances: Record<GNode['id'], number>;
  /**
   * the nodes that are currently in the queue
   */
  queue: Set<GNode['id']>;
};

export const useDijkstra = (graph: Graph) => {
  const trace = ref<DijkstrasTraceAtStep[]>([]);
  const output = ref<DijkstrasOutput>();

  const { startNode: startNodeState } = state;
  const { transitionMatrix } = useTransitionMatrix(graph);

  const update = () => {
    const startNode = startNodeState.get(graph);
    if (!startNode) return;
    const index = graph.nodeIdToIndex.value.get(startNode.id)!;

    const res = dijkstras(transitionMatrix.value, index);

    // parses out the matrix trace into a more consumable format
    // by mapping the indices back to the actual nodes and node ids
    // it also optimizes the trace for quick lookups

    trace.value = res.trace.map(({ currentNode, distances, queue }) => ({
      currentNode: graph.nodes.value[currentNode ?? -1] ?? undefined,
      distances: Object.fromEntries(
        distances.map((distance, i) => [graph.nodes.value[i].id, distance]),
      ),
      queue: new Set(queue.map((i) => graph.nodes.value[i.node].id)),
    }));

    output.value = {
      startNode: startNode,
      distances: Object.fromEntries(
        res.res.map((distance, i) => [graph.nodes.value[i].id, distance]),
      ),
    };
  };

  watch([startNodeState.ref, transitionMatrix], update, { immediate: true });

  return {
    output,
    trace: computed(() => trace.value),
  };
};
