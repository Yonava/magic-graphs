import { ref } from 'vue';

import type { SimulationRunner } from '../../shared/ui/general/sim/types.ts';
import { useSimulationControls } from '../../shared/ui/general/sim/useSimulationControls.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import { useDijkstra } from '../algo/useDijkstra.ts';
import type { DijkstrasTraceStep } from '../algo/useDijkstra.ts';
import state from '../state.ts';
import { useSimulationTheme } from './theme.ts';

const { startNode } = state;

export const isRunning = ref(false);

export type DijkstraSimulationRunner = SimulationRunner<DijkstrasTraceStep>;

export const useSimulationRunner = (graph: Graph): DijkstraSimulationRunner => {
  const { trace } = useDijkstra(graph);
  const simControls = useSimulationControls(trace);
  const { activate: theme, deactivate: untheme } = useSimulationTheme(
    graph,
    simControls,
  );

  const start = async () => {
    await startNode.set(graph);
    if (startNode.isUndefined.value) return;

    simControls.start();
    theme();
    isRunning.value = true;
  };

  const stop = () => {
    startNode.cancelSet();
    simControls.stop();
    untheme();
    isRunning.value = false;
  };

  return {
    start,
    stop,
    simControls,
  };
};
