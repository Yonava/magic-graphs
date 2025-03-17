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

  // super workaround for the avl tree storing heights starting at 1
  const nodeIdToHeightMinus1 = computed(() => {
    const outMap = new Map<string, number>()
    for (const [key, val] of nodeIdToHeight.value) {
      outMap.set(key, val - 1)
    }
    return outMap
  })

  const { label, unlabel } = useNodeLabel(graph, nodeIdToHeightMinus1);
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
