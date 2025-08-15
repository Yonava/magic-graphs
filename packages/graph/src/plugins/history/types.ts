import type { GEdge, GNode } from '../../types';

import type { FocusOption } from '../../base/types';

/**
 * affected items that are nodes and have been moved
 */
export type GNodeMoveRecord = {
  graphType: 'node';
  data: {
    id: string;
    from: { x: number; y: number };
    to: { x: number; y: number };
  };
};

export type GEdgeLabelEditRecord = {
  graphType: 'edge';
  data: {
    id: GEdge['id'];
    from: GEdge['label'];
    to: GEdge['label'];
  };
};

/**
 * affected items that are nodes
 */
export type GNodeRecord = {
  graphType: 'node';
  data: GNode;
};

/**
 * affected items that are edges
 */
export type GEdgeRecord = {
  graphType: 'edge';
  data: GEdge;
};

/**
 * a record indicating an item in the graph was added or removed
 */
export type AddRemoveRecord = {
  /**
   * the action that was taken in order to create this record.
   */
  action: 'add' | 'remove';
  /**
   * the items that were affected by the action.
   */
  affectedItems: (GNodeRecord | GEdgeRecord)[];
};

/**
 * a record indicating an item in the graph was moved
 */
export type MoveRecord = {
  /**
   * the action that was taken in order to create this record.
   */
  action: 'move';
  /**
   * the items that were affected by the action.
   */
  affectedItems: GNodeMoveRecord[];
};

/**
 * a record indicating an item in the graph had its label edited
 */
export type EditRecord = {
  /**
   * the action that was taken in order to create this record.
   */
  action: 'edit';
  /**
   * the items that were affected by the action.
   */
  affectedItems: GEdgeLabelEditRecord[];
};

/**
 * a record indicating the graph state was *REPLACED* with a new state
 */
export type LoadRecord = {
  /**
   * the action that was taken in order to create this record.
   */
  action: 'load';
  /**
   * state that replaced the current state. Also known as new state
   */
  affectedItems: (GNodeRecord | GEdgeRecord)[];
  /**
   * the state of the graph before replacement
   */
  previousState: {
    nodes: GNodeRecord[];
    edges: GEdgeRecord[];
  };
};

/**
 * a record of an event stored in the history stack of a graph.
 * provides for undo/redo functionality
 */
export type HistoryRecord =
  | AddRemoveRecord
  | MoveRecord
  | EditRecord
  | LoadRecord;

export type UndoHistoryOptions = FocusOption;

export const DEFAULT_UNDO_HISTORY_OPTIONS: UndoHistoryOptions = {
  focus: true,
};

export type RedoHistoryOptions = FocusOption;

export const DEFAULT_REDO_HISTORY_OPTIONS: RedoHistoryOptions = {
  focus: true,
};
