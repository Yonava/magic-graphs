import { ref } from 'vue';
import type { Graph } from '@graph/types';

type GraphState = {
  nodes: Graph['nodes']['value'];
  edges: Graph['edges']['value'];
};

export const useTreeHistory = (graph: Graph) => {
  const undoStack = ref<GraphState[]>([]);
  const redoStack = ref<GraphState[]>([]);

  const redo = () => {
    if (redoStack.value.length === 0) return;
    const state = redoStack.value.pop();
    if (!state) return;
    undoStack.value.push(state);
    graph.load(state);
  };

  const undo = () => {
    if (undoStack.value.length === 0) return;
    const state = undoStack.value.pop();
    if (!state) return;
    redoStack.value.push(state);
    graph.load(state);
  };

  return {
    undo,
    redo,

    undoStack,
    redoStack,
  };
};
