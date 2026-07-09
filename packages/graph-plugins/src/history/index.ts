import { CoreEventMap } from '@graph/core/events';
import { createEventHub } from '@graph/primitives/events/createEventHub';
import { mergeEventHubs } from '@graph/primitives/events/mergeEventHubs';

import { MAX_HISTORY } from './constants.ts';
import { HistoryEventMap, createHistoryEventRegistry } from './events.ts';
import { HistoryPlugin } from './types.ts';

export const history: HistoryPlugin = ({
  events: graphEventHub,
  actions,
  getters,
}) => {
  const historyRegistry = createHistoryEventRegistry();
  const historyEventHub = createEventHub(historyRegistry);
  const events = mergeEventHubs<HistoryEventMap, CoreEventMap>(
    historyEventHub,
    graphEventHub,
  );

  let undoStack: any[] = [];
  let redoStack: any[] = [];

  const addToUndoStack = (record: any) => {
    undoStack.push(record);
    if (undoStack.length > MAX_HISTORY) {
      undoStack.shift();
    }
  };

  const addToRedoStack = (record: any) => {
    redoStack.push(record);
    if (redoStack.length > MAX_HISTORY) {
      redoStack.shift();
    }
  };

  const undo = () => {
    const record = undoStack.pop();
    if (!record) return;

    addToRedoStack(record);
    undoHistoryRecord(record);
    events.emit('onUndo');

    return record;
  };

  const redo = () => {
    const record = redoStack.pop();
    if (!record) return;

    addToUndoStack(record);
    redoHistoryRecord(record);
    events.emit('onRedo');

    return record;
  };

  const undoHistoryRecord = (record: any) => {};
  const redoHistoryRecord = (record: any) => {};

  const clearHistory = () => {
    undoStack = [];
    redoStack = [];
  };

  return {
    name: 'history',
    getters,
    actions: {
      ...actions,
      addNode: (options) => {
        return actions.addNode(options);
      },
    },
    events,
    controls: {
      undo,
      redo,
      canUndo: () => undoStack.length > 0,
      canRedo: () => redoStack.length > 0,
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
  };
};
