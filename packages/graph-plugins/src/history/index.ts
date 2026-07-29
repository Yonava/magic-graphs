import { createEventHub } from '@graph/primitives/events/createEventHub';

import { MAX_HISTORY } from './constants.ts';
import { createHistoryEventRegistry } from './events.ts';
import { HistoryPlugin, HistoryRecord } from './types.ts';

export const history: HistoryPlugin = ({ actions, getters, finalActions }) => {
  const historyRegistry = createHistoryEventRegistry();
  const historyEventHub = createEventHub(historyRegistry);

  let undoStack: HistoryRecord[] = [];
  let redoStack: HistoryRecord[] = [];

  const addToUndoStack = (record: HistoryRecord) => {
    undoStack.push(record);
    if (undoStack.length > MAX_HISTORY) {
      undoStack.shift();
    }
    historyEventHub.emit('onHistoryChanged');
  };

  const addToRedoStack = (record: HistoryRecord) => {
    redoStack.push(record);
    if (redoStack.length > MAX_HISTORY) {
      redoStack.shift();
    }
    historyEventHub.emit('onHistoryChanged');
  };

  const undo = () => {
    const record = undoStack.pop();
    if (!record) return;

    addToRedoStack(record);
    record.inverse();
    historyEventHub.emit('onUndo');

    return record;
  };

  const redo = () => {
    const record = redoStack.pop();
    if (!record) return;

    addToUndoStack(record);
    record.forward();
    historyEventHub.emit('onRedo');

    return record;
  };

  const clearHistory = () => {
    undoStack = [];
    redoStack = [];
    historyEventHub.emit('onHistoryChanged');
  };

  return {
    name: 'history',
    getters,
    actions: {
      ...actions,
      addNode: (options) => {
        const node = actions.addNode(options);
        const addToHistory = options.history ?? true;
        if (addToHistory) {
          const stackOptions = { ...options, ...node, history: false };
          addToUndoStack({
            forward: () => finalActions.addNode(stackOptions),
            inverse: () => finalActions.removeNode(stackOptions),
          });
        }
        return node;
      },
    },
    controls: {
      undo,
      redo,
      canUndo: () => undoStack.length > 0,
      canRedo: () => redoStack.length > 0,
      undoStack,
      redoStack,
      clear: clearHistory,
      events: historyEventHub,
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
