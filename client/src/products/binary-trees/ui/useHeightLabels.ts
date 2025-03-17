import type { GNode, Graph } from '@graph/types';
import type { TreeControls } from '../useTree';
import { useNodeLabel } from './useNodeLabel';
import { useNodeColor } from './useNodeColor';
import { numberToColor } from './numberToColor';
import colors from '@utils/colors';
import { computed } from 'vue';

export const useHeightLabels = (graph: Graph, tree: TreeControls) => {
  const { nodeIdToHeight } = tree;

  const minAndMaxHeight = computed(() => {
    const heights = Array.from(nodeIdToHeight.value.values())
    return [Math.min(...heights), Math.max(...heights)] as const
  })

  const mapColor = computed(() => numberToColor({
    range: minAndMaxHeight.value,
    color: [colors.GREEN_400, colors.GREEN_700],
  }));

  const colorGetter = (nodeId: GNode['id']) =>
    mapColor.value(nodeIdToHeight.value.get(nodeId) ?? 0);

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
