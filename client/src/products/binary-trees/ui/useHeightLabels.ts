import type { GNode, Graph } from '@graph/types';
import type { TreeControls } from '../useTree';
import { useNodeLabel } from './useNodeLabel';
import { useNodeColor } from './useNodeColor';
import { numberToColor } from './numberToColor';
import colors from '@utils/colors';

export const useHeightLabels = (graph: Graph, tree: TreeControls) => {
  const { nodeIdToHeight } = tree;

  const mapColor = numberToColor({
    range: [0, 5],
    color: [colors.GREEN_400, colors.GREEN_700],
  });

  const colorGetter = (nodeId: GNode['id']) =>
    mapColor(nodeIdToHeight.value.get(nodeId) ?? 0);

  const { label, unlabel } = useNodeLabel(graph, nodeIdToHeight);
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
