import type { ComputedRef } from 'vue';
import type { Graph } from '@graph/types';
import type { SimulationRunner } from '@ui/product/sim/types';
import { useSimulationControls } from '@ui/product/sim/useSimulationControls';
import { useBFS } from '../algo/useBFS';
import { useDFS } from '../algo/useDFS';
import { useSimulationTheme } from './theme';
import state from '../state';
import type { BasicSearchTrace } from '../algo/types';

const { startNode } = state;

export type BasicSearchSimulationRunner = SimulationRunner<BasicSearchTrace>;

const useSimulationRunner = (
  graph: Graph,
  trace: ComputedRef<BasicSearchTrace[]>,
): BasicSearchSimulationRunner => {
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
  };

  const stop = () => {
    startNode.cancelSet();

    simControls.stop();
    untheme();
  };

  return {
    start,
    stop,
    simControls,
  };
};

export const useBFSSimulationRunner = (graph: Graph) => {
  const { trace } = useBFS(graph);
  return useSimulationRunner(graph, trace);
};

export const useDFSSimulationRunner = (graph: Graph) => {
  const { trace } = useDFS(graph);
  return useSimulationRunner(graph, trace);
};
