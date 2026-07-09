import colors from '@magic/utils/colors';

import type { Graph } from '../../../shared/useGraphWithCanvas.ts';

const BIPARTITE_THEME_ID = 'bipartite-colorizer';

export const useBipartiteColorizer = (graph: Graph) => {
  const canvas = graph.canvas.theme.createLayer(BIPARTITE_THEME_ID);
  const anchors = graph.anchors.theme.createLayer(BIPARTITE_THEME_ID);

  const colorNodeBorders = ({ id }: { id: string }) => {
    const isBipartite = graph.characteristics.bipartite.value.isBipartite;
    if (!isBipartite) return;
    const map =
      graph.characteristics.bipartite.value.nodeIdToBipartitePartition;
    const partition = map.get(id);
    if (partition === undefined) return;
    return partition === 0 ? colors.RED_500 : colors.BLUE_500;
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
