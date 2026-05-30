import type { BoundingBox, Coordinate } from '@magic/shapes/types/utility';
import type { DeepPartial, DeepReadonly } from 'ts-essentials';

import {
  ElementAdditionPayload,
  ElementRemovalPayload,
  ElementUpdatePayload,
} from '../base/actions/types.ts';
import {
  ForbiddenEdgeKeyUpdates,
  ForbiddenNodeKeyUpdates,
  TransactionPayload,
} from '../base/transaction/types.ts';
import type { GraphMouseEvent } from '../base/types.ts';
import type { GraphState } from '../collab/types.ts';
import type { NodeAnchor } from '../plugins/anchors/types.ts';
import type {
  HistoryRecord,
  RedoHistoryOptions,
  UndoHistoryOptions,
} from '../plugins/history/types.ts';
import type { GraphSettings } from '../settings/index.ts';
import type { GraphThemeName } from '../themes/index.ts';
import type { GEdge, GNode, Graph } from '../types.ts';

export type BaseGraphEventMap = {
  /**
   * fired once at the end of any atomic graph mutation batch.
   * downstream plugins (Animation, History, Broadcast) should hook into this.
   */
  onTransactionComplete: (payload: DeepReadonly<TransactionPayload>) => void;
  /**
   * when one of the following occurs:
   * - a node is {@link graph.actions.addNode | added} or {@link graph.actions.removeNode | removed}
   * - an edge is {@link graph.actions.actions.addEdge | added} or {@link Graph.removeEdge | removed}
   * - an edge label is {@link Graph.editEdgeLabel | edited}
   * - the {@link Graph.load | graph load} api is invoked with new nodes and edges
   * - the {@link Graph.reset | graph reset} api is invoked clearing all nodes and edges
   * - the `isGraphDirected` {@link Graph.settings | graph setting} is toggled
   */
  onStructureChange: () => void;

  /**
   * when a single node is {@link graph.actions.addNode | added} to the graph
   */
  onNodeAdded: (node: Readonly<GNode>) => void;
  /**
   * when a single node is {@link graph.actions.removeNode | removed} from the graph
   */
  onNodeRemoved: (
    removedNode: GNode['id'],
    removedEdges: Readonly<GEdge['id'][]>,
  ) => void;
  /**
   * when a single node is {@link Graph.actions.updateNode | updated}
   */
  onNodeUpdated: (
    node: Readonly<GNode>,
    previousValues: Readonly<Partial<Omit<GNode, ForbiddenNodeKeyUpdates>>>,
  ) => void;

  /**
   * when a single edge is {@link Graph.actions.addEdge | added} to the graph
   */
  onEdgeAdded: (edge: Readonly<GEdge>) => void;
  /**
   * when a single edge is {@link Graph.actions.removeEdge | removed} from the graph
   */
  onEdgeRemoved: (edge: GEdge['id']) => void;
  /**
   * when an edge is {@link Graph.actions.updateEdge | updated} from the graph
   */
  onEdgeUpdated: (
    edge: Readonly<GEdge>,
    previousValues: Readonly<Partial<Omit<GEdge, ForbiddenEdgeKeyUpdates>>>,
  ) => void;

  /**
   * when any nodes or edges are added
   */
  onElementsAdded: (additions: DeepReadonly<ElementAdditionPayload>) => void;
  /**
   * when any nodes or edges are deleted
   */
  onElementsRemoved: (removals: DeepReadonly<ElementRemovalPayload>) => void;
  /**
   * when any nodes or edges are updated
   */
  onElementsUpdated: (updates: DeepReadonly<ElementUpdatePayload>) => void;

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
  DraggableGraphEventMap &
  NodeAnchorGraphEventMap &
  MarqueeGraphEventMap &
  PersistentGraphEventMap;
