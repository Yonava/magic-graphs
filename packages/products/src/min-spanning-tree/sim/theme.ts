import { getValue } from '@magic/utils/maybeGetter/index';

import { computed } from 'vue';

import type { SimulationControls } from '../../shared/ui/general/sim/types.ts';
import { GEdge } from '../../shared/useGraph.ts';
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

  const colorEdge = (edge: Omit<GEdge, 'weight'>) => {
    if (graph.focus.isFocused(edge.id)) return;

    const color = getValue(
      graph.theme.activePreset().canvas['edge.default.color'],
      edge,
    )!;

    const inMST = mstAtStep.value.some((e) => e.id === edge.id);
    if (inMST) return color;
    else return color + DIM_FACTOR;
  };

  const colorEdgeText = (edge: Omit<GEdge, 'weight'>) => {
    if (graph.focus.isFocused(edge.id)) return;

    const color = getValue(
      graph.theme.activePreset().canvas['edge.default.text.color'],
      edge,
    )!;

    const inMST = mstAtStep.value.some((e) => e.id === edge.id);
    if (inMST) return color;
    else return color + DIM_FACTOR;
  };

  const activate = () => {
    set('edge.default.color', colorEdge);
    set('edge.default.text.color', colorEdgeText);
  };

  const deactivate = () => {
    removeAll();
  };

  return {
    activate,
    deactivate,
  };
};
