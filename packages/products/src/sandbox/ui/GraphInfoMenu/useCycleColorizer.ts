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
  const { set, removeAll } = graph.canvas.theme.createLayer(CYCLE_THEME_ID);

  const colorNodeBorders = ({ id }: { id: string }) => {
    const isAcyclic = graph.characteristics.isAcyclic.value;
    if (isAcyclic) return;
    const map = graph.characteristics.nodeIdToCycle.value;
    const cycle = map.get(id);
    if (cycle === undefined) return;
    return COLORS[cycle % COLORS.length];
  };

  const colorize = () => {
    set('node.default.borderColor', colorNodeBorders);
    set('nodeAnchor.default.color', colorNodeBorders);
  };

  const decolorize = () => {
    removeAll();
  };

  return {
    colorize,
    decolorize,
  };
};
