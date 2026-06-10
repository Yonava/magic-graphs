import { useTheme } from '@magic/graph/themes/useTheme';
import type { GNode } from '@magic/graph/types';
import colors from '@magic/utils/colors';

import type { Graph } from '../../../shared/useGraphWithCanvas.ts';

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
    setTheme('node.default.borderColor', colorNodeBorders);
    setTheme('nodeAnchor.default.color', colorNodeBorders);
  };

  const decolorize = () => {
    removeAllThemes();
  };

  return {
    colorize,
    decolorize,
  };
};
