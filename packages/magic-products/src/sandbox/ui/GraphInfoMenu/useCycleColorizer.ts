import colors from '@core/utils/colors';

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
  const canvas = graph.canvas.theme.createLayer(CYCLE_THEME_ID);
  const anchors = graph.anchors.theme.createLayer(CYCLE_THEME_ID);

  const colorNodeBorders = ({ id }: { id: string }) => {
    const isAcyclic = graph.characteristics.cycles.value.isAcyclic;
    if (isAcyclic) return;
    const map = graph.characteristics.cycles.value.nodeIdToCycle;
    const cycle = map.get(id);
    if (cycle === undefined) return;
    return COLORS[cycle % COLORS.length];
  };

  const colorize = () => {
    canvas.set('node.default.border.color', colorNodeBorders);
    anchors.set('anchors.default.color', colorNodeBorders);
  };

  const decolorize = () => {
    canvas.removeAll();
    anchors.removeAll();
  };

  return {
    colorize,
    decolorize,
  };
};
