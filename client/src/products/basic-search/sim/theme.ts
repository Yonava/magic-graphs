import type { GNode, Graph } from '@graph/types';
import type { SimulationControls } from '@ui/product/sim/types';
import { useTheme } from '@graph/themes/useTheme';
import colors from '@utils/colors';
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
    if (traceAtStep.value.nextToExplore?.has(node.id)) return SIM_COLORS.QUEUED;
  };

  const activate = () => {
    setTheme('nodeBorderColor', colorBorders);
    setTheme('nodeAnchorColor', colorBorders);
  };

  const deactivate = () => {
    removeAllThemes();
  };

  return {
    activate,
    deactivate,
  };
};
