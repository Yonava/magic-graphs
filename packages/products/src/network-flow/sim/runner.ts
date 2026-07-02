import { computed } from 'vue';

import type {
  SimulationControls,
  SimulationRunner,
} from '../../shared/ui/general/sim/types.ts';
import { useSimulationControls } from '../../shared/ui/general/sim/useSimulationControls.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import type { FlowTrace } from '../algo/fordFulkerson.ts';
import { useFordFulkerson } from '../algo/useFordFulkerson.ts';
import { useResidualEdges } from '../misc/useResidualEdges.ts';
import state from '../state.ts';
import { useEdgeThickener } from '../theme/useEdgeThickener.ts';
import { useSourceSinkTheme } from '../theme/useSourceSinkTheme.ts';
import { useSimulationTheme } from './theme.ts';

export type FlowSimulationControls = SimulationControls<FlowTrace>;
export type FlowSimulationRunner = SimulationRunner<FlowTrace>;

const RUNNER_USETHEME_ID = 'flow-runner';
const { sourceNode, sinkNode } = state;

export const useSimulationRunner = (graph: Graph): FlowSimulationRunner => {
  const { activate: activeEdgeThickener, deactivate: deactivateEdgeThickener } =
    useEdgeThickener(graph, RUNNER_USETHEME_ID);

  const { stylize: activateFlowColorizer, destylize: deactivateFlowColorizer } =
    useSourceSinkTheme(graph, RUNNER_USETHEME_ID);

  const { createResidualEdges, cleanupResidualEdges } = useResidualEdges(graph);

  const { trace } = useFordFulkerson(graph);
  const simControls = useSimulationControls(trace, {
    lastStep: computed(() => trace.value.length),
  });

  const { activate: activateTheme, deactivate: deactivateTheme } =
    useSimulationTheme(graph, simControls);

  const start = async () => {
    activateFlowColorizer();
    activeEdgeThickener();

    if (sourceNode.isUndefined.value) await sourceNode.set(graph);
    if (sourceNode.isUndefined.value) return;

    if (sinkNode.isUndefined.value) await sinkNode.set(graph);
    if (sinkNode.isUndefined.value) return;

    createResidualEdges();
    activateTheme();

    simControls.start();
  };

  const stop = async () => {
    sourceNode.cancelSet();
    sinkNode.cancelSet();

    simControls.stop();
    cleanupResidualEdges();
    deactivateTheme();

    deactivateFlowColorizer();
    deactivateEdgeThickener();
  };

  return {
    start,
    stop,
    simControls,
  };
};
