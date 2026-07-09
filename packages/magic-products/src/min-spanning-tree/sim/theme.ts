import { computed } from 'vue';

import type { SimulationControls } from '../../shared/ui/general/sim/types.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import type { MSTTrace } from './runner.ts';

/**
 * dims the color of the edge if it is not in the MST to ${DIM_FACTOR}%
 */
const DIM_FACTOR = 20;

export const MST_USETHEME_ID = 'mst';

export const useSimulationTheme = (
  graph: Graph,
  sim: SimulationControls<MSTTrace>,
) => {
  const { traceArray: trace } = sim;
  const { set, removeAll } = graph.canvas.theme.createLayer(MST_USETHEME_ID);

  const mstAtStep = computed(() => trace.value.slice(0, sim.step.value));

  const dimIfNotInMST = (edge: { id: string }, baseResolver: () => string) => {
    const color = baseResolver();
    const inMST = mstAtStep.value.some((e) => e.id === edge.id);
    if (inMST) return color;
    return color + DIM_FACTOR;
  };

  const activate = () => {
    set('edge.default.color', dimIfNotInMST);
    set('edge.default.text.color', dimIfNotInMST);
  };

  const deactivate = () => {
    removeAll();
  };

  return {
    activate,
    deactivate,
  };
};
