import type { GNode, Graph } from '@graph/types';
import { useTheme } from '@graph/themes/useTheme';
import colors from '@utils/colors';

const SCC_THEME_ID = 'scc-colorizer';

const COLORS = [
  colors.RED_500,
  colors.BLUE_500,
  colors.GREEN_500,
  colors.YELLOW_500,
  colors.PURPLE_500,
  colors.ORANGE_500,
];

export const useSCCColorizer = (graph: Graph, themeId = SCC_THEME_ID) => {
  const { setTheme, removeAllThemes } = useTheme(graph, themeId);

  const colorNodeBorders = (node: GNode) => {
    if (graph.focus.isFocused(node.id)) return;
    const map = graph.characteristics.nodeIdToConnectedComponent.value;
    const scc = map.get(node.id);
    if (scc === undefined) return;
    return COLORS[scc % COLORS.length];
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
