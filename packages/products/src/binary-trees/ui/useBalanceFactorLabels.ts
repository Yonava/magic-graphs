import type { GNode } from '@magic/graph/types';
import colors from '@magic/utils/colors';
import type { Color } from '@magic/utils/colors';

import { useNodeColor } from '../../shared/graph-theme-helpers/useNodeColor.ts';
import { useNodeLabel } from '../../shared/graph-theme-helpers/useNodeLabel.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import type { TreeControls } from '../useTree.ts';

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

  const { label, unlabel } = useNodeLabel(
    graph,
    nodeToBf,
    'balance-factor-text',
  );
  const { color, uncolor } = useNodeColor(
    graph,
    colorGetter,
    'balance-factor-color',
  );

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
