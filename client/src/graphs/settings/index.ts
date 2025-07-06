import type { GraphAnimations } from '@graph/base/animations';
import type { SchemaItem, GNode, GEdge } from '@graph/types';
import type { DefineTimeline } from '@shape/animation/timeline/defineTimeline';
import { fractionToDecimal } from '@utils/fracDecConverter';
import type { DeepPartial } from 'ts-essentials';

/**
 * BASE GRAPH SETTINGS
 */
export type BaseGraphSettings = {
  /**
   * whether to display {@link GEdge.label | edge labels}
   * @default true
   */
  displayEdgeLabels: boolean;
  /**
   * whether {@link GEdge.label | edge labels} should be editable
   * @default true
   */
  edgeLabelsEditable: boolean;
  /**
   * a setter for {@link GEdge.label | edge labels} - takes the user inputted string and returns a string that will
   * be set as the edge label or returns undefined if the edge label should not be set
   * @default (input) => {
   * // tries converting the user input to a number
   * }
   */
  edgeInputToLabel: (input: string) => string | undefined;
  /**
   * a function that returns the {@link GNode.label | label} for a node when a new node is created.
   * if null, new nodes will be generated alphabetically: A, B, C, ... Z, AA, AB, ...
   * @default null
   */
  newNodeLabelGetter: null | (() => string);
  /**
   * whether the graph is directed, if true, all edges are directed, else all edges are undirected
   * @default true
   */
  isGraphDirected: boolean;
  /**
   * graph animation overrides, used to override the default animations for the graph
   *
   * ⚠️ NOT REACTIVE ⚠️ changes after the graph is created will not take effect.
   */
  animations: (defineTimeline: DefineTimeline) => DeepPartial<GraphAnimations>;
};

export const DEFAULT_BASE_SETTINGS: BaseGraphSettings = {
  displayEdgeLabels: true,
  edgeLabelsEditable: true,
  edgeInputToLabel: (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const decimalNum = fractionToDecimal(trimmed)?.toFixed(2);
    if (decimalNum === 'Infinity') return '∞';
    else if (decimalNum === '-Infinity') return '-∞';
    else if (decimalNum === undefined && isNaN(Number(trimmed))) return;
    return decimalNum ?? trimmed;
  },
  newNodeLabelGetter: null,
  isGraphDirected: true,
  animations: () => ({}),
};

/**
 * FOCUS GRAPH SETTINGS
 */
export type FocusGraphSettings = {
  /**
   * if false, no {@link SchemaItem | item} on the graph can be focused
   * @default true
   */
  focusable: boolean;
  /**
   * a list of {@link SchemaItem.id | item ids} that cannot be focused
   * @default []
   */
  focusBlacklist: string[];
};

export const DEFAULT_FOCUS_SETTINGS: FocusGraphSettings = {
  focusable: true,
  focusBlacklist: [],
};

/**
 * DRAGGABLE GRAPH SETTINGS
 */
export type DraggableGraphSettings = {
  /**
   * whether the nodes on the graph are draggable
   * @default true
   */
  draggable: boolean;
};

export const DEFAULT_DRAGGABLE_SETTINGS: DraggableGraphSettings = {
  draggable: true,
};

/**
 * NODE ANCHOR GRAPH SETTINGS
 */
export type NodeAnchorGraphSettings = {
  /**
   * whether node anchors are enabled, if true, anchors will spawn around nodes while hovered
   * enabling edge creation
   * @default true
   */
  nodeAnchors: boolean;
};

export const DEFAULT_NODE_ANCHOR_SETTINGS: NodeAnchorGraphSettings = {
  nodeAnchors: true,
};

/**
 * MARQUEE GRAPH SETTINGS
 */
export type MarqueeGraphSettings = {
  /**
   * whether marquee selection is enabled
   * @default true
   */
  marquee: boolean;
  /**
   * the types of graph items that can be marquee-selected
   * @default ['node', 'edge']
   */
  marqueeSelectableGraphTypes: SchemaItem['graphType'][];
};

export const DEFAULT_MARQUEE_SETTINGS: MarqueeGraphSettings = {
  marquee: true,
  marqueeSelectableGraphTypes: ['node', 'edge'],
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
   * the default {@link GEdge.label | label} assigned to edges when created using the UI
   * @default '1'
   */
  userAddedEdgeLabel: string;
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
  userAddedEdgeLabel: '1',
  userAddedEdgeRuleNoSelfLoops: false,
  userAddedEdgeRuleOneEdgePerPath: false,
};

/**
 * PERSISTENT GRAPH SETTINGS
 */
export type PersistentGraphSettings = {
  /**
   * whether the nodes and edges of the graph will be saved in {@link localStorage | local storage}
   * @default true
   */
  persistent: boolean;
  /**
   * the key used for saving the graph in {@link localStorage | local storage}
   * @default "graph"
   */
  persistentStorageKey: string;
  /**
   * set of node or edge ids that will not be saved to localStorage
   * @default new Set()
   */
  persistentBlacklist: Set<GNode['id'] | GEdge['id']>;
};

export const DEFAULT_PERSISTENT_SETTINGS: PersistentGraphSettings = {
  persistent: true,
  persistentStorageKey: 'graph',
  persistentBlacklist: new Set(),
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
  FocusGraphSettings &
  DraggableGraphSettings &
  NodeAnchorGraphSettings &
  MarqueeGraphSettings &
  InteractiveGraphSettings &
  PersistentGraphSettings &
  ShortcutGraphSettings;

/**
 * the default settings for a graph instance
 */
export const DEFAULT_GRAPH_SETTINGS = {
  ...DEFAULT_BASE_SETTINGS,
  ...DEFAULT_FOCUS_SETTINGS,
  ...DEFAULT_DRAGGABLE_SETTINGS,
  ...DEFAULT_NODE_ANCHOR_SETTINGS,
  ...DEFAULT_MARQUEE_SETTINGS,
  ...DEFAULT_INTERACTIVE_SETTINGS,
  ...DEFAULT_PERSISTENT_SETTINGS,
  ...DEFAULT_SHORTCUT_SETTINGS,
} as const satisfies GraphSettings;
