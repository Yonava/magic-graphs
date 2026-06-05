import { computed, ref } from 'vue';

import { BaseEventMap } from '../../base/events.ts';
import { BaseGraph } from '../../base/types.ts';
import { EventHub, createEventHub } from '../../events/createEventHub.ts';
import { mergeEventHubs } from '../../events/mergeEventHubs.ts';
import { MAX_HISTORY } from './constants.ts';
import { HistoryEventMap, createHistoryEventRegistry } from './events.ts';
import { GraphWithHistory } from './types.ts';

export const useHistoryPlugin = <
  TransactionWrapperOptions,
  EventMap extends BaseEventMap,
  Plugins,
>(
  graph: BaseGraph<TransactionWrapperOptions, EventMap, Plugins>,
): GraphWithHistory<TransactionWrapperOptions, EventMap, Plugins> => {
  const historyBus = createHistoryEventRegistry();
  const historyHub: EventHub<HistoryEventMap> = createEventHub(historyBus);
  const events = mergeEventHubs(
    historyHub,
    // casting because graph.events could be arbitrarily due to it being stuffed with other events
    // from plugins upstream
    graph.events as EventHub<BaseEventMap>,
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
    ...graph,
    // TODO add actions overrides!
    actions: graph.actions as GraphWithHistory<
      TransactionWrapperOptions,
      EventMap,
      Plugins
    >['actions'],
    events,
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
