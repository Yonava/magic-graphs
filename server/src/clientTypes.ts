// @ts-nocheck

export type BaseGraph = ReturnType<typeof useBaseGraph>

export type FocusOption = {
  /**
   * whether to focus the added item/s
   */
  focus: boolean
}

export type HistoryOption = {
  /**
   * whether to record this action in the history stack
   */
  history: boolean
}

export type BroadcastOption = {
  /**
   * whether to broadcast this action to connected collaborators
   */
  broadcast: boolean
}

export type PersistOption = {
  /**
   * whether this action will be tracked in local storage
   */
  persist: boolean
}

export type AddNodeOptions = FocusOption & BroadcastOption & HistoryOption

export type RemoveNodeOptions = BroadcastOption & HistoryOption

export type AddEdgeOptions = FocusOption & BroadcastOption & HistoryOption

export type RemoveEdgeOptions = BroadcastOption & HistoryOption

export type MoveNodeOptions = BroadcastOption

export type EditEdgeLabelOptions = BroadcastOption & HistoryOption

export type GraphAtMousePosition = {
  /**
   * coordinates translated to the graph's coordinate system
   */
  coords: Coordinate,
  /**
   * the schema items at the coordinates of the mouse
   */
  items: SchemaItem[],
}

export type GraphMouseEvent = DeepReadonly<GraphAtMousePosition> & {
  /**
   * the native browser event that triggered this graph event
   */
  event: MouseEvent,
}

export type UseAggregatorOptions = {
  canvas: Ref<HTMLCanvasElement | null | undefined>
  emit: GraphEventEmitter
}

type GraphCRUDOptions = {
  emit: Emitter,
  nodes: Ref<GNode[]>,
  edges: Ref<GEdge[]>,
  nodeMap: NodeMap,
  edgeMap: EdgeMap,
  settings: Ref<GraphSettings>,
}

export type Cursor =
  | "auto"
  | "default"
  | "none"
  | "context-menu"
  | "help"
  | "pointer"
  | "progress"
  | "wait"
  | "cell"
  | "crosshair"
  | "text"
  | "vertical-text"
  | "alias"
  | "copy"
  | "move"
  | "no-drop"
  | "not-allowed"
  | "grab"
  | "grabbing"
  | "e-resize"
  | "n-resize"
  | "ne-resize"
  | "nw-resize"
  | "s-resize"
  | "se-resize"
  | "sw-resize"
  | "w-resize"
  | "ew-resize"
  | "ns-resize"
  | "nesw-resize"
  | "nwse-resize"
  | "col-resize"
  | "row-resize"
  | "all-scroll"
  | "zoom-in"
  | "zoom-out"

/**
 * manages the cursor type when hovering over the graph
 *
 * @param subscribe - the event subscriber
 * @param canvas - the canvas element
 * @param graphAtMousePosition - the graph items at the mouse position
 * @returns the cursor manager
 */
export const useGraphCursor = ({
  subscribe,
  canvas,
  graphAtMousePosition,
}: {
  subscribe: Subscriber;
  canvas: Ref<HTMLCanvasElement | null | undefined>;
  graphAtMousePosition: Ref<GraphAtMousePosition>;
}) => {
  const isMouseDown = ref(false)
  const graphCursorDisabled = ref(false)

  const graphToCursorMap = ref<Partial<Record<SchemaItem['graphType'], Cursor>>>({
    'node': 'grab',
    'edge': 'pointer',
    'node-anchor': 'grab',
    'encapsulated-node-box': 'move',
  })

  const isItemSelectable = ref<(item: SchemaItem) => boolean>()
  const inSelectMode = computed(() => !!isItemSelectable.value)

  const activateCursorSelectMode = (predicate: (item: SchemaItem) => boolean) => {
    isItemSelectable.value = predicate
  }

  const deactivateCursorSelectMode = () => {
    isItemSelectable.value = undefined
  }

  const getCursorType = (item: SchemaItem | undefined) => {
    if (!item) return 'default'

    if (inSelectMode.value) {
      const isSelectable = isItemSelectable.value?.(item) ?? false
      return isSelectable ? 'pointer' : 'default'
    }

    const cursor = graphToCursorMap.value[item.graphType] ?? 'default'
    if (cursor === 'grab' && isMouseDown.value) return 'grabbing'

    return cursor
  }

  const changeCursorType = ({ items }: Pick<GraphMouseEvent, 'items'>) => {
    if (!canvas.value || graphCursorDisabled.value) return
    const topItem = items.at(-1)
    canvas.value.style.cursor = getCursorType(topItem)
  }

  subscribe('onMouseDown', (ev) => {
    isMouseDown.value = true
    changeCursorType(ev)
  })

  subscribe('onMouseUp', (ev) => {
    isMouseDown.value = false
    changeCursorType(ev)
  })

  subscribe('onMouseMove', changeCursorType)

  watch(graphToCursorMap, () => {
    changeCursorType({
      items: graphAtMousePosition.value.items
    })
  }, { deep: true })

  return {
    /**
     * maps graph schema item types to browser cursor.
     * changing this mapping will change the cursor type when hovering over the graph.
     */
    graphToCursorMap,
    /**
     * activates a cursor select mode, where only the schema items that pass the
     * `predicate` will receive a pointer cursor.
     * everything else will receive the default cursor as long as this mode is active.
     * @param predicate - a predicate that determines, given a schema item, whether it is selectable.
     * @example activateCursorSelectMode((item) => item.graphType === 'node')
     * // in select mode
     * // only nodes will receive a pointer cursor
     */
    activateCursorSelectMode,
    /**
     * deactivates the cursor select mode. to be called after `activateCursorSelectMode`.
     * @example activateCursorSelectMode((item) => item.graphType === 'node')
     * // in select mode
     * deactivateCursorSelectMode()
     * // no longer in select mode
     */
    deactivateCursorSelectMode,
    /**
     * when the graph cursor is disabled, the cursor will always be the default cursor.
     */
    graphCursorDisabled,
  }
};

export type UseNodeEdgeMap = typeof useNodeEdgeMap
export type NodeMap = ReturnType<UseNodeEdgeMap>['nodeIdToNodeMap']
export type EdgeMap = ReturnType<UseNodeEdgeMap>['edgeIdToEdgeMap']

type GraphButtonIdMap = typeof GRAPH_BUTTON_ID;
type GraphButtonId = GraphButtonIdMap[keyof GraphButtonIdMap];

/**
 * @describes a button that can be added to the graph toolbar
 */
export type GraphPlaygroundButton = {
  cond?: () => boolean,
  label: () => string,
  action: () => void,
  color: () => string,
  id: GraphButtonId,
}

type ConnectOptions = {
  /**
   * graph instance for the collab system to write new nodes/edges to when received
   * and to read from when sending new nodes/edges to other collaborators
   */
  graph: Graph,
  /**
   * room id to connect to
   */
  roomId: string,
  /**
   * product id that the graph belongs to
   */
  productId: ProductInfo['productId']
}

type SocketListenOptions = {
  graph: Graph,
  collaborators: Ref<CollaboratorMap>
}

export type CollaboratorProfile = {
  /**
   * the display name of the collaborator
   */
  name: string
  /**
   * the display color of the collaborator
   */
  color: string
}

export type Collaborator = {
  /**
   * unique id for the collaborator, tied to their socket id
   */
  id: string
  /**
   * the current mouse coordinates of the collaborator on the canvas
   */
  mousePosition: { x: number, y: number }
  /**
   * the id of the product that the collaborator is currently active on
   */
  productId: ProductInfo['productId']
} & CollaboratorProfile

export type CollaboratorMove = {
  id: Collaborator['id']
  x: number
  y: number
}

export type CollaboratorMap = Record<Collaborator['id'], Collaborator>

export type GraphState = {
  nodes: GNode[],
  edges: GEdge[]
}

export type GraphSocketEvents = {
  nodeAdded: (node: GNode) => void
  nodeRemoved: (nodeId: GNode['id']) => void
  nodeMoved: (node: GNode) => void

  edgeAdded: (edge: GEdge) => void
  edgeRemoved: (edgeId: GEdge['id']) => void
  edgeLabelEdited: (edgeId: GEdge['id'], label: string) => void
}

export type CollabSocketEvents = {
  collaboratorJoined: (collaborator: Collaborator) => void
  collaboratorLeft: (collaboratorId: Collaborator['id']) => void
  collaboratorMoved: (collaboratorMove: CollaboratorMove) => void
}

export type ConnectionSocketEvents = {
  joinRoom: (
    joinOptions: {
      roomId: string,
      me: Collaborator,
      graphState: GraphState
    },
    mapCallback: (collabMap: CollaboratorMap, graphState: GraphState) => void
  ) => void

  leaveRoom: (confirmationCallback: () => void) => void
}

export type SocketEvents = GraphSocketEvents & CollabSocketEvents & ConnectionSocketEvents

export type GraphSocket = Socket<SocketEvents, SocketEvents>

export type GraphEventMap = ImportedGraphEventMap

export type EventMapToEventBus<T> = Record<keyof T, Set<any>>

export type GraphEvent = keyof GraphEventMap;

type PermissiveParams<T> = T extends (...args: infer P) => any ? P : never;

export type GenerateSubscriber<
  T extends GraphEventMap = GraphEventMap
> = typeof generateSubscriber<T>;

export type Subscriber<
  T extends GraphEventMap = GraphEventMap
> = ReturnType<GenerateSubscriber<T>>['subscribe'];

export type Unsubscriber<
  T extends GraphEventMap = GraphEventMap
> = ReturnType<GenerateSubscriber<T>>['unsubscribe'];

export type Emitter<
  T extends GraphEventMap = GraphEventMap
> = ReturnType<GenerateSubscriber<T>>['emit'];

/**
 * @returns an empty event bus with all events initialized to empty sets
 */
export const getInitialEventBus = () => {
  const eventBus = {
    /**
     * BaseGraphEvents
     */
    onStructureChange: new Set(),

    onNodeAdded: new Set(),
    onBulkNodeAdded: new Set(),

    onNodeRemoved: new Set(),
    onBulkNodeRemoved: new Set(),

    onNodeMoved: new Set(),
    onBulkNodeMoved: new Set(),

    onEdgeAdded: new Set(),
    onBulkEdgeAdded: new Set(),

    onEdgeRemoved: new Set(),
    onBulkEdgeRemoved: new Set(),

    onEdgeLabelEdited: new Set(),

    onRepaint: new Set(),
    onNodeHoverChange: new Set(),

    onGraphLoaded: new Set(),
    onGraphReset: new Set(),

    onClick: new Set(),
    onMouseDown: new Set(),
    onMouseUp: new Set(),
    onMouseMove: new Set(),
    onDblClick: new Set(),
    onContextMenu: new Set(),

    onKeyDown: new Set(),
    onKeyUp: new Set(),

    onThemeChange: new Set(),
    onSettingsChange: new Set(),

    /**
     * HistoryGraphEvents
     */
    onUndo: new Set(),
    onRedo: new Set(),

    /**
     * FocusGraphEvents
     */
    onFocusChange: new Set(),

    /**
     * DraggableGraphEvents
     */
    onNodeDragStart: new Set(),
    onNodeDrop: new Set(),

    /**
     * NodeAnchorGraphEvents
     */
    onNodeAnchorDragStart: new Set(),
    onNodeAnchorDrop: new Set(),

    /**
     * MarqueeGraphEvents
     */
    onGroupDragStart: new Set(),
    onGroupDrop: new Set(),
  } as const satisfies GraphEventBus

  return eventBus
}

export type BaseGraphEventMap = {
  /**
   * when one of the following occurs:
   * - a node is {@link Graph.addNode | added} or {@link Graph.removeNode | removed}
   * - an edge is {@link Graph.addEdge | added} or {@link Graph.removeEdge | removed}
   * - an edge label is {@link Graph.editEdgeLabel | edited}
   * - the {@link Graph.load | graph load} api is invoked with new nodes and edges
   * - the {@link Graph.reset | graph reset} api is invoked clearing all nodes and edges
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
    options: DeepReadonly<AddNodeOptions>
  ) => void;
  /**
   * when a node is {@link Graph.removeNode | removed} from the graph
   */
  onNodeRemoved: (
    removedNode: GNode,
    removedEdges: Readonly<GEdge[]>,
    options: DeepReadonly<RemoveNodeOptions>
  ) => void;
  /**
   * when multiple nodes are removed from the graph as a group
   */
  onBulkNodeRemoved: (
    removedNodes: Readonly<GNode[]>,
    removedEdges: Readonly<GEdge[]>,
    options: DeepReadonly<RemoveNodeOptions>
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
    options: DeepReadonly<MoveNodeOptions>
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
    options: DeepReadonly<AddEdgeOptions>
  ) => void;
  /**
   * when an edge is {@link Graph.removeEdge | removed} from the graph
   */
  onEdgeRemoved: (edge: GEdge, options: DeepReadonly<RemoveEdgeOptions>) => void;
  /**
   * when multiple edges are removed from the graph as a group
   */
  onBulkEdgeRemoved: (
    edges: Readonly<GEdge[]>,
    options: DeepReadonly<RemoveEdgeOptions>
  ) => void;
  /**
   * when an edge's text label is {@link Graph.editEdgeLabel | edited}
   */
  onEdgeLabelEdited: (
    edge: GEdge,
    oldLabel: GEdge['label'],
    options: DeepReadonly<EditEdgeLabelOptions>
  ) => void;
  /**
   * when the canvas is repainted
   *
   * **WARNING** items drawn to the canvas using ctx won't be tied to graphs internal state.
   * see {@link Graph.updateAggregator | `updateAggregator`} if you need drawn item to integrate with graph APIs
   */
  onRepaint: (ctx: CanvasRenderingContext2D, repaintId: string) => void;
  /**
   * when the node that the user is hovering over changes.
   * undefined if the user is not hovering over a node
   */
  onNodeHoverChange: (newNode: GNode | undefined, oldNode: GNode | undefined) => void;
  /**
   * when the graph is {@link Graph.load | loaded} with new nodes and edges.
   */
  onGraphLoaded: () => void;
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
}

export type HistoryGraphEventMap = {
  /**
   * when the undo action is triggered
   */
  onUndo: (
    historyRecord: DeepReadonly<HistoryRecord>,
    options: DeepReadonly<UndoHistoryOptions>
  ) => void;
  /**
   * when the redo action is triggered
   */
  onRedo: (
    historyRecord: DeepReadonly<HistoryRecord>,
    options: DeepReadonly<RedoHistoryOptions>
  ) => void;
}

export type FocusGraphEventMap = {
  /**
   * when the set of focused items changes
   */
  onFocusChange: (
    newItemIds: Readonly<Set<string>>,
    oldItemIds: Readonly<Set<string>>
  ) => void;
}

export type DraggableGraphEventMap = {
  /**
   * when the user initiates a drag on a node
   */
  onNodeDragStart: (node: GNode) => void;
  /**
   * when the user drops a node
   */
  onNodeDrop: (node: GNode) => void;
}

export type NodeAnchorGraphEventMap = {
  /**
   * when the user initiates a drag on a node anchor
   */
  onNodeAnchorDragStart: (
    parentNode: GNode,
    nodeAnchor: Readonly<NodeAnchor>
  ) => void;
  /**
   * when the user drops a node anchor
   */
  onNodeAnchorDrop: (
    parentNode: GNode,
    nodeAnchor: Readonly<NodeAnchor>
  ) => void;
}

export type MarqueeGraphEventMap = {
  /**
   * when the user starts a marquee drag
   */
  onGroupDragStart: (
    nodes: Readonly<GNode[]>,
    startingCoordinates: Readonly<Coordinate>
  ) => void;
  /**
   * when the user drops a marquee drag
   */
  onGroupDrop: (
    nodes: Readonly<GNode[]>,
    endCoordinates: Readonly<Coordinate>
  ) => void;
}

export type AnnotationGraphEventMap = {}

export type GraphEventMap = (
  BaseGraphEventMap &
  HistoryGraphEventMap &
  FocusGraphEventMap &
  DraggableGraphEventMap &
  NodeAnchorGraphEventMap &
  MarqueeGraphEventMap &
  PersistentGraphEventMap
)

export type LabelledItem = { label: string };

export type NodeAnchorControls = ReturnType<typeof useNodeAnchors>
export type NodeAnchorPlugin = {
  /**
   * controls for managing node anchors in the graph
   */
  nodeAnchors: NodeAnchorControls
}

export type NodeAnchor = {
  /**
   * the x-coordinate of the anchor
   */
  x: number,
  /**
   * the y-coordinate of the anchor
   */
  y: number,
  /**
   * the direction of the anchor relative to the parent node.
   * ie the north anchor is the one that spawns above the node
   */
  direction: 'north' | 'east' | 'south' | 'west',
  /**
   * the unique id of the anchor
   */
  id: string,
}

export type AnimateNodeMoveOptions = {
  /**
   * the id of the node to move
   */
  nodeId: GNode['id'],
  /**
   * the coordinates of the node after the move
   */
  endCoords: Coordinate,
  /**
   * the duration of the animation in milliseconds.
   * must be greater than 100
   * @default 300
   */
  durationMs?: number,
} & Partial<HistoryOption & BroadcastOption & PersistOption>

export const ANIMATE_NODE_MOVE_OPTIONS_DEFAULTS = {
  durationMs: 300,
  broadcast: true,
  history: true,
  persist: true,
} as const

type AnnotationHistoryRecord = {
  action: 'add' | 'remove',
  annotations: Annotation[]
}

export type GraphAnnotationControls = ReturnType<typeof useAnnotations>
export type GraphAnnotationPlugin = {
  /**
   * controls for facilitating the "marking up" or drawing over the graph
   */
  annotation: GraphAnnotationControls
}

export type Annotation = Scribble & { id: string }

export type GraphNodeDragControls = ReturnType<typeof useNodeDrag>

export type ActiveDragNode = {
  node: GNode,
  coords: Coordinate,
}

export type GraphFocusControls = ReturnType<typeof useFocus>
export type GraphFocusPlugin = {
  /**
   * controls for focusing items in the graph
   */
  focus: GraphFocusControls
}

export type GraphHistoryControls = ReturnType<typeof useHistory>;
export type GraphHistoryPlugin = {
  /**
   * controls for undoing and redoing actions in the graph
   * such as adding, removing, moving, and editing nodes and edges
   */
  history: GraphHistoryControls
}

export type GNodeMoveRecord = {
  graphType: 'node',
  data: {
    id: string,
    from: { x: number, y: number },
    to: { x: number, y: number }
  }
}

export type GEdgeLabelEditRecord = {
  graphType: 'edge',
  data: {
    id: GEdge['id'],
    from: GEdge['label'],
    to: GEdge['label']
  }
}

export type GNodeRecord = {
  graphType: 'node',
  data: GNode
}

export type GEdgeRecord = {
  graphType: 'edge',
  data: GEdge
}

export type AddRemoveRecord = {
  /**
   * the action that was taken in order to create this record.
   */
  action: 'add' | 'remove',
  /**
   * the items that were affected by the action.
   */
  affectedItems: (GNodeRecord | GEdgeRecord)[];
}

export type MoveRecord = {
  /**
   * the action that was taken in order to create this record.
   */
  action: 'move',
  /**
   * the items that were affected by the action.
   */
  affectedItems: GNodeMoveRecord[];
}

export type EditRecord = {
  /**
   * the action that was taken in order to create this record.
   */
  action: 'edit',
  /**
   * the items that were affected by the action.
   */
  affectedItems: GEdgeLabelEditRecord[];
}

export type HistoryRecord = AddRemoveRecord | MoveRecord | EditRecord;

export type RedoHistoryOptions = FocusOption;

export type GraphMarqueeControls = ReturnType<typeof useMarquee>
export type GraphMarqueePlugin = {
  /**
   * controls for the marquee plugin
   */
  marquee: GraphMarqueeControls
}

export type GraphPersistentControls = ReturnType<typeof usePersistent>;
export type GraphPersistentPlugin = {
  /**
   * controls for persisting the graph state to local storage
   */
  persistent: GraphPersistentControls;
};

type PropsNeededFromGraph = 'edges' | 'getNode' | 'getEdge' | 'getTheme' | 'settings'

export type SupportedNodeShapes = 'circle' | 'square'

export type SelectFromGraphOptions = {
  /**
   * only items that satisfy this predicate will be selectable.
   * if left undefined, all items in the graph will be selectable
   * @default () => true
   */
  predicate: (item: SchemaItem) => boolean;
};

/**
 * default predicate for `selectFromGraph`
 */
const DEFAULT_PREDICATE = () => true;

/**
 * waits for the user to click on an item in the graph and resolves to the selected item
 * or undefined if the cancel handler is invoked
 *
 * @param graph the graph to select from
 * @param options options for the selection process
 * @returns a promise that resolves to the selected item or undefined if the selection was cancelled
 * @example const { selectedItemPromise, cancelSelection } = selectFromGraph(graph);
 * const selectedItem = await selectedItemPromise;
 * if (!selectedItem) return; // selection was cancelled
 * // selection resolved. do something with the selected item
 */
export const selectFromGraph = (graph: Graph, {
  predicate = DEFAULT_PREDICATE,
}: Partial<SelectFromGraphOptions> = {}) => {
  let resolver: (value: SchemaItem | PromiseLike<SchemaItem> | undefined) => void;

  const selectedItemPromise = new Promise<SchemaItem | undefined>((res) => resolver = res);

  const onClick = ({ items }: GraphMouseEvent) => {
    const topItem = items.at(-1);
    if (!topItem || !predicate(topItem)) return;
    resolve(topItem);
  }

  const initialInteractive = graph.settings.value.interactive;
  const initialFocusable = graph.settings.value.focusable;

  /**
   * initializes the selection process
   */
  const init = () => {
    graph.subscribe('onClick', onClick);
    graph.settings.value.interactive = false;
    graph.settings.value.focusable = false;
    const cursorPredicate = predicate === DEFAULT_PREDICATE ? ((item: SchemaItem) => !!item) : predicate;
    graph.activateCursorSelectMode(cursorPredicate);
  }

  /**
   * cleans up the selection process
   */
  const cleanup = () => {
    graph.unsubscribe('onClick', onClick);
    graph.settings.value.interactive = initialInteractive;
    graph.settings.value.focusable = initialFocusable;
    graph.deactivateCursorSelectMode();
  }

  /**
   * resolves the selection process and returns the selected item from the promise
   */
  const resolve = (item: SchemaItem) => {
    cleanup();
    resolver(item);
  }

  /**
   * cancels the selection process and returns undefined from the promise (public)
   */
  const cancelSelection = () => {
    cleanup();
    resolver(undefined);
  }

  init();

  return {
    /**
     * resolves to the selected item or undefined if the
     * selection was cancelled by calling the cancel handler
     */
    selectedItemPromise,
    cancelSelection,
  };
};

export type SelectControls = ReturnType<typeof selectFromGraph>;

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
}

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
}

export type DraggableGraphSettings = {
  /**
   * whether the nodes on the graph are draggable
   * @default true
   */
  draggable: boolean;
}

export type NodeAnchorGraphSettings = {
  /**
   * whether node anchors are enabled, if true, anchors will spawn around nodes while hovered
   * enabling edge creation
   * @default true
   */
  nodeAnchors: boolean
}

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
}

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
  userAddedEdgeLabel: string,
  /**
   * whether to allow self loops.
   * relevant on directed graphs where a node can have an edge to itself
   * @default false
   */
  userAddedEdgeRuleNoSelfLoops: boolean,
  /**
   * whether to allow only one edge per path between two nodes.
   * relevant on directed graphs where multiple edges can exist between two nodes
   * @default false
   */
  userAddedEdgeRuleOneEdgePerPath: boolean,
}

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
  persistentStorageKey: string,
  /**
   * set of node or edge ids that will not be saved through graph persistence
   * @default new Set()
   */
  persistentBlacklist: Set<GNode['id'] | GEdge['id']>
}

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
}

export type GraphSettings = (
  BaseGraphSettings &
  FocusGraphSettings &
  DraggableGraphSettings &
  NodeAnchorGraphSettings &
  MarqueeGraphSettings &
  InteractiveGraphSettings &
  PersistentGraphSettings &
  ShortcutGraphSettings
)

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
} as const satisfies GraphSettings

type ModifiedExtract<T, U, R = never> = T extends U ? T : R

type FuncExtract<T, U> = ModifiedExtract<T, U, () => void>

type ThemeParams<T extends keyof GraphTheme> = Parameters<FuncExtract<GraphTheme[T], Function>>

type ResolvedThemeParams<T extends keyof GraphTheme> = ThemeParams<T> extends []
  ? [] : Exclude<ThemeParams<T>, []>;


export const getThemeResolver = (
  themeName: Ref<GraphThemeName>,
  themeMap: FullThemeMap,
) => <
  T extends keyof GraphTheme,
  K extends ResolvedThemeParams<T>
>(
  prop: T,
  ...args: K
) => {
    const themeMapEntry = themeMap[prop].findLast((themeMapEntryItem: FullThemeMap[T][number]) => {
      const themeGetterOrValue = themeMapEntryItem.value
      const themeValue = getValue<typeof themeGetterOrValue, K>(
        themeGetterOrValue,
        ...args
      ) as UnwrapMaybeGetter<GraphTheme[T]>
      return themeValue !== undefined
    })
    const getter = themeMapEntry?.value ?? THEMES[themeName.value][prop]
    if (!getter) throw new Error(`Theme property "${prop}" not found`)
    return getValue<typeof getter, K>(getter, ...args) as UnwrapMaybeGetter<GraphTheme[T]>
  }

/**
 * the function that gets a value from a theme inquiry
 */
export type ThemeGetter = ReturnType<typeof getThemeResolver>

export type GraphTheme = GraphThemeImport
export type GraphThemeKey = keyof GraphTheme

export const THEMES = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
  girl: GIRL_THEME,
} as const satisfies Record<string, GraphTheme>

export type GraphThemeName = keyof typeof THEMES

/**
 * gets the theme attributes for a GNode at the point in time the function is called
 *
 * @param getTheme - the theme getter function
 * @param node - the node to get the theme for
 * @returns the theme attributes for the node
 */
export const resolveThemeForNode = (getTheme: ThemeGetter, node: GNode): BaseGraphNodeTheme => ({
  nodeSize: getTheme('nodeSize', node),
  nodeBorderWidth: getTheme('nodeBorderWidth', node),
  nodeColor: getTheme('nodeColor', node),
  nodeBorderColor: getTheme('nodeBorderColor', node),
  nodeTextSize: getTheme('nodeTextSize', node),
  nodeTextColor: getTheme('nodeTextColor', node),
  nodeText: getTheme('nodeText', node),
  nodeShape: getTheme('nodeShape', node),
})

/**
 * gets the theme attributes for a GEdge at the point in time the function is called
 *
 * @param getTheme - the theme getter function
 * @param edge - the edge to get the theme for
 * @returns the theme attributes for the edge
 */
export const resolveThemeForEdge = (getTheme: ThemeGetter, edge: GEdge): BaseGraphEdgeTheme => ({
  edgeWidth: getTheme('edgeWidth', edge),
  edgeColor: getTheme('edgeColor', edge),
  edgeText: getTheme('edgeText', edge),
  edgeTextSize: getTheme('edgeTextSize', edge),
  edgeTextColor: getTheme('edgeTextColor', edge),
  edgeTextFontWeight: getTheme('edgeTextFontWeight', edge),
})

export type NonColorGraphThemes = Pick<
  GraphThemeRaw,
  'nodeShape' |
  'nodeSize' |
  'nodeBorderWidth' |
  'nodeTextSize' |
  'nodeAnchorRadius' |
  'edgeWidth' |
  'edgeTextSize' |
  'nodeText' |
  'edgeText' |
  'edgeTextFontWeight' |
  'linkPreviewWidth'
>

/**
 * themes that do not depend on color scheme
 */
export const NON_COLOR_THEMES: NonColorGraphThemes = {
  nodeShape: 'circle',
  nodeSize: 35,
  nodeBorderWidth: 8,
  nodeTextSize: 24,
  // Math.ceil(Math.sqrt(nodeSize) * 2)
  nodeAnchorRadius: Math.ceil(Math.sqrt(35) * 2),
  edgeWidth: 10,
  edgeTextSize: 20,
  nodeText: ({ label }) => label,
  edgeText: ({ label }) => label,
  edgeTextFontWeight: 'bold',
  linkPreviewWidth: 10,
}

export type BaseGraphNodeTheme = {
  nodeSize: number,
  nodeBorderWidth: number,
  nodeColor: string,
  nodeBorderColor: string,
  nodeText: string,
  nodeTextSize: number,
  nodeTextColor: string,
  nodeShape: SupportedNodeShapes,
}

export type BaseGraphEdgeTheme = {
  edgeColor: string,
  edgeWidth: number,
  edgeText: string,
  edgeTextSize: number,
  edgeTextColor: string,
  edgeTextFontWeight: TextFontWeight,
}

export type BaseGraphTheme = WrapWithNodeGetter<BaseGraphNodeTheme> & WrapWithEdgeGetter<BaseGraphEdgeTheme> & {
  graphBgColor: string,
  graphBgPatternColor: string,
}

export type HistoryGraphTheme = {}

export type DraggableGraphTheme = {}

export type MarqueeGraphTheme = {
  marqueeSelectionBoxColor: string,
  marqueeSelectionBoxBorderColor: string,
  marqueeEncapsulatedNodeBoxColor: string,
  marqueeEncapsulatedNodeBoxBorderColor: string,
}

export type AnnotationGraphTheme = {}

export type GraphTheme = (
  BaseGraphTheme &
  HistoryGraphTheme &
  FocusGraphTheme &
  DraggableGraphTheme &
  NodeAnchorGraphTheme &
  MarqueeGraphTheme &
  PersistentGraphTheme
)

/**
 * the raw theme object without any getters
 */
export type GraphThemeRaw = {
  // nodeText and edgeText are special cases which must remain as getters
  [K in keyof GraphTheme]: K extends 'nodeText' | 'edgeText' ? GraphTheme[K] : UnwrapMaybeGetter<GraphTheme[K]>
}

export type MaybeGetterOrVoid<T> = MaybeGetter<UnwrapMaybeGetter<T> | void, MaybeGetterParams<T>>

type WrapWithEdgeGetter<T extends Record<string, any>> = {
  [K in keyof T]: EdgeGetterOrValue<T[K]>
}

export type ThemeMapEntry<T extends keyof GraphTheme> = {
  value: MaybeGetterOrVoid<GraphTheme[T]>,
  useThemeId: string,
}

export type FullThemeMap = {
  [K in keyof GraphTheme]: ThemeMapEntry<K>[]
}

export type PartialThemeMap = Partial<FullThemeMap>

type GraphColors = {
  primary: string
  secondary: string
  tertiary: string
  contrast: string
  text: string,
  brand: string
};

export const ThemeToGraphColors: Record<GraphThemeName, GraphColors> = {
  light: {
    primary: colors.GRAY_300,
    secondary: colors.GRAY_200,
    tertiary: colors.GRAY_400,
    contrast: colors.GRAY_800,
    text: colors.GRAY_900,
    brand: 'magic'
  },
  dark: {
    primary: colors.GRAY_800,
    secondary: colors.GRAY_700,
    tertiary: colors.GRAY_900,
    contrast: colors.GRAY_200,
    text: colors.GRAY_100,
    brand: 'magic'
  },
  girl: {
    primary: colors.PINK_700,
    secondary: colors.PINK_600,
    tertiary: colors.PINK_800,
    contrast: colors.PINK_200,
    text: colors.WHITE,
    brand: 'girl-magic'
  }
}

export type PreferredGraphTheme = GraphThemeName | 'auto'

type ThemeableGraph = Pick<Graph, 'themeMap'>

export type TutorialStepForEvent<T extends GraphEvent> = {
  /**
   * the hint to display to the user in order to complete the step
   */
  hint: string;
  /**
   * the event that triggers a dismiss inquiry, if its just the event itself (T), then the step will be dismissed
   * upon invocation of the event via event bus, if its an object, then the step will be dismissed upon invocation
   * of the event and only if the predicate returns true
   */
  dismiss: T | {
    event: T,
    /**
     * @param args the arguments passed to the event handler as defined in the event map
     * @returns true if the step should be dismissed
     */
    predicate: (...args: Parameters<GraphEventMap[T]>) => boolean
  };
};

/**
 * describes a step that will resolve after a set amount of time
 */
export type TimeoutStep = {
  hint: string,
  dismiss: 'onTimeout',
  /**
   * time to wait before the next step, in milliseconds
   */
  after: number,
};

type SharedStepProps = {
  /**
   * the text shown to the user in order to help guide them along
   */
  hint: string,
  /**
   * describes the precondition option for a tutorial step.
   * a precondition allows the implementer to run a function before the step is shown.
   * its boolean return acts just as a predicate would act as defined in base tutorial step.
   * if the precondition returns true, its like the condition for going to the next step is
   * already met, so the step will be skipped.
   */
  precondition?: (graph: Graph) => boolean,
  /**
   * callback to run when the step is initialized.
   * runs before precondition
   */
  onInit?: () => void,
  /**
   * callback to run when the step is dismissed
   */
  onDismiss?: () => void,
  /**
   * describes options for highlighting an element.
   * passing a string will highlight the element with the id
   */
  highlightElement?: string | {
    /**
     * id of the element to highlight
     */
    id?: string;
    /**
     * css class name to apply to the element
     * @default 'element-highlight'
     */
    className?: string;
  }
}

export type IntervalStep = {
  hint: string,
  dismiss: 'onInterval' | {
    event: 'onInterval',
    /**
     * @param iteration the number of times the interval has been called
     * @returns true if the step should be dismissed
     */
    predicate: (iteration: number) => boolean
  },
  /**
   * time to wait before the next evaluation, in milliseconds
   * @default 1000 milliseconds
   */
  interval?: number,
}

export type GraphEventStep = {
  [K in GraphEvent]: TutorialStepForEvent<K>
}[GraphEvent];

/**
 * describes a step in a tutorial sequence
 */
export type TutorialStep = (
  GraphEventStep |
  TimeoutStep |
  IntervalStep
) & SharedStepProps;

/**
 * describes a list of tutorial steps that will be executed in order from index 0 to n - 1
 */
export type TutorialSequence = TutorialStep[];


/**
 * time to wait (in milliseconds) between the dismissal of a step and the initialization of the next step
 */
export const DELAY_UNTIL_NEXT_STEP = 1000;

export const TUTORIAL_THEME_ID = 'tutorial'

export type TutorialControls = {
  /**
   * skip forward to the next step of the tutorial.
   * wont do anything if the current step is the last step
   */
  nextStep: () => void
  /**
   * skip backward to the previous step of the tutorial.
   * wont do anything if the current step is -1.
   */
  prevStep: () => void

  /**
   * an array of all the steps in the tutorial
   */
  sequence: Ref<TutorialSequence>
  /**
   * the current step in the tutorial sequence. ranges from -1 to sequence.value.length.
   * where -1 is the state before the tutorial has begun and sequence.value.length is the
   * state after the tutorial has completed.
   */
  step: ComputedRef<number>
  /**
   * set the current step of the tutorial
   * @param step the step to set the tutorial to
   * @throws if step is not within the bounds of the sequence (-1 to sequence.value.length)
   */
  setStep: (step: number) => void

  /**
   * start the tutorial. this will begin the tutorial from step 0
   */
  start: () => void
  /**
   * stop the tutorial. this will end the tutorial and reset all state
   */
  stop: () => void
  /**
   * pause the tutorial. no progress can be made while the tutorial is paused
   */
  paused: Ref<boolean>

  /**
   * whether the tutorial is currently active.
   * changes to true when start is called and false when stop is called
   */
  isActive: ComputedRef<boolean>
  /**
   * whether the tutorial is over.
   * true when the step is sequence.value.length
   */
  isOver: ComputedRef<boolean>
  /**
   * whether the tutorial has begun.
   * true when the step is -1
   */
  hasBegun: ComputedRef<boolean>
}

export type UseGraph = typeof useGraph

export type Graph = ReturnType<UseGraph>

export type GNode = {
  /**
   * unique identifier for the node
   */
  id: string,
  /**
   * it reflects what the user sees in the UI.
   * recommended to be unique.
   */
  label: string,
  /**
   * the x position of the node on the canvas
   */
  x: number,
  /**
   * the y position of the node on the canvas
   */
  y: number,
}

export type GEdge = {
  /**
   * unique identifier for the edge
   */
  id: string,
  /**
   * id of the node that the edge is coming from
   */
  to: string,
  /**
   * id of the node that the edge is going to
   */
  from: string,
  /**
   * the text label that appears on the edge
   */
  label: string,
}

export type Aggregator = SchemaItem[]

export type EdgeGetterOrValue<T> = MaybeGetter<T, [GEdge]>

type MarqueeGraphTypes = 'marquee-box' | 'encapsulated-node-box'
type NodeAnchorGraphTypes = 'node-anchor' | 'link-preview'
type AnnotationGraphTypes = 'annotation'

/**
 * an item that can be fed into the `aggregator` in order to be rendered on the canvas
 */
export type SchemaItem = {
  /**
   * unique identifier for the schema item
   */
  id: string,
  /**
   * the type of graph data this schema item represents (node, edge, etc.)
   */
  graphType: BaseGraphTypes | NodeAnchorGraphTypes | MarqueeGraphTypes | AnnotationGraphTypes,
  /**
   * determines the order in which this schema item is rendered
   * on the canvas. The lower the number, the higher the priority, the higher the priority,
   * the earlier the item is rendered on the canvas.
   * (items with a lower priority score will appear visually underneath those with a higher score)
   */
  priority: number,
  /**
   * the {@link Shape | shape} instance that will be rendered on the canvas
   */
  shape: Shape,
}

export type AdjacencyList = Record<string, string[]>;

export type FullNodeAdjacencyList = Record<GNode['id'], GNode[]>;

export type WeightedAdjacencyList = Record<GNode['id'], (GNode & {
  /**
   * the weight of the edge that connects the key node to the neighbor node
   */
  weight: number
})[]>;

/**
 * creates an adjacency list mapping node ids to nodes along with a added field `weight` that
 * represents the weight of the edge connecting them
 *
 * @param graph the graph instance
 * @param fallbackWeight the weight between two adjacent nodes if the label of the edge connecting them
 * cannot be parsed as a number. defaults to 1
 * @returns an adjacency list using ids of nodes as keys and the full node objects with weights as values
 * @example getWeightedAdjacencyList(graph)
 * // {
 * //   'abc123': [{ id: 'def456', label: 'B', weight: 1, x: 0, y: 0 }],
 * //   'def456': [{ id: 'abc123', label: 'A', weight: 1, x: 100, y: 100 }]
 * // }
 */
export const getWeightedAdjacencyList = (graph: BaseGraph, fallbackWeight = 1) => {
  const adjList = getAdjacencyList(graph);
  const adjListEntries = Object.entries(adjList);

  return adjListEntries.reduce<WeightedAdjacencyList>((acc, [keyNodeId, toNodeIds]) => {
    acc[keyNodeId] = toNodeIds.map(toNodeId => ({
      ...graph.getNode(toNodeId)!,
      weight: getWeightBetweenNodes(keyNodeId, toNodeId, graph, fallbackWeight)
    }))
    return acc;
  }, {});
}

export type AdjacencyLists = ReturnType<typeof useAdjacencyList>;

export type TransitionMatrix = number[][];

export type GraphPlaygroundControls = {
  theme: boolean,
  tutorial: boolean,
  settings: boolean,
  buttons: boolean,
}

export type BasicSearchTrace = {
  currentNodeId?: GNode['id'],
  /**
   * nodes that have already been explored
   */
  visited: Set<GNode['id']>,
  /**
   * a neutral term for stacked or queued nodes
   */
  nextToExplore?: Set<GNode['id']>
}[]

export type BasicSearchSimulationRunner = SimulationRunner<BasicSearchTrace>;

export type DijkstrasResult = number[];

export type DijkstrasMatrixTrace = {
  queue: { node: number, distance: number }[];
  currentNode?: number;
  distances: number[];
}[];

class PriorityQueue {
  private heap: { node: number, distance: number }[] = [];

  constructor() { }

  enqueue(node: number, distance: number) {
    this.heap.push({ node, distance });
    this.bubbleUp(this.heap.length - 1);
  }

  dequeue(): { node: number, distance: number } | undefined {
    if (this.heap.length === 0) return undefined;

    const min = this.heap[0];
    const last = this.heap.pop()!;

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }

    return min;
  }

  private bubbleUp(index: number) {
    const element = this.heap[index];

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (element.distance >= parent.distance) break;

      this.heap[parentIndex] = element;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  private bubbleDown(index: number) {
    const length = this.heap.length;
    const element = this.heap[index];

    while (true) {
      let swap: number | null = null;
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;

      if (leftChildIndex < length) {
        const leftChild = this.heap[leftChildIndex];
        if (leftChild.distance < element.distance) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        const rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild.distance < element.distance) ||
          (swap !== null && rightChild.distance < this.heap[leftChildIndex].distance)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;

      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  peek(): { node: number, distance: number } | undefined {
    return this.heap[0];
  }

  getHeap(): Array<{ node: number, distance: number }> {
    return [...this.heap];
  }
}

export type DijkstrasOutput = {
  startNode: GNode;
  distances: Record<GNode['id'], number>;
}

export type DijkstrasTrace = {
  currentNode?: GNode;
  distances: Record<GNode['id'], number>;
  queue: Set<GNode['id']>;
}[]

export const useDijkstra = (graph: Graph) => {
  const trace = ref<DijkstrasTrace>([]);
  const output = ref<DijkstrasOutput>();
  const { startNode } = state;

  const { transitionMatrix } = useTransitionMatrix(graph);

  const update = () => {
    if (!startNode.value) return
    const startNodeIndex = graph.nodes.value.findIndex(node => node.id === startNode.value!.id)
    if (startNodeIndex === -1) return

    const res = dijkstras(transitionMatrix.value, startNodeIndex)

    // parses out the matrix trace into a more consumable format
    // by mapping the indices back to the actual nodes and node ids
    // it also optimizes the trace for quick lookups

    trace.value = res.trace.map(({ currentNode, distances, queue }) => ({
      currentNode: graph.nodes.value[currentNode ?? -1] ?? undefined,
      distances: Object.fromEntries(
        distances.map((distance, i) => [graph.nodes.value[i].id, distance])
      ),
      queue: new Set(queue.map(i => graph.nodes.value[i.node].id))
    }))

    output.value = {
      startNode: startNode.value,
      distances: Object.fromEntries(
        res.res.map((distance, i) => [graph.nodes.value[i].id, distance])
      )
    }
  }

  watch([startNode, transitionMatrix], update, { immediate: true });

  return {
    output,
    trace: computed(() => trace.value),
  }
};

export type DijkstraSimulationRunner = SimulationRunner<DijkstrasTrace>;

type ColorMapKey = GNode['id'] | GEdge['id'];
type ColorMapValue = Color;
export type ColorMap = Map<ColorMapKey, ColorMapValue>;

export const useMarkupColorizer = (graph: Graph) => {
  const { setTheme, removeAllThemes } = useTheme(graph, MARKUP_USETHEME_ID);

  const colorMap = useLocalStorage('markup-color-map', new Map<ColorMapKey, ColorMapValue>());

  // TODO
  // go through all keys in the colorMap and remove inactive nodes/edges
  // for (const key of colorMap.value.keys()) {
  //   if (!graph.nodes.value[key] && !graph.edges.value[key]) {
  //     colorMap.value.delete(key);
  //   }
  // }

  const colorNode = (node: GNode) => {
    const color = colorMap.value.get(node.id);
    if (!color) return;
    return graph.baseTheme.value.nodeColor;
  }

  const colorNodeBorder = (node: GNode) => {
    const color = colorMap.value.get(node.id);
    if (!color) return;
    if (graph.focus.isFocused(node.id)) return adjustHex(color, 30);
    return color;
  }

  const colorEdge = (edge: GEdge) => {
    const color = colorMap.value.get(edge.id);
    if (!color) return;
    if (graph.focus.isFocused(edge.id)) return adjustHex(color, 30);
    return color;
  };

  const encapsulatedNodeBoxBorderColor = () => {
    const themes: Record<GraphThemeName, Color> = {
      dark: colors.WHITE,
      light: colors.BLACK,
      girl: colors.PURPLE_800,
    }

    return themes[graph.themeName.value] + '80';
  }

  const colorize = () => {
    setTheme('nodeColor', colorNode);

    setTheme('nodeBorderColor', colorNodeBorder);
    setTheme('nodeFocusBorderColor', colorNodeBorder);
    setTheme('nodeAnchorColor', colorNodeBorder);
    setTheme('nodeAnchorColorWhenParentFocused', colorNodeBorder);
    setTheme('edgeColor', colorEdge);

    setTheme('marqueeSelectionBoxColor', colors.TRANSPARENT)
    setTheme('marqueeEncapsulatedNodeBoxBorderColor', encapsulatedNodeBoxBorderColor)
    setTheme('marqueeEncapsulatedNodeBoxColor', colors.TRANSPARENT)
  }

  const decolorize = () => {
    removeAllThemes();
  }

  return {
    colorize,
    decolorize,
    colorMap,
  };
}

export type MarkupColorizerControls = ReturnType<typeof useMarkupColorizer>;

type SizeMapKey = GNode['id'] | GEdge['id'];
type SizeMapValue = MarkupSize;
export type SizeMap = Map<SizeMapKey, SizeMapValue>;

export const useMarkupSizer = (graph: Graph) => {
  const { setTheme, removeAllThemes } = useTheme(graph, MARKUP_USETHEME_ID);

  const sizeMap = useLocalStorage('markup-size-map', new Map<SizeMapKey, SizeMapValue>());

  const sizeNode = (node: GNode) => {
    const size = sizeMap.value.get(node.id);
    if (!size) return;
    return SIZE_TO_RADIUS[size];
  }

  const sizeEdge = (edge: GEdge) => {
    const size = sizeMap.value.get(edge.id);
    if (!size) return;
    return SIZE_TO_WIDTH[size];
  };

  const size = () => {
    setTheme('nodeSize', sizeNode);
    setTheme('edgeWidth', sizeEdge);
  }

  const desize = () => {
    removeAllThemes();
  }

  return {
    size,
    desize,
    sizeMap
  };
};

export type MarkupSize = typeof MARKUP_SIZES[number];

export type TreeFormationOptions = {
  /**
   * the duration of the animation in milliseconds.
   * must be greater than 100
   * @default 250
   */
  durationMs?: number,
  /**
   * the horizontal offset between nodes at the same depth.
   * @default 250
   */
  xOffset?: number,
  /**
   * the vertical offset between nodes at different depths.
   * @default 200
   */
  yOffset?: number,
}

export type AutoTreeOptions = TreeFormationOptions & {
  /**
   * debounce time in milliseconds to wait before reshaping the graph
   * @default 500 // half a second
   */
  debounceMs?: number,
}

export type AutoTreeControls = ReturnType<typeof useAutoTree>;

export type ComponentAdjacencyMap = Map<number, Set<number>>

export type MarkovChain = ReturnType<typeof useMarkovChain>;

export type Parent = Map<string, string>
export type Rank = Map<string, number>

export const kruskal = (graph: Graph) => {
  const { nodes, edges } = graph;
  const { getEdgeWeight } = graph.helpers;

  const find = (parent: Parent, nodeId: string): string => {
    if (parent.get(nodeId) !== nodeId) {
      parent.set(nodeId, find(parent, parent.get(nodeId)!));
    }
    return parent.get(nodeId)!;
  };

  const union = (parent: Parent, rank: Rank, nodeA: string, nodeB: string) => {
    const rootA = find(parent, nodeA);
    const rootB = find(parent, nodeB);

    if (rootA !== rootB) {
      const rankA = rank.get(rootA)!;
      const rankB = rank.get(rootB)!;

      if (rankA < rankB) {
        parent.set(rootA, rootB);
      } else if (rankA > rankB) {
        parent.set(rootB, rootA);
      } else {
        parent.set(rootB, rootA);
        rank.set(rootA, rankA + 1);
      }
    }
  };

  const run = () => {
    const sortedEdges = Object.values(edges.value).sort((edgeA, edgeB) => {
      return getEdgeWeight(edgeA.id) - getEdgeWeight(edgeB.id);
    });

    const parent = new Map<string, string>();
    const rank = new Map<string, number>();

    graph.nodes.value.forEach((node) => {
      parent.set(node.id, node.id);
      rank.set(node.id, 0);
    });

    const mst: GEdge[] = [];
    for (const edge of sortedEdges) {
      const sourceRoot = find(parent, edge.from);
      const targetRoot = find(parent, edge.to);

      if (sourceRoot !== targetRoot) {
        mst.push(edge);
        union(parent, rank, sourceRoot, targetRoot);

        if (mst.length === nodes.value.length - 1) break;
      }
    }
    return mst;
  };

  return run();
}

export type MSTTrace = GEdge[];
export type MSTSimulationControls = SimulationControls<MSTTrace>;
export type MSTSimulationRunner = SimulationRunner<MSTTrace>;

export const useMSTSimulationRunner = (
  graph: Graph,
  trace: MSTSimulationControls['trace']
): MSTSimulationRunner => {
  const simControls = useSimulationControls(trace);
  const { activate, deactivate } = useSimulationTheme(graph, simControls);
  return {
    simControls,
    start: () => {
      activate();
      simControls.start();
    },
    stop: () => {
      deactivate();
      simControls.stop();
    },
  }
}

export type FlowTrace = Record<GEdge['id'], number>[]

export type FlowSimulationControls = SimulationControls<FlowTrace>
export type FlowSimulationRunner = SimulationRunner<FlowTrace>

export const useSimulationRunner = (graph: Graph): FlowSimulationRunner => {
  const { text } = useTextTip();

  const {
    activate: activeEdgeThickener,
    deactivate: deactivateEdgeThickener
  } = useEdgeThickener(graph, FLOW_USETHEME_ID + '-runner')

  const {
    stylize: activateFlowColorizer,
    destylize: deactivateFlowColorizer
  } = useSourceSinkTheme(graph, FLOW_USETHEME_ID + '-runner')

  const { createResidualEdges, cleanupResidualEdges } = useResidualEdges(graph)

  const { sourceNode, sinkNode } = state
  const { trace } = useFordFulkerson(graph)
  const simControls = useSimulationControls(trace, {
    allowEditingDuringPlayback: false,
  })

  const { activate: activateTheme, deactivate: deactivateTheme } = useSimulationTheme(graph, simControls)

  let cancelled = false;

  const start = async () => {
    graph.settings.value.persistent = false;

    activateFlowColorizer()
    activeEdgeThickener()

    if (!sourceNode.value) {
      text.value = 'Select a source node'
      await state.setNode(graph, sourceNode)
    }

    if (cancelled) return

    if (!sinkNode.value) {
      text.value = 'Select a sink node'
      await state.setNode(graph, sinkNode)
    }

    text.value = undefined

    if (cancelled) return

    createResidualEdges()
    activateTheme()

    simControls.start()
  }

  const stop = async () => {
    cancelled = true

    state.cancelNodeSelection.value?.()

    simControls.stop()
    cleanupResidualEdges()
    deactivateTheme()

    deactivateFlowColorizer()
    deactivateEdgeThickener()

    text.value = undefined
    graph.settings.value.persistent = true

    setTimeout(() => cancelled = false, 0)
  }

  return {
    start,
    stop,
    simControls,
  }
}

type WeightMap = Map<GEdge['id'], number>

export type EdgeThickenerControls = ReturnType<typeof useEdgeThickener>;

export type AlgoName = keyof typeof algos

export type Trace = string[]

export type NodeIdToDepth = Map<GNode['id'], number>;

export type Arrow = Line & {
  arrowHeadSize?: ((width: number) => {
    arrowHeadHeight: number,
    perpLineLength: number,
  })
}

export type Circle = {
  id?: string,
  at: Coordinate,
  radius: number,
  color?: string,
  stroke?: Stroke,
  textArea?: TextAreaNoLocation,
}

export type Cross = {
  id?: string,
  at: Coordinate
  size: number
  rotation?: number
  color?: string
  lineWidth?: number
  borderRadius?: number
}

export type Line = {
  id?: string,
  start: Coordinate,
  end: Coordinate,
  width?: number,
  textArea?: TextAreaNoLocation,
  /**
   * offsetFromCenter is used to position text. By default, text is centered on the line.
   * If -10, text will be on the line but 10 units towards the start.
   * If 10, text will be on the line but 10 units away from the start.
   */
  textOffsetFromCenter?: number,
  color?: string,
}

export type Rect = {
  id?: string
  at: Coordinate
  width: number
  height: number
  color?: string
  stroke?: Stroke
  textArea?: TextAreaNoLocation
  borderRadius?: number
  rotation?: number
}

export type Scribble = {
  id?: string;
  type: "draw" | "erase";
  color?: string;
  brushWeight?: number;
  points: Coordinate[];
};

export const SCRIBBLE_DEFAULTS = {
  color: "red",
  brushWeight: 3,
} as const

export const ERASER_BRUSH_WEIGHT = 50

export const scribble = (options: Scribble): Shape => {

  if (options.points.length < 1) {
    throw new Error('not enough points to draw scribble')
  }
  if (options.brushWeight && options.brushWeight < 1) {
    throw new Error('brushWeight must be at least "1"')
  }


  const shapeHitbox = scribbleHitbox(options);
  const efficientHitbox = scribbleEfficientHitbox(options)
  const hitbox = (point: Coordinate) => {
    return shapeHitbox(point)
  }

  const getBoundingBox = getScribbleBoundingBox(options);

  const drawShape = drawScribbleWithCtx(options);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
  }



  return {
    id: options.id ?? generateId(),
    name: 'scribble',

    drawShape,
    draw,

    hitbox,
    shapeHitbox,
    efficientHitbox,
    getBoundingBox,
  }
}

export type Square = {
  id?: string
  at: Coordinate
  size: number
  color?: string
  stroke?: Stroke
  textArea?: TextAreaNoLocation
  borderRadius?: number
  rotation?: number
}

export type Triangle = {
  id?: string;
  pointA: Coordinate;
  pointB: Coordinate;
  pointC: Coordinate;
  color?: string;
  stroke?: Stroke;
  textArea?: TextAreaNoLocation;
};

export const TRIANGLE_DEFAULTS = {
  color: "black",
} as const;

export const triangle = (options: Triangle): Shape => {
  const drawShape = drawTriangleWithCtx(options);
  const shapeHitbox = triangleHitbox(options);
  const textHitbox = triangleTextHitbox(options);
  const efficientHitbox = triangleEfficientHitbox(options);
  const hitbox = (point: Coordinate) => {
    return shapeHitbox(point); // text not implemented yet
  };

  const getBoundingBox = getTriangleBoundingBox(options);

  const drawTextArea = drawTextAreaOnTriangle(options);

  const drawTextAreaMatte = drawTextAreaMatteOnTriangle(options);
  const drawText = drawTextOnTriangle(options);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    drawTextArea?.(ctx);
  };

  return {
    id: options.id ?? generateId(),
    name: "triangle",

    draw,
    drawShape,
    drawTextArea,
    drawTextAreaMatte,
    drawText,

    hitbox,
    shapeHitbox,
    textHitbox,
    efficientHitbox,
    getBoundingBox,
  };
};

export type BoundingBox = Pick<Rect, 'at' | 'width' | 'height'>

export type ShapeName = 'circle' | 'line' | 'square' | 'rect' | 'triangle' | 'arrow' | 'uturn' | 'cross' | 'scribble'

export type Coordinate = {
  x: number,
  y: number,
}

export type TextAreaNoLocation = {
  /**
   * the text areas inner text
   */
  text: Text,
  /**
   * the color of the text area
   */
  color?: string,
  /**
   * the color of the text area when it is engaged
   * IE is converted to a textarea html element for user interaction
   */
  activeColor?: string,
}

export type TextArea = {
  at: Coordinate,
} & TextAreaNoLocation

export type TextFontWeight = 'lighter' | 'normal' | 'bold' | 'bolder'

// the text displayed in the text area
export type Text = {
  content: string,
  fontSize?: number,
  fontWeight?: TextFontWeight,
  color?: string,
}

export type Stroke = {
  color: string,
  width: number,
  /**
 * For dashed border
 *
 * @params
 *
 * dash: [dashLength, gapLength]
 *
*/
  dash?: [number, number]
}

export type UTurn = {
  id?: string,
  at: Coordinate,
  spacing: number,
  upDistance: number,
  downDistance: number,
  rotation: number,
  lineWidth: number,
  color?: string,
  textArea?: TextAreaNoLocation
}

export type ProductDropdownInfo = {
  /**
   * the name of the menu item
   */
  name: string,
  /**
   * the description of the menu item
   */
  description: string,
  /**
   * an image to display in the menu
   */
  thumbnail: string,
  /**
   * the category of the product
   */
  category: ProductCategory,
}

export type SimulationDeclaration = {
  /**
   * the name of the simulation, user facing
   */
  name: string,
  /**
   * the description of the simulation, user facing
   */
  description: string,
  /**
   * an image to display in the simulation selection
   */
  thumbnail: string,
  /**
   * a predicate to determine if the simulation can run on the given graph.
   * returning a string indicates that the simulation cannot run and the string, user facing,
   * is the reason why it cannot. returning true indicates that the simulation can run.
   */
  canRun?: () => true | string,
  /**
   * the runner for the simulation
   */
  runner: SimulationRunner,
}

export type SimulationDeclarationGetter = (graph: Graph) => SimulationDeclaration[]

export type ProductInfo = {
  /**
   * consumed by vue-router in order to add it as an available route
   */
  route: RouteRecordRaw,
  /**
   * the name of the product.
   * used as document title
   */
  name: string,
  /**
   * the description of the product
   */
  description: string,
  /**
   * a unique identifier for the product, cannot contain spaces or special characters
   */
  productId: string,
  /**
   * if defined, the product will be added to the main menu
   * with the properties defined here
   */
  menu?: ProductDropdownInfo,
  /**
   * if defined, this products simulations will be exposed to other products
   */
  simulations?: SimulationDeclarationGetter,
  /**
   * points to a products state, must have a `reset` method that resets the state of
   * the product when invoked
   */
  state?: { reset: () => void },
}

type GNodeTheme = {
  color: Color;
  textColor: Color;
}

export type ProgressOptions = {
  /**
   * at the value in the 0th index, the progress bar will be empty.
   * at the 1st index, the progress bar will be full.
   */
  range: [number, number];
  /**
   * the current value of the progress bar.
   * should be within the range specified in the range prop.
   */
  progress: number;
  /**
   *
   */
  previewProgress?: number;
  /**
   * the time it takes, in milliseconds, for the progress bar
   * to visually adjust to the new progress value.
   * @default 250
   */
  transitionTimeMs?: number;
  /**
   * a css easing function used to transition the progress bar.
   * @default "ease-in-out"
   */
  transitionEasing?: "linear" | "ease-in-out";
  /**
   * the color of the progress bar.
   * @default colors.GRAY_200 // tailwind gray-200
   */
  color?: string;
  /**
   * called when the user clicks on the progress bar to set the progress.
   * @param progress the new progress value.
   */
  onProgressSet?: (progress: number) => void
  onHover?: (progress: number) => void
};

export const PROGRESS_DEFAULTS = {
  transitionTimeMs: 250,
  transitionEasing: "ease-in-out",
} as const;

export type SimulationControls<T extends any[] = any[]> = {
  /**
   * skip forward to the next step.
   * wont do anything if the current step is `lastStep`
   */
  nextStep: () => void
  /**
   * skip backward to the previous step.
   * wont do anything if the current step is 0
   */
  prevStep: () => void

  /**
   * the current trace of the algorithm for which the simulation is being run.
   */
  trace: ComputedRef<T>
  /**
   * the current step of the simulation.
   * ranges from 0 to trace.length where 0 is the state before the algorithm has begun
   * and `lastStep` is the state after the algorithm has completed.
   */
  step: ComputedRef<number>
  /**
   * set the current step of the simulation
   * @param step the step to set the simulation to
   * @throws if step is not between 0 and `lastStep`
   */
  setStep: (step: number) => void

  /**
   * start the simulation. this will begin the simulation from step -1
   */
  start: () => void
  /**
   * stop the simulation. this will end the simulation and reset all state
   */
  stop: () => void
  /**
   * pause the simulation. keeps the playback interval running but stops the step from incrementing
   */
  paused: Ref<boolean>
  /**
   * time, in milliseconds, between each step firing.
   */
  playbackSpeed: Ref<number>

  /**
   * playback speed string value and its corresponding speed in milliseconds
   * @example
   * { label: '1x', value: 1500 }
   */
  playbackSpeedToMs: {
    label: string
    value: number
  }[]

  /**
   * whether the simulation is currently active.
   * changes to true when start is called and false when stop is called
   */
  isActive: ComputedRef<boolean>
  /**
   * whether the simulation is over.
   * true when the step is equal to `lastStep` (trace.length by default)
   */
  isOver: ComputedRef<boolean>
  /**
   * whether the simulation has begun.
   * true when the step is greater than 0
   */
  hasBegun: ComputedRef<boolean>
  /**
   * the last step of the simulation. defaults to trace.length
   */
  lastStep: ComputedRef<number>
}

export type SimulationRunner<T extends any[] = any[]> = {
  /**
   * Start the simulation
   */
  start: () => Promise<void> | void
  /**
   * Stop the simulation
   */
  stop: () => Promise<void> | void
  /**
   * The controls for the simulation
   */
  simControls: SimulationControls<T>
}

type SimulationControlsOptions = {
  /**
   * if true, the user can edit the graph while the simulation is running
   * @default true
   */
  allowEditingDuringPlayback?: boolean;
  /**
   * if set, the simulation will stop when the step reaches this value
   * @default trace.length
   */
  lastStep?: Ref<number>;
};

const DEFAULT_OPTIONS = {
  allowEditingDuringPlayback: true,
} as const;

/**
 * the playback speed in ms per step of the simulation
 */
const DEFAULT_PLAYBACK_SPEED = 1000;

export const useSimulationControls = <T extends any[]>(
  trace: ComputedRef<T>,
  options: SimulationControlsOptions = {}
): SimulationControls<T> => {
  const { allowEditingDuringPlayback, lastStep } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const simLastStep = computed(() => lastStep?.value ?? trace.value.length);
  const step = ref(0);
  const paused = ref(true);
  const playbackSpeed = ref(DEFAULT_PLAYBACK_SPEED);
  const active = ref(false);
  const interval = ref<NodeJS.Timeout | undefined>();
  const isOver = computed(() => step.value === simLastStep.value);
  const hasBegun = computed(() => step.value > 0);

  const playbackSpeedToMs = [
    {
      label: "0.25x",
      value: DEFAULT_PLAYBACK_SPEED / 0.25
    },
    {
      label: "0.5x",
      value: DEFAULT_PLAYBACK_SPEED / 0.5
    },
    {
      label: "1x",
      value: DEFAULT_PLAYBACK_SPEED
    },
    {
      label: "2x",
      value: DEFAULT_PLAYBACK_SPEED / 2
    },
    {
      label: "4x",
      value: DEFAULT_PLAYBACK_SPEED / 4
    },
  ];

  const start = () => {
    if (active.value) return;

    graph.value.settings.value.interactive = allowEditingDuringPlayback;

    paused.value = false;
    active.value = true;
    step.value = 0;

    setupPlaybackInterval();
  };

  const stop = () => {
    if (interval.value) clearInterval(interval.value);
    graph.value.settings.value.interactive = true;
    active.value = false;
  };

  const setupPlaybackInterval = () => {
    if (interval.value) clearInterval(interval.value);
    interval.value = setInterval(() => {
      if (isOver.value || paused.value) return;
      nextStep();
    }, playbackSpeed.value);
  };

  watch(playbackSpeed, () => {
    if (active.value) setupPlaybackInterval();
  });

  const nextStep = () => {
    if (isOver.value) return;
    step.value++;
  };

  const prevStep = () => {
    if (!hasBegun.value) return;
    step.value--;
  };

  const setStep = (newStep: number) => {
    if (newStep < 0 || newStep > simLastStep.value) return;
    step.value = newStep;
  };

  return {
    nextStep,
    prevStep,
    setStep,

    trace,
    step: computed(() => step.value),

    start,
    stop,
    paused,
    playbackSpeed,
    playbackSpeedToMs,

    isOver,
    hasBegun,
    isActive: computed(() => active.value),
    lastStep: simLastStep,
  };
};

export type EasingFunction = (step: number) => number;

export type InterpolateCoordinateOptions = {
  /**
   * the start coordinate pair
   */
  start: Coordinate;
  /**
   * the end coordinate pair
   */
  end: Coordinate;
  /**
   * the number of steps to interpolate between the start and end coordinates (inclusive).
   * must be an integer greater than 0
   */
  numberOfSteps: number;
  /**
   * the easing function to use for interpolation
   * @default "in-out"
   */
  easeFn?: EasingFunction | NamedEasingFunction;
}

export type InterpolateCoordinateOverTimeOptions = Omit<InterpolateCoordinateOptions, 'numberOfSteps'> & {
  /**
   * the duration of the interpolation in milliseconds
   * @default 1000 // (1 second)
   */
  durationMs?: number;
  /**
   * the frame rate of the interpolation in frames per second
   * @default 60
   */
  frameRate?: number;
}

export type Color = string;

export type CanvasCoords = ReturnType<typeof useCanvasCoords>;

export type MaybeGetter<T, K extends any[] = []> = T | ((...arg: K) => T)

export type UnwrapMaybeGetter<T> = T extends MaybeGetter<infer U, infer _> ? U : T

export type MaybeGetterParams<T> = RemoveAnyArray<T extends MaybeGetter<infer _, infer K> ? K : []>

export type ProductMap = Record<ProductInfo['productId'], ProductInfo>

export type ProductInfoWithMenu = ProductInfo & Required<Pick<ProductInfo, "menu">>;

export type ProductCategory = typeof PRODUCT_CATEGORY_RANK[number]

export type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends Record<any, any>
  ? DeepRequired<T[K]>
  : T[K];
};

/**
 * makes only certain keys K in an object T optional
 * @example PartiallyPartial<{ a: number, b: string }, 'a'> // { a?: number, b: string }
 */
export type PartiallyPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * helper types for nested keys
 */
type AcceptableKeys = string | number | symbol
type AcceptableObject = Record<AcceptableKeys, any>

/**
 * get a clean union of all paths in an object
 * @example NestedKeys<{ a: { b: { c: 5 } } }> // 'a' | 'a.b' | 'a.b.c'
 */
export type NestedKeys<T extends AcceptableObject> = T extends AcceptableObject ? {
  [K in keyof T]: K | (
    Extract<T[K], AcceptableObject> extends AcceptableObject
    ? K extends string
    // @ts-ignore this works
    ? `${K}.${NestedKeys<Required<T[K]>>}` : never : never
  )
}[keyof T] : never

type OnlyObj<T> = Extract<T, object>

type OnlyObjNested<T> = {
  [K in keyof T]: OnlyObj<T[K]> extends never ? T[K] : OnlyObj<T[K]>
}

type ExecuteDeepValue<T, Path extends string> =
  Path extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
  ? ExecuteDeepValue<T[Key], Rest>
  : never
  : Path extends keyof T
  ? T[Path]
  : never;

/**
 * get the value of a nested key in an object
 * @example DeepValue<{ a: { b: { c: 5 } } }, 'a.b.c'> // 5
 */
export type DeepValue<T, Path extends string> = ExecuteDeepValue<OnlyObjNested<T>, Path>

/**
 * takes `any[]` out of a union of arrays
 * @example RemoveAnyArray<number[] | any[]> // number[]
 */
export type RemoveAnyArray<T extends any[]> = T extends ['!!!-@-NOT-A-TYPE-@-!!!'][] ? never : T


// HTML mouse and keyboard event types

type EventNames = keyof HTMLElementEventMap

type FilterEventNames<T> = {
  [K in EventNames]: HTMLElementEventMap[K] extends T ? K : never
}[EventNames]

type MouseEventNames = FilterEventNames<MouseEvent>
type KeyboardEventNames = FilterEventNames<KeyboardEvent>

type EventMap<T extends EventNames, E> = Record<T, (ev: E) => void>

export type MouseEventMap = EventMap<MouseEventNames, MouseEvent>
export type KeyboardEventMap = EventMap<KeyboardEventNames, KeyboardEvent>

export type MouseEventEntries = [keyof MouseEventMap, (ev: MouseEvent) => void][]
export type KeyboardEventEntries = [keyof KeyboardEventMap, (ev: KeyboardEvent) => void][]