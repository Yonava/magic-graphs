import type { GEdge, Graph } from '@magic/graph/types';
import type {
  SimulationControls,
  SimulationRunner,
} from '@ui/product/sim/types';
import { useSimulationControls } from '@ui/product/sim/useSimulationControls';

import { computed } from 'vue';

import { useKruskal } from '../algo/useKruskal';
import { usePrim } from '../algo/usePrim';
import { useSimulationTheme } from './theme';

export type MSTTrace = GEdge;
export type MSTSimulationControls = SimulationControls<MSTTrace>;
export type MSTSimulationRunner = SimulationRunner<MSTTrace>;

export const useMSTSimulationRunner = (
  graph: Graph,
  trace: MSTSimulationControls['trace'],
): MSTSimulationRunner => {
  const lastStep = computed(() => trace.value.length);
  const simControls = useSimulationControls(trace, { lastStep });
  const { activate, deactivate } = useSimulationTheme(graph, simControls);

  return {
    simControls,
    start: () => {
      activate();
      simControls.start();
    },
    stop: () => {
      deactivate();
      simControls.stop();
    },
  };
};

export const usePrimSimulationRunner = (graph: Graph) => {
  const { trace } = usePrim(graph);
  return useMSTSimulationRunner(graph, trace);
};

export const useKruskalSimulationRunner = (graph: Graph) => {
  const { trace } = useKruskal(graph);
  return useMSTSimulationRunner(graph, trace);
};
