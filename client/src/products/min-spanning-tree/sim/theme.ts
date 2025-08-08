import { useTheme } from '@graph/themes/useTheme';
import type { GEdge, Graph } from '@graph/types';
import type { SimulationControls } from '@ui/product/sim/types';

import { computed } from 'vue';

import type { MSTTrace } from './runner';

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
  const { setTheme, removeAllThemes } = useTheme(graph, MST_USETHEME_ID);

  const mstAtStep = computed(() => trace.value.slice(0, sim.step.value));

  const colorEdge = (edge: GEdge) => {
    if (graph.focus.isFocused(edge.id)) return;

    const color = graph.baseTheme.value.edgeColor;
    const inMST = mstAtStep.value.some((e) => e.id === edge.id);
    if (inMST) return color;
    else return color + DIM_FACTOR;
  };

  const colorEdgeText = (edge: GEdge) => {
    if (graph.focus.isFocused(edge.id)) return;

    const color = graph.baseTheme.value.edgeTextColor;
    const inMST = mstAtStep.value.some((e) => e.id === edge.id);
    if (inMST) return color;
    else return color + DIM_FACTOR;
  };

  const activate = () => {
    setTheme('edgeColor', colorEdge);
    setTheme('edgeTextColor', colorEdgeText);
  };

  const deactivate = () => {
    removeAllThemes();
  };

  return {
    activate,
    deactivate,
  };
};
