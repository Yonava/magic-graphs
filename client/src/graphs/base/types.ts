/**
 * contains type defs and option defaults for base graph apis
 * such as addNode, removeNode, etc.
 */
import type { SchemaItem } from '@graph/types';
import type { Coordinate } from '@shape/types/utility';

import type { DeepReadonly } from 'vue';

export type FocusOption = {
  /**
   * whether to focus the added item/s
   */
  focus: boolean;
};

export type HistoryOption = {
  /**
   * whether to record this action in the history stack
   */
  history: boolean;
};

export type BroadcastOption = {
  /**
   * whether to broadcast this action to connected collaborators
   */
  broadcast: boolean;
};

export type PersistOption = {
  /**
   * whether this action will be tracked in local storage
   */
  persist: boolean;
};

export type AnimateOption = {
  /**
   * whether to animate this action
   */
  animate: boolean;
};

export type AddNodeOptions = FocusOption &
  BroadcastOption &
  HistoryOption &
  AnimateOption;

export const ADD_NODE_OPTIONS_DEFAULTS: AddNodeOptions = {
  broadcast: true,
  focus: true,
  history: true,
  animate: false,
};

export const BULK_ADD_NODE_OPTIONS_DEFAULTS: AddNodeOptions = {
  broadcast: true,
  focus: false,
  history: true,
  animate: false,
};

export type RemoveNodeOptions = BroadcastOption & HistoryOption;

export const REMOVE_NODE_OPTIONS_DEFAULTS: RemoveNodeOptions = {
  broadcast: true,
  history: true,
};

export type AddEdgeOptions = FocusOption &
  BroadcastOption &
  HistoryOption &
  AnimateOption;

export const ADD_EDGE_OPTIONS_DEFAULTS: AddEdgeOptions = {
  broadcast: true,
  focus: false,
  history: true,
  animate: false,
};

export const BULK_ADD_EDGE_OPTIONS_DEFAULTS: AddEdgeOptions = {
  broadcast: false,
  focus: false,
  history: false,
  animate: true,
};

export const LOAD_GRAPH_OPTIONS_DEFAULTS: HistoryOption = {
  history: true,
};

export type RemoveEdgeOptions = BroadcastOption & HistoryOption;

export const REMOVE_EDGE_OPTIONS_DEFAULTS: RemoveEdgeOptions = {
  broadcast: true,
  history: true,
};

export type MoveNodeOptions = BroadcastOption;

export const MOVE_NODE_OPTIONS_DEFAULTS: MoveNodeOptions = {
  broadcast: true,
};

export const BULK_MOVE_NODE_OPTIONS_DEFAULTS: MoveNodeOptions = {
  broadcast: true,
};

export type EditEdgeLabelOptions = BroadcastOption & HistoryOption;

export const EDIT_EDGE_LABEL_OPTIONS_DEFAULTS: EditEdgeLabelOptions = {
  broadcast: true,
  history: true,
};

/**
 * defaults for newly added edges
 */
export const ADD_EDGE_DEFAULTS = {
  label: '',
} as const;

/**
 * stores info about the last mouse position on the graph
 */
export type GraphAtMousePosition = {
  /**
   * coordinates translated to the graph's coordinate system
   */
  coords: Coordinate;
  /**
   * the schema items at the coordinates of the mouse
   */
  items: SchemaItem[];
};

/**
 * a standard mouse event along with extra graph related info
 * regarding the mouse position
 */
export type GraphMouseEvent = DeepReadonly<GraphAtMousePosition> & {
  /**
   * the native browser event that triggered this graph event
   */
  event: MouseEvent;
};
