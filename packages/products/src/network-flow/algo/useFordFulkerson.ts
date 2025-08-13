import type { Graph } from '@graph/types';

import { computed, readonly, ref, watch } from 'vue';

import { useResidualEdges } from '../misc/useResidualEdges';
import state from '../state';
import { fordFulkerson } from './fordFulkerson';
import type { FlowTrace } from './fordFulkerson';

const { sourceNode, sinkNode } = state;

/**
 * reactive Ford-Fulkerson algorithm
 */
export const useFordFulkerson = (graph: Graph) => {
  const trace = ref<FlowTrace[]>([]);
  const maxFlow = ref<number>();

  const { createResidualEdges, cleanupResidualEdges } = useResidualEdges(graph);

  const update = () => {
    const srcNode = sourceNode.get(graph);
    const snkNode = sinkNode.get(graph);
    if (!srcNode || !snkNode) return;

    createResidualEdges();
    const { maxFlow: gotMaxFlow, trace: gotTrace } = fordFulkerson(graph, {
      sourceId: srcNode.id,
      sinkId: snkNode.id,
    });

    trace.value = gotTrace;
    maxFlow.value = gotMaxFlow;
    cleanupResidualEdges();
  };

  graph.subscribe('onStructureChange', update);
  watch([sourceNode.ref, sinkNode.ref], update, { immediate: true });

  return {
    output: {
      maxFlow: readonly(maxFlow),
    },
    trace: computed(() => [{}, ...trace.value]),
  };
};
