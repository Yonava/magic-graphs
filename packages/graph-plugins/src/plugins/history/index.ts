import { CoreEventMap } from '@magic/graph/core/events';
import { createEventHub } from '@magic/graph/events/createEventHub';
import { mergeEventHubs } from '@magic/graph/events/mergeEventHubs';

import { computed, ref } from 'vue';

import { MAX_HISTORY } from './constants.ts';
import { HistoryEventMap, createHistoryEventRegistry } from './events.ts';
import { HistoryPlugin } from './types.ts';

export const history: HistoryPlugin = (
  controls,
  graphEventHub,
  actions,
  getters,
) => {
  const historyRegistry = createHistoryEventRegistry();
  const historyEventHub = createEventHub(historyRegistry);
  const events = mergeEventHubs<HistoryEventMap, CoreEventMap>(
    historyEventHub,
    graphEventHub,
  );

  const undoStack = ref<any[]>([]);
  const redoStack = ref<any[]>([]);

  const addToUndoStack = (record: any) => {
    undoStack.value.push(record);
    if (undoStack.value.length > MAX_HISTORY) {
      undoStack.value.shift();
    }
  };

  const addToRedoStack = (record: any) => {
    redoStack.value.push(record);
    if (redoStack.value.length > MAX_HISTORY) {
      redoStack.value.shift();
    }
  };

  const undo = () => {
    const record = undoStack.value.pop();
    if (!record) return;

    addToRedoStack(record);
    undoHistoryRecord(record);
    events.emit('onUndo');

    return record;
  };

  const redo = () => {
    const record = redoStack.value.pop();
    if (!record) return;

    addToUndoStack(record);
    redoHistoryRecord(record);
    events.emit('onRedo');

    return record;
  };

  const undoHistoryRecord = (record: any) => {};
  const redoHistoryRecord = (record: any) => {};

  const clearHistory = () => {
    undoStack.value = [];
    redoStack.value = [];
  };

  return {
    getters,
    actions: {
      ...actions,
      addNode: ({ history, x, id }) => {
        return actions.addNode({ id });
      },
    },
    events,
    controls: {
      history: {
        undo,
        redo,
        canUndo: computed(() => undoStack.value.length > 0),
        canRedo: computed(() => redoStack.value.length > 0),
        undoStack,
        redoStack,
        clearHistory,
        lifecycle: {
          enable: () => {
            console.warn('not implemented');
          },
          disable: () => {
            console.warn('not implemented');
          },
        },
      },
    },
  };
};
