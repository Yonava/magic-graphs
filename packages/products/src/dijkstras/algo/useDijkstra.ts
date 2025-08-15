import type { GNode, Graph } from '@magic/graph/types';

import { computed, ref, watch } from 'vue';

import state from '../state';
import { dijkstras } from './dijkstra';

export type DijkstrasOutput = {
  startNode: GNode;
  distances: Record<GNode['id'], number>;
};

export type DijkstrasTraceStep = {
  /**
   * the node the algorithm is currently at. `undefined` if the algorithm
   * is in its initial step, or has finished
   */
  currentNode?: GNode;
  /**
   * a map of the distances from the start node to each node in the graph
   * at this step
   */
  distances: Record<GNode['id'], number>;
  /**
   * the nodes that are currently in the queue
   */
  queue: Set<GNode['id']>;
};

export const useDijkstra = (graph: Graph) => {
  const trace = ref<DijkstrasTraceStep[]>([]);
  const output = ref<DijkstrasOutput>();

  const { startNode: startNodeState } = state;
  const { transitionMatrix } = graph.transitionMatrix;

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
