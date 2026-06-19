import colors from '@magic/utils/colors';

import { useNodeColor } from '../../../shared/graph-theme-helpers/useNodeColor.ts';
import type { Graph } from '../../../shared/useGraphWithCanvas.ts';

const SCC_THEME_ID = 'scc-colorizer';

const COLORS = [
  colors.RED_500,
  colors.BLUE_500,
  colors.GREEN_500,
  colors.YELLOW_500,
  colors.PURPLE_500,
  colors.ORANGE_500,
];

export const useSCCColorizer = (graph: Graph, themeId = SCC_THEME_ID) =>
  useNodeColor(
    graph,
    (nodeId: string) => {
      const map = graph.characteristics.sccs.nodeIdToConnectedComponent.value;
      const scc = map.get(nodeId);
      if (scc === undefined) return;
      return COLORS[scc % COLORS.length];
    },
    themeId,
  );
