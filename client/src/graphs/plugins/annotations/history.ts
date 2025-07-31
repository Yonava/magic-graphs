import { computed, ref } from 'vue';
import type { Ref } from 'vue';

import type { Annotation } from './types';

type AnnotationHistoryRecord = {
  action: 'add' | 'remove';
  annotations: Annotation[];
};

const MAX_HISTORY_LENGTH = 100;

export const useAnnotationHistory = (annotations: Ref<Annotation[]>) => {
  const undoStack = ref<AnnotationHistoryRecord[]>([]);
  const redoStack = ref<AnnotationHistoryRecord[]>([]);

  const addToUndoStack = (record: AnnotationHistoryRecord) => {
    undoStack.value.push(record);
    if (undoStack.value.length > MAX_HISTORY_LENGTH) {
      undoStack.value.shift();
    }
  };

  const addToRedoStack = (record: AnnotationHistoryRecord) => {
    redoStack.value.push(record);
    if (redoStack.value.length > MAX_HISTORY_LENGTH) {
      redoStack.value.shift();
    }
  };

  const undo = () => {
    const record = undoStack.value.pop();
    if (!record) return;
    const { action, annotations: undoneAnnotations } = record;
    const ids = undoneAnnotations.map(({ id }) => id);
    if (action === 'add') {
      annotations.value = annotations.value.filter(({ id: annotationId }) => {
        return !ids.includes(annotationId);
      });
    } else if (action === 'remove') {
      annotations.value.push(...undoneAnnotations);
    }
    redoStack.value.push(record);
  };

  const redo = () => {
    const record = redoStack.value.pop();
    if (!record) return;
    const { action, annotations: redoneAnnotations } = record;
    const ids = redoneAnnotations.map(({ id }) => id);
    if (action === 'add') {
      annotations.value.push(...redoneAnnotations);
    } else if (action === 'remove') {
      annotations.value = annotations.value.filter(({ id: annotationId }) => {
        return !ids.includes(annotationId);
      });
    }
    undoStack.value.push(record);
  };

  const clearHistory = () => {
    undoStack.value = [];
    redoStack.value = [];
  };

  return {
    clearHistory,
    undo,
    redo,
    addToUndoStack,
    addToRedoStack,

    canUndo: computed(() => undoStack.value.length !== 0),
    canRedo: computed(() => redoStack.value.length !== 0),
  };
};
