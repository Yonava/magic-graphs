import type { GNode, Graph } from '@graph/types';
import { useTheme } from '@graph/themes/useTheme';
import colors from '@utils/colors';

const CYCLE_THEME_ID = 'cycle-colorizer';

const COLORS = [
  colors.RED_500,
  colors.BLUE_500,
  colors.GREEN_500,
  colors.YELLOW_500,
  colors.PURPLE_500,
  colors.ORANGE_500,
];

export const useCycleColorizer = (graph: Graph) => {
  const { setTheme, removeAllThemes } = useTheme(graph, CYCLE_THEME_ID);

  const colorNodeBorders = (node: GNode) => {
    const isAcyclic = graph.characteristics.isAcyclic.value;
    if (isAcyclic) return;
    const map = graph.characteristics.nodeIdToCycle.value;
    const cycle = map.get(node.id);
    if (cycle === undefined) return;
    return COLORS[cycle % COLORS.length];
  };

  const colorize = () => {
    setTheme('nodeBorderColor', colorNodeBorders);
    setTheme('nodeAnchorColor', colorNodeBorders);
  };

  const decolorize = () => {
    removeAllThemes();
  };

  return {
    colorize,
    decolorize,
  };
};
