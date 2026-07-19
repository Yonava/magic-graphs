import { Graph } from '@graph/create-graph/index';
import { FocusPlugin } from '@graph/plugins/focus/types';
import { CoreEdge, CoreNode } from '@graph/primitives/types';

import { ref } from 'vue';

type FocusGraph = Graph<{
  plugins: [FocusPlugin];
  presetName: string;
}>;

export const useFocus = (graph: FocusGraph) => {
  const focusedNodes = ref<CoreNode[]>([...graph.focus.focusedNodes()]);
  const focusedEdges = ref<CoreEdge[]>([...graph.focus.focusedEdges()]);
  graph.events.subscribe('onFocusChange', () => {
    focusedNodes.value = [...graph.focus.focusedNodes()];
    focusedEdges.value = [...graph.focus.focusedEdges()];
  });
  return {
    ...graph.focus,
    focusedNodes,
    focusedEdges,
  };
};
