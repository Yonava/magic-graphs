import type { GNode } from '@magic/graph/types';
import colors from '@magic/utils/colors';

import { useNodeColor } from '../../shared/graph-theme-helpers/useNodeColor.ts';
import { useNodeLabel } from '../../shared/graph-theme-helpers/useNodeLabel.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import type { TreeControls } from '../useTree.ts';
import { numberToColor } from './numberToColor.ts';

export const useHeightLabels = (graph: Graph, tree: TreeControls) => {
  const { nodeIdToHeight } = tree;

  const mapColor = numberToColor({
    range: [0, 5],
    color: [colors.GREEN_400, colors.GREEN_700],
  });

  const colorGetter = (nodeId: GNode['id']) =>
    mapColor(nodeIdToHeight.value.get(nodeId) ?? 0);

  const { label, unlabel } = useNodeLabel(graph, nodeIdToHeight, 'height-text');
  const { color, uncolor } = useNodeColor(graph, colorGetter, 'height-color');

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
