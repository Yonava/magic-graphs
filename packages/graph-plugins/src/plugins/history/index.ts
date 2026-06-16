import { CoreEventMap } from '@magic/graph/core/events';
import { createEventHub } from '@magic/graph/events/createEventHub';
import { mergeEventHubs } from '@magic/graph/events/mergeEventHubs';
import { GraphPlugin } from '@magic/graph/plugins/types';

import { computed, ref } from 'vue';

import { MAX_HISTORY } from './constants.ts';
import { HistoryEventMap, createHistoryEventRegistry } from './events.ts';
import { HistoryPluginControls } from './types.ts';

export const HISTORY_EVENT_ID = 'history';

type HistoryPlugin = GraphPlugin<{
  controls: HistoryPluginControls;
  events: HistoryEventMap;
}>;

export const history: HistoryPlugin = (graph, graphEventHub) => {
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
    // actions: graph.actions as GraphWithHistory<
    //   TransactionWrapperOptions,
    //   EventMap,
    //   Plugins
    // >['actions'],
    events,
    controls: {
      history: {
        /**
         * undoes the last action and moves it to the redo stack
         */
        undo,
        /**
         * redoes the last undone action and moves it to the undo stack
         */
        redo,
        /**
         * true if there are actions to undo
         */
        canUndo: computed(() => undoStack.value.length > 0),
        /**
         * true if there are actions to redo
         */
        canRedo: computed(() => redoStack.value.length > 0),
        /**
         * stores past actions to revert
         */
        undoStack,
        /**
         * stores undone actions to reapply
         */
        redoStack,
        /**
         * clears the undo and redo stacks
         */
        clearHistory,
      },
    },
  };
};
