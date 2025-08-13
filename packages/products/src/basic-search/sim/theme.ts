import { useTheme } from '@magic/graph/themes/useTheme';
import type { GEdge, GNode, Graph } from '@magic/graph/types';
import type { SimulationControls } from '@magic/ui/product/sim/types';
import colors from '@magic/utils/colors';

import type { BasicSearchTrace } from '../algo/types';

export const SIM_COLORS = {
  CURRENT: colors.AMBER_600,
  QUEUED: colors.CYAN_500,
  VISITED: colors.BLUE_600,
} as const;

export const USETHEME_ID = 'basic-search';

export const useSimulationTheme = (
  graph: Graph,
  sim: SimulationControls<BasicSearchTrace>,
) => {
  const { traceAtStep } = sim;
  const { setTheme, removeAllThemes } = useTheme(graph, USETHEME_ID);

  const colorBorders = (node: GNode) => {
    if (graph.focus.isFocused(node.id)) return;

    if (traceAtStep.value?.currentNodeId === node.id) return SIM_COLORS.CURRENT;
    if (traceAtStep.value.visited.has(node.id)) return SIM_COLORS.VISITED;
    if (traceAtStep.value.queue?.includes(node.id)) return SIM_COLORS.QUEUED;
  };

  const colorEdge = (edge: GEdge) => {
    if (
      traceAtStep.value.currentNodeId === edge.from &&
      !traceAtStep.value.visited.has(edge.to) &&
      traceAtStep.value.queue?.includes(edge.to)
    ) {
      return 'red';
    }
  };

  const activate = () => {
    setTheme('nodeBorderColor', colorBorders);
    setTheme('nodeAnchorColor', colorBorders);
    setTheme('edgeColor', colorEdge);
  };

  const deactivate = () => {
    removeAllThemes();
  };

  return {
    activate,
    deactivate,
  };
};
