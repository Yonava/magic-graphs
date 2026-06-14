import colors from '@magic/utils/colors';

import { ref } from 'vue';

import type { Graph } from '../../shared/useGraphWithCanvas.ts';

const TARGET_COLOR = colors.AMBER_600;

export const useTargetNodeColor = (graph: Graph) => {
  const { set, removeAll } = graph.canvas.theme.createLayer('tree');

  const targetNodeId = ref<string>();

  const colorNode = ({ id }: { id: string }) => {
    if (!targetNodeId.value) return;

    if (graph.focus.isFocused(id)) return;
    if (id === targetNodeId.value) return TARGET_COLOR;
  };

  const activate = (nodeId?: string) => {
    if (nodeId) targetNodeId.value = nodeId;
    set('node.default.borderColor', colorNode);
    set('nodeAnchor.default.color', colorNode);
  };

  const deactivate = () => {
    targetNodeId.value = undefined;
    removeAll();
  };

  return {
    activate,
    deactivate,
    targetNodeId,
  };
};
