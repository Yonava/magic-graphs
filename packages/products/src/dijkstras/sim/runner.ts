import type { Graph } from '@magic/graph/types';
import type { SimulationRunner } from '@ui/product/sim/types';
import { useSimulationControls } from '@ui/product/sim/useSimulationControls';

import { ref } from 'vue';

import { useDijkstra } from '../algo/useDijkstra';
import type { DijkstrasTraceStep } from '../algo/useDijkstra';
import state from '../state';
import { useSimulationTheme } from './theme';

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
