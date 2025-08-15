import type {
  AddEdgeOptions,
  AddNodeOptions,
  EditEdgeLabelOptions,
  HistoryOption,
  MoveNodeOptions,
  RemoveEdgeOptions,
  RemoveNodeOptions,
} from '../base/types';
import type { GraphMouseEvent } from '../base/types';
import type { GraphState } from '../collab/types';
import type { NodeAnchor } from '../plugins/anchors/types';
import type {
  HistoryRecord,
  RedoHistoryOptions,
  UndoHistoryOptions,
} from '../plugins/history/types';
import type { GraphSettings } from '../settings';
import type { GraphThemeName } from '../themes';
// @typescript-eslint/no-unused-vars reports unused even if referenced in jsdoc
// eslint-disable-next-line
import type { GEdge, GNode, Graph } from '../types';
import type { BoundingBox, Coordinate } from '@magic/shapes/types/utility';
import type { DeepPartial, DeepReadonly } from 'ts-essentials';

export type BaseGraphEventMap = {
  /**
   * when one of the following occurs:
   * - a node is {@link Graph.addNode | added} or {@link Graph.removeNode | removed}
   * - an edge is {@link Graph.addEdge | added} or {@link Graph.removeEdge | removed}
   * - an edge label is {@link Graph.editEdgeLabel | edited}
   * - the {@link Graph.load | graph load} api is invoked with new nodes and edges
   * - the {@link Graph.reset | graph reset} api is invoked clearing all nodes and edges
   * - the `isGraphDirected` {@link Graph.settings | graph setting} is toggled
   */
  onStructureChange: () => void;
  /**
   * when a node is {@link Graph.addNode | added} to the graph
   */
  onNodeAdded: (node: GNode, options: DeepReadonly<AddNodeOptions>) => void;
  /**
   * when multiple nodes are added to the graph as a group
   */
  onBulkNodeAdded: (
    nodes: Readonly<GNode[]>,
    options: DeepReadonly<AddNodeOptions>,
  ) => void;
  /**
   * when a node is {@link Graph.removeNode | removed} from the graph
   */
  onNodeRemoved: (
    removedNode: GNode,
    removedEdges: Readonly<GEdge[]>,
    options: DeepReadonly<RemoveNodeOptions>,
  ) => void;
  /**
   * when multiple nodes are removed from the graph as a group
   */
  onBulkNodeRemoved: (
    removedNodes: Readonly<GNode[]>,
    removedEdges: Readonly<GEdge[]>,
    options: DeepReadonly<RemoveNodeOptions>,
  ) => void;
  /**
   * when a node is {@link Graph.moveNode | moved} to a new position on the canvas
   */
  onNodeMoved: (node: GNode, options: DeepReadonly<MoveNodeOptions>) => void;
  /**
   * when multiple nodes are moved to new positions on the canvas in as a group
   */
  onBulkNodeMoved: (
    nodes: Readonly<GNode[]>,
    options: DeepReadonly<MoveNodeOptions>,
  ) => void;
  /**
   * when an edge is {@link Graph.addEdge | added} to the graph
   */
  onEdgeAdded: (edge: GEdge, options: DeepReadonly<AddEdgeOptions>) => void;
  /**
   * when multiple edges are added to the graph as a group
   */
  onBulkEdgeAdded: (
    edges: Readonly<GEdge[]>,
    options: DeepReadonly<AddEdgeOptions>,
  ) => void;
  /**
   * when an edge is {@link Graph.removeEdge | removed} from the graph
   */
  onEdgeRemoved: (
    edge: GEdge,
    options: DeepReadonly<RemoveEdgeOptions>,
  ) => void;
  /**
   * when multiple edges are removed from the graph as a group
   */
  onBulkEdgeRemoved: (
    edges: Readonly<GEdge[]>,
    options: DeepReadonly<RemoveEdgeOptions>,
  ) => void;
  /**
   * when an edge's text label is {@link Graph.editEdgeLabel | edited}
   */
  onEdgeLabelEdited: (
    edge: GEdge,
    oldLabel: GEdge['label'],
    options: DeepReadonly<EditEdgeLabelOptions>,
  ) => void;
  /**
   * when the canvas is repainted
   *
   * **WARNING** items drawn to the canvas using ctx won't be tied to graphs internal state.
   * see {@link Graph.aggregator | `aggregator`} if you need drawn item to integrate with graph APIs
   */
  onDraw: (ctx: CanvasRenderingContext2D) => void;
  /**
   * when the node that the user is hovering over changes.
   * undefined if the user is not hovering over a node
   */
  onNodeHoverChange: (
    newNode: GNode | undefined,
    oldNode: GNode | undefined,
  ) => void;
  /**
   * when the graph is {@link Graph.load | loaded} with new nodes and edges.
   */
  onGraphLoaded: (
    previousState: GraphState,
    historyOptions: HistoryOption,
  ) => void;
  /**
   * when the graph has {@link Graph.reset | reset} and all nodes and edges have been removed
   */
  onGraphReset: () => void;
  /**
   * when the canvas is clicked on (native dom event)
   */
  onClick: (ev: GraphMouseEvent) => void;
  /**
   * when the user clicks the mouse button on the canvas (native dom event)
   */
  onMouseDown: (ev: GraphMouseEvent) => void;
  /**
   * when the user releases the mouse button on the canvas (native dom event)
   */
  onMouseUp: (ev: GraphMouseEvent) => void;
  /**
   * when the user moves the mouse on the canvas (native dom event)
   */
  onMouseMove: (ev: GraphMouseEvent) => void;
  /**
   * when the canvas is double clicked on (native dom event)
   */
  onDblClick: (ev: GraphMouseEvent) => void;
  /**
   * when the canvas is right clicked on (native dom event)
   */
  onContextMenu: (ev: GraphMouseEvent) => void;
  /**
   * when a key is pressed down on the canvas (native dom event)
   */
  onKeyDown: (ev: KeyboardEvent) => void;
  /**
   * when a key is released on the canvas (native dom event)
   */
  onKeyUp: (ev: KeyboardEvent) => void;
  /**
   * when the {@link Graph.themeName | theme} of the graph has changed
   */
  onThemeChange: (newTheme: GraphThemeName, oldTheme: GraphThemeName) => void;
  /**
   * when the {@link Graph.settings | settings} of the graph have changed
   */
  onSettingsChange: (diff: DeepPartial<GraphSettings>) => void;
};

export type HistoryGraphEventMap = {
  /**
   * when the undo action is triggered
   */
  onUndo: (
    historyRecord: DeepReadonly<HistoryRecord>,
    options: DeepReadonly<UndoHistoryOptions>,
  ) => void;
  /**
   * when the redo action is triggered
   */
  onRedo: (
    historyRecord: DeepReadonly<HistoryRecord>,
    options: DeepReadonly<RedoHistoryOptions>,
  ) => void;
};

export type FocusGraphEventMap = {
  /**
   * when the set of focused items changes
   */
  onFocusChange: (
    newItemIds: Readonly<Set<string>>,
    oldItemIds: Readonly<Set<string>>,
  ) => void;
};

export type DraggableGraphEventMap = {
  /**
   * when the user initiates a drag on a node
   */
  onNodeDragStart: (node: GNode) => void;
  /**
   * when the user drops a node
   */
  onNodeDrop: (node: GNode) => void;
};

export type NodeAnchorGraphEventMap = {
  /**
   * when the user initiates a drag on a node anchor
   */
  onNodeAnchorDragStart: (
    parentNode: GNode,
    nodeAnchor: Readonly<NodeAnchor>,
  ) => void;
  /**
   * when the user drops a node anchor
   */
  onNodeAnchorDrop: (
    parentNode: GNode,
    nodeAnchor: Readonly<NodeAnchor>,
  ) => void;
};

export type MarqueeGraphEventMap = {
  /**
   * when the user starts a marquee drag
   */
  onGroupDragStart: (
    nodes: Readonly<GNode[]>,
    startingCoordinates: Readonly<Coordinate>,
  ) => void;
  /**
   * when the user drops a marquee drag
   */
  onGroupDrop: (
    nodes: Readonly<GNode[]>,
    endCoordinates: Readonly<Coordinate>,
  ) => void;
  /**
   * when the user starts a marquee selection
   */
  onMarqueeBeginSelection: (startingCoords: Readonly<Coordinate>) => void;
  /**
   * when the user ends a marquee selection
   */
  onMarqueeEndSelection: (marqueeBox: Readonly<BoundingBox>) => void;
};

export type AnnotationGraphEventMap = {};

export type PersistentGraphEventMap = {};

/**
 * a complete mapping of all graph events to their callback functions
 */
export type GraphEventMap = BaseGraphEventMap &
  HistoryGraphEventMap &
  FocusGraphEventMap &
  DraggableGraphEventMap &
  NodeAnchorGraphEventMap &
  MarqueeGraphEventMap &
  PersistentGraphEventMap;
