import type { GNode, Graph } from '@graph/types';
import colors from '@utils/colors';

import type { TreeControls } from '../useTree';
import { numberToColor } from './numberToColor';
import { useNodeColor } from '../../../graphs/themes/helpers/useNodeColor';
import { useNodeLabel } from '../../../graphs/themes/helpers/useNodeLabel';

export const useHeightLabels = (graph: Graph, tree: TreeControls) => {
  const { nodeIdToHeight } = tree;

  const mapColor = numberToColor({
    range: [0, 5],
    color: [colors.GREEN_400, colors.GREEN_700],
  });

  const colorGetter = (nodeId: GNode['id']) =>
    mapColor(nodeIdToHeight.value.get(nodeId) ?? 0);

  const { label, unlabel } = useNodeLabel(nodeIdToHeight);
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
