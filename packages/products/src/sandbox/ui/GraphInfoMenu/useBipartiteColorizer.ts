import colors from '@magic/utils/colors';

import type { Graph } from '../../../shared/useGraphWithCanvas.ts';

const BIPARTITE_THEME_ID = 'bipartite-colorizer';

export const useBipartiteColorizer = (graph: Graph) => {
  const { set, removeAll } =
    graph.canvas.theme.createLayer(BIPARTITE_THEME_ID);

  const colorNodeBorders = ({ id }: { id: string }) => {
    const isBipartite = graph.characteristics.bipartite.isBipartite.value;
    if (!isBipartite) return;
    const map = graph.characteristics.bipartite.nodeIdToBipartitePartition.value;
    const partition = map.get(id);
    if (partition === undefined) return;
    return partition === 0 ? colors.RED_500 : colors.BLUE_500;
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
