import type { CoreEdge } from '@magic/graph/types';

import { computed } from 'vue';

import type {
  SimulationControls,
  SimulationRunner,
} from '../../shared/ui/general/sim/types.ts';
import { useSimulationControls } from '../../shared/ui/general/sim/useSimulationControls.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import { useKruskal } from '../algo/useKruskal.ts';
import { usePrim } from '../algo/usePrim.ts';
import { useSimulationTheme } from './theme.ts';

export type MSTTrace = CoreEdge;
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
