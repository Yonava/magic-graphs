import colors from '@core/utils/colors';

import { ref } from 'vue';

import type { Graph } from '../../shared/useGraphWithCanvas.ts';

const TARGET_COLOR = colors.AMBER_600;

export const useTargetNodeColor = (graph: Graph) => {
  const canvas = graph.canvas.theme.createLayer('tree');
  const anchors = graph.anchors.theme.createLayer('tree');

  const targetNodeId = ref<string>();

  const colorNode = ({ id }: { id: string }) => {
    if (!targetNodeId.value) return;

    if (graph.focus.isFocused(id)) return;
    if (id === targetNodeId.value) return TARGET_COLOR;
  };

  const activate = (nodeId?: string) => {
    if (nodeId) targetNodeId.value = nodeId;
    canvas.set('node.default.border.color', colorNode);
    anchors.set('anchors.default.color', colorNode);
  };

  const deactivate = () => {
    targetNodeId.value = undefined;
    canvas.removeAll();
    anchors.removeAll();
  };

  return {
    activate,
    deactivate,
    targetNodeId,
  };
};
