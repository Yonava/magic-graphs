import type { Coordinate } from '@magic/shapes/types/utility';
import { debounce } from '@magic/utils/debounce';

import { computed, ref } from 'vue';

import type { BaseGraph } from '../../base/index.ts';
import type { HistoryOption } from '../../base/types.ts';
import type { GraphState } from '../../collab/types.ts';
import type { GEdge, GNode } from '../../types.ts';
import {
  DEFAULT_REDO_HISTORY_OPTIONS,
  DEFAULT_UNDO_HISTORY_OPTIONS,
} from './types.ts';
import type {
  GNodeMoveRecord,
  HistoryRecord,
  RedoHistoryOptions,
  UndoHistoryOptions,
} from './types.ts';

/**
 * the max number of history records to keep in the undo and redo stacks
 */
const MAX_HISTORY = 100;

/**
 * the minimum distance a node must be moved to be considered a move action
 * that should be added to the history stack
 */
const MIN_DISTANCE = 3;

export const useHistory = (graph: BaseGraph) => {
  const undoStack = ref<HistoryRecord[]>([]);
  const redoStack = ref<HistoryRecord[]>([]);

  const addToUndoStack = (record: HistoryRecord) => {
    undoStack.value.push(record);
    if (undoStack.value.length > MAX_HISTORY) {
      undoStack.value.shift();
    }
  };

  const addToRedoStack = (record: HistoryRecord) => {
    redoStack.value.push(record);
    if (redoStack.value.length > MAX_HISTORY) {
      redoStack.value.shift();
    }
  };

  const undo = (options: Partial<UndoHistoryOptions> = {}) => {
    const record = undoStack.value.pop();
    if (!record) return;

    addToRedoStack(record);
    undoHistoryRecord(record);
    graph.emit('onUndo', record, {
      ...DEFAULT_UNDO_HISTORY_OPTIONS,
      ...options,
    });

    return record;
  };

  const redo = (options: Partial<RedoHistoryOptions> = {}) => {
    const record = redoStack.value.pop();
    if (!record) return;

    addToUndoStack(record);
    redoHistoryRecord(record);
    graph.emit('onRedo', record, {
      ...DEFAULT_REDO_HISTORY_OPTIONS,
      ...options,
    });

    return record;
  };

  const undoHistoryRecord = (record: HistoryRecord) => {};
  const redoHistoryRecord = (record: HistoryRecord) => {};

  const clearHistory = () => {
    undoStack.value = [];
    redoStack.value = [];
  };

  return {
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
     * adds a record to the undo stack
     */
    addToUndoStack,
    /**
     * adds a record to the redo stack
     */
    addToRedoStack,

    /**
     * clears the undo and redo stacks
     */
    clearHistory,
  };
};

export type GraphHistoryControls = ReturnType<typeof useHistory>;
export type GraphHistoryPlugin = {
  /**
   * controls for undoing and redoing actions in the graph
   * such as adding, removing, moving, and editing nodes and edges
   */
  history: GraphHistoryControls;
};
