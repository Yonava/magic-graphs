import { computed, ref } from 'vue';

import { BaseTransactionWrapperOptions } from '../../base/actions/types.ts';
import { BaseGraphEventMap } from '../../base/events.ts';
import { BaseGraph } from '../../base/types.ts';
import { EventHub, createEventHub } from '../../events/createEventHub.ts';
import { mergeEventHubs } from '../../events/mergeEventHubs.ts';
import { MAX_HISTORY } from './constants.ts';
import { HistoryGraphEventMap, createHistoryGraphEventBus } from './events.ts';
import { GraphWithHistory } from './types.ts';

export const useHistoryPlugin = <
  TransactionWrapperOptions extends BaseTransactionWrapperOptions,
  GraphEventMap extends BaseGraphEventMap,
>(
  graph: BaseGraph<TransactionWrapperOptions, GraphEventMap>,
): GraphWithHistory<TransactionWrapperOptions, GraphEventMap> => {
  const historyBus = createHistoryGraphEventBus();
  const historyHub: EventHub<HistoryGraphEventMap> = createEventHub(historyBus);
  const events = mergeEventHubs(
    historyHub,
    // casting because graph.events could be arbitrarily due to it being stuffed with other events
    // from plugins upstream
    graph.events as EventHub<BaseGraphEventMap>,
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
    events.emit('onUndo', record);

    return record;
  };

  const redo = () => {
    const record = redoStack.value.pop();
    if (!record) return;

    addToUndoStack(record);
    redoHistoryRecord(record);
    events.emit('onRedo', record);

    return record;
  };

  const undoHistoryRecord = (record: any) => {};
  const redoHistoryRecord = (record: any) => {};

  const clearHistory = () => {
    undoStack.value = [];
    redoStack.value = [];
  };

  return {
    ...graph,
    // TODO add actions overrides
    actions: graph.actions,
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
  };
};
