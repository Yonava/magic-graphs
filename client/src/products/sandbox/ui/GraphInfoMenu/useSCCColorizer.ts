import { useNodeColor } from '@graph/themes/helpers/useNodeColor';
import type { GNode, Graph } from '@graph/types';
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

export const useSCCColorizer = (graph: Graph, themeId = SCC_THEME_ID) => useNodeColor(graph, (nodeId: GNode['id']) => {
  const map = graph.characteristics.nodeIdToConnectedComponent.value;
  const scc = map.get(nodeId);
  if (scc === undefined) return;
  return COLORS[scc % COLORS.length];
}, themeId)
