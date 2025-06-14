import type { GNode, Graph } from '@graph/types';
import { useTheme } from '@graph/themes/useTheme';
import colors from '@utils/colors';

const BIPARTITE_THEME_ID = 'bipartite-colorizer';

export const useBipartiteColorizer = (graph: Graph) => {
  const { setTheme, removeAllThemes } = useTheme(graph, BIPARTITE_THEME_ID);

  const colorNodeBorders = (node: GNode) => {
    const isBipartite = graph.characteristics.isBipartite.value;
    if (!isBipartite) return;
    const map = graph.characteristics.nodeIdToBipartitePartition.value;
    const partition = map.get(node.id);
    if (partition === undefined) return;
    return partition === 0 ? colors.RED_500 : colors.BLUE_500;
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
