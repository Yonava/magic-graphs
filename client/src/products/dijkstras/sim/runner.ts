import type { Graph } from '@graph/types';
import type { SimulationRunner } from '@ui/product/sim/types';
import { useSimulationControls } from '@ui/product/sim/useSimulationControls';
import { useDijkstra } from '../algo/useDijkstra';
import type { DijkstrasTraceAtStep } from '../algo/useDijkstra';
import { useSimulationTheme } from './theme';
import state from '../state';
import { ref } from 'vue';

const { startNode } = state;

export const isRunning = ref(false);

export type DijkstraSimulationRunner = SimulationRunner<DijkstrasTraceAtStep>;

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
