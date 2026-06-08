import { Fraction } from 'mathjs';

import {
  DEFAULT_LOCAL_STORAGE_SETTINGS,
  LocalStorageGraphSettings,
} from '../plugins/localStorage/settings.ts';
import type { GEdge, GNode } from '../types.ts';

/**
 * BASE GRAPH SETTINGS
 */
export type BaseGraphSettings = {
  /**
   * whether graph is weighted, if true, all individual {@link GEdge.weight | edge weights} are ignored and are treated as if they were `new Fraction(1)`
   * @default true
   */
  isGraphWeighted: boolean;
  /**
   * whether graph is directed, if true, all {@link GEdge | edges} are directed, else all {@link GEdge | edges} are undirected
   * @default true
   */
  isGraphDirected: boolean;
  /**
   * whether {@link GEdge.label | edge labels} should be editable
   * @default true
   */
  edgeLabelsEditable: boolean;
  /**
   * a setter for {@link GEdge.weight | edge weight} - takes the user inputted string and returns a fraction that will
   * be set as the edge weight or returns undefined if the edge label should not be set
   */
  edgeInputToWeight: (input: string) => Fraction | undefined;
  /**
   * a function that returns the {@link GNode.label | label} for a node when a new node is created.
   * if null, new nodes will be generated alphabetically: A, B, C, ... Z, AA, AB, ...
   * @default null
   */
  newNodeLabelGetter: null | (() => string);
};

export const DEFAULT_BASE_SETTINGS: BaseGraphSettings = {
  isGraphWeighted: true,
  edgeLabelsEditable: true,
  edgeInputToWeight: (input: string) => {
    // fraction throws an error if the input cannot be parsed or
    // is a divide by zero operation
    try {
      return new Fraction(input);
    } catch {}
  },
  newNodeLabelGetter: null,
  isGraphDirected: true,
};

/**
 * INTERACTIVE GRAPH SETTINGS
 */
export type InteractiveGraphSettings = {
  /**
   * whether the user can create, edit and delete nodes and edges.
   * when disabled, also disables graph settings: `nodeAnchors` and `edgeLabelsEditable`
   * @default true
   */
  interactive: boolean;
  /**
   * the default {@link GEdge.weight | weight} assigned to edges when created using the UI
   * @default new Fraction(1)
   */
  userAddedDefaultEdgeWeight: () => Fraction;
  /**
   * whether to allow self loops.
   * relevant on directed graphs where a node can have an edge to itself
   * @default false
   */
  userAddedEdgeRuleNoSelfLoops: boolean;
  /**
   * whether to allow only one edge per path between two nodes.
   * relevant on directed graphs where multiple edges can exist between two nodes
   * @default false
   */
  userAddedEdgeRuleOneEdgePerPath: boolean;
};

export const DEFAULT_INTERACTIVE_SETTINGS: InteractiveGraphSettings = {
  interactive: true,
  userAddedDefaultEdgeWeight: () => new Fraction(1),
  userAddedEdgeRuleNoSelfLoops: false,
  userAddedEdgeRuleOneEdgePerPath: false,
};

export type ShortcutGraphSettings = {
  /**
   * whether to enable keyboard shortcuts for the graph
   * @default true
   */
  shortcuts: boolean;
  /**
   * BINDING: Mac: Meta+Z, Windows: Control+Z
   *
   * if false, the undo shortcut will be disabled, if set to a function,
   * the function will be called when the undo shortcut is pressed
   * @default true
   */
  shortcutUndo: boolean | (() => void);
  /**
   * BINDING: Mac: Shift+Meta+Z, Windows: Shift+Control+Z
   *
   * if false, the redo shortcut will be disabled, if set to a function,
   * the function will be called when the redo shortcut is pressed
   * @default true
   */
  shortcutRedo: boolean | (() => void);
  /**
   * BINDING: Mac: Meta+A, Windows: Control+A
   *
   * if false, the select all shortcut will be disabled, if set to a function,
   * the function will be called when the select all shortcut is pressed
   * @default true
   */
  shortcutSelectAll: boolean | (() => void);
  /**
   * BINDING: Mac: Backspace, Windows: Backspace
   *
   * if false, the delete shortcut will be disabled, if set to a function,
   * the function will be called when the delete shortcut is pressed
   * @default true
   */
  shortcutDelete: boolean | (() => void);
  /**
   * BINDING: Mac: Escape, Windows: Escape
   *
   * if false, the escape shortcut will be disabled, if set to a function,
   * the function will be called when the escape shortcut is pressed
   * @default true
   */
  shortcutEscape: boolean | (() => void);
  /**
   * BINDING: Mac: =, Windows: =
   *
   * if false, the zoom in shortcut will be disabled, if set to a function,
   * the function will be called when the zoom in shortcut is pressed
   * @default true
   */
  shortcutZoomIn: boolean | (() => void);

  /**
   * BINDING: Mac: -, Windows: -
   *
   * if false, the zoom out shortcut will be disabled, if set to a function,
   * the function will be called when the zoom out shortcut is pressed
   * @default true
   */
  shortcutZoomOut: boolean | (() => void);
};

export const DEFAULT_SHORTCUT_SETTINGS: ShortcutGraphSettings = {
  shortcuts: true,
  shortcutUndo: true,
  shortcutRedo: true,
  shortcutSelectAll: true,
  shortcutDelete: true,
  shortcutEscape: true,
  shortcutZoomIn: true,
  shortcutZoomOut: true,
};

/**
 * represents all settings on a graph instance
 */
export type GraphSettings = BaseGraphSettings &
  InteractiveGraphSettings &
  LocalStorageGraphSettings &
  ShortcutGraphSettings;

/**
 * the default settings for a graph instance
 */
export const DEFAULT_GRAPH_SETTINGS = {
  ...DEFAULT_BASE_SETTINGS,
  ...DEFAULT_INTERACTIVE_SETTINGS,
  ...DEFAULT_LOCAL_STORAGE_SETTINGS,
  ...DEFAULT_SHORTCUT_SETTINGS,
} as const satisfies GraphSettings;
