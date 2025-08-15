import type { GNode, Graph } from '@magic/graph/types';
import colors from '@magic/utils/colors';

import type { TreeControls } from '../useTree';
import { numberToColor } from './numberToColor';
import { useNodeColor } from '@magic/graph/themes/helpers/useNodeColor';
import { useNodeLabel } from '@magic/graph/themes/helpers/useNodeLabel';

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
