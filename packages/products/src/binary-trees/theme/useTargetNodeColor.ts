import { useTheme } from '@magic/graph/themes/useTheme';
import type { GNode, Graph } from '@magic/graph/types';
import colors from '@utils/colors';

import { ref } from 'vue';

const TARGET_COLOR = colors.AMBER_600;

export const useTargetNodeColor = (graph: Graph) => {
  const { setTheme, removeAllThemes } = useTheme(graph, 'tree');

  const targetNodeId = ref<GNode['id']>();

  const colorNode = (node: GNode) => {
    if (!targetNodeId.value) return;

    if (graph.focus.isFocused(node.id)) return;
    if (node.id === targetNodeId.value) return TARGET_COLOR;
  };

  const activate = (nodeId?: GNode['id']) => {
    if (nodeId) targetNodeId.value = nodeId;
    setTheme('nodeBorderColor', colorNode);
    setTheme('nodeAnchorColor', colorNode);
  };

  const deactivate = () => {
    targetNodeId.value = undefined;
    removeAllThemes();
  };

  return {
    activate,
    deactivate,
    targetNodeId,
  };
};
