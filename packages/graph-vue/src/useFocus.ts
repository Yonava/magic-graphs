import { FocusControls } from '@graph/plugins/focus/types';
import { CoreEdge, CoreNode } from '@graph/primitives/types';

import { ref } from 'vue';

export const useFocus = (focus: FocusControls) => {
  const focusedNodes = ref<CoreNode[]>([...focus.focusedNodes()]);
  const focusedEdges = ref<CoreEdge[]>([...focus.focusedEdges()]);
  focus.events.subscribe('onFocusChange', () => {
    focusedNodes.value = [...focus.focusedNodes()];
    focusedEdges.value = [...focus.focusedEdges()];
  });
  return {
    ...focus,
    focusedNodes,
    focusedEdges,
  };
};
