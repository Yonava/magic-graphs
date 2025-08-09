import type { GNode, Graph } from '@graph/types';
import colors from '@utils/colors';
import type { Color } from '@utils/colors';

import type { TreeControls } from '../useTree';
import { useNodeColor } from '../../../graphs/themes/helpers/useNodeColor';
import { useNodeLabel } from '../../../graphs/themes/helpers/useNodeLabel';

export const useBalanceFactorLabels = (graph: Graph, tree: TreeControls) => {
  const { nodeIdToBalanceFactor: nodeToBf } = tree;

  const MAP_COLOR: Record<number, Color> = {
    [-1]: colors.YELLOW_500,
    [0]: colors.GREEN_600,
    [1]: colors.YELLOW_500,
  };

  const UNBALANCED_COLOR = colors.RED_600;

  const colorGetter = (nodeId: GNode['id']) => {
    return MAP_COLOR[nodeToBf.value.get(nodeId) ?? 0] ?? UNBALANCED_COLOR;
  };

  const { label, unlabel } = useNodeLabel(nodeToBf);
  const { color, uncolor } = useNodeColor(graph, colorGetter);

  const activate = () => {
    label();
    color();
  };

  const deactivate = () => {
    unlabel();
    uncolor();
  };

  return {
    activate,
    deactivate,
  };
};
