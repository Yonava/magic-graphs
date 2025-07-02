import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';
import { onClickOutside, useElementHover } from '@vueuse/core';
import type { GNode, GEdge, Aggregator } from '@graph/types';
import { prioritizeNode } from '@graph/helpers';
import { getNodeSchematic } from '@graph/schematics/node';
import { getEdgeSchematic } from '@graph/schematics/edge';
import { THEMES } from '@graph/themes';
import type { GraphThemeName } from '@graph/themes';
import { getInitialThemeMap } from '@graph/themes/types';
import { delta } from '@utils/deepDelta';
import { clone } from '@utils/clone';
import { getInitialEventBus, generateSubscriber } from '@graph/events';
import type {
  MouseEventMap,
  KeyboardEventMap,
  MouseEventEntries,
  KeyboardEventEntries,
} from '@utils/types';
import { DEFAULT_GRAPH_SETTINGS } from '@graph/settings';
import type { GraphSettings } from '@graph/settings';
import { getThemeResolver } from '@graph/themes/getThemeResolver';
import { useNodeEdgeMap } from './useNodeEdgeMap';
import { useAggregator } from './useAggregator';
import { useGraphCRUD } from './useGraphCRUD';
import { LOAD_GRAPH_OPTIONS_DEFAULTS } from './types';
import type { GraphAtMousePosition, HistoryOption } from './types';
import { useGraphCursor } from './useGraphCursor';
import { useAnimatedShapes } from '@shape/animation';
import { usePluginHoldController } from './usePluginHold';
import type { MagicCanvasProps } from '@canvas/types';
import { getGraphAnimations } from './animations';

export const useBaseGraph = (
  magicCanvas: MagicCanvasProps,
  startupSettings: Partial<GraphSettings> = {},
) => {
  const { canvas, cursorCoordinates } = magicCanvas;

  const themeName = ref<GraphThemeName>('light');

  const themeMap = getInitialThemeMap();
  const getTheme = getThemeResolver(themeName, themeMap);

  const settings = ref<GraphSettings>({
    ...DEFAULT_GRAPH_SETTINGS,
    ...startupSettings,
  });

  const pluginHoldController = usePluginHoldController(settings);

  const eventBus = getInitialEventBus();
  const { subscribe, unsubscribe, emit } = generateSubscriber(eventBus);

  const canvasFocused = ref(true);

  onClickOutside(magicCanvas.canvas, () => {
    canvasFocused.value = false;
  });

  subscribe('onMouseDown', () => {
    const el = document.activeElement;
    if (el instanceof HTMLElement && typeof el.blur === 'function') el.blur();
    canvasFocused.value = true;
  });

  const nodes = ref<GNode[]>([]);
  const edges = ref<GEdge[]>([]);

  const graphAtMousePosition = ref<GraphAtMousePosition>({
    coords: { x: 0, y: 0 },
    items: [],
  });

  const graphCursorControls = useGraphCursor({
    canvas,
    subscribe,
    graphAtMousePosition,
  });

  const updateGraphAtMousePosition = () => graphAtMousePosition.value = {
    coords: cursorCoordinates.value,
    items: getSchemaItemsByCoordinates(cursorCoordinates.value),
  };

  const graphMouseEv = (event: MouseEvent) => ({
    ...graphAtMousePosition.value,
    event,
  });

  const mouseEvents: Partial<MouseEventMap> = {
    click: (ev: MouseEvent) => {
      ev.preventDefault();
      emit('onClick', graphMouseEv(ev));
    },
    mousemove: (ev: MouseEvent) => {
      ev.preventDefault();
      updateGraphAtMousePosition()
      emit('onMouseMove', graphMouseEv(ev));
    },
    mousedown: (ev: MouseEvent) => {
      ev.preventDefault();
      updateGraphAtMousePosition()
      emit('onMouseDown', graphMouseEv(ev));
    },
    mouseup: (ev: MouseEvent) => {
      ev.preventDefault();
      updateGraphAtMousePosition()
      emit('onMouseUp', graphMouseEv(ev));
    },
    dblclick: (ev: MouseEvent) => {
      ev.preventDefault();
      emit('onDblClick', graphMouseEv(ev));
    },
    contextmenu: (ev: MouseEvent) => {
      emit('onContextMenu', graphMouseEv(ev));
    },
  };

  const keyboardEvents: Partial<KeyboardEventMap> = {
    keydown: (ev: KeyboardEvent) => emit('onKeyDown', ev),
    keyup: (ev: KeyboardEvent) => emit('onKeyUp', ev)
  };

  const {
    aggregator,
    subscribeToAggregator,
    updateAggregator,
    getSchemaItemsByCoordinates,
    draw,
  } = useAggregator({ emit });

  const { shapes, autoAnimate, defineTimeline } = useAnimatedShapes()
  const animations = getGraphAnimations(defineTimeline)

  const addNodesAndEdgesToAggregator = (aggregator: Aggregator) => {
    const options = {
      edges,
      getNode,
      getEdge,
      getTheme,
      settings,
      shapes,
    };

    const edgeSchemaItems = edges.value
      .map((edge) => getEdgeSchematic(edge, options))
      .filter(Boolean)
      .map((item, i) => ({ ...item!, priority: i * 10 }))

    const nodeSchemaItems = nodes.value
      .map((node) => getNodeSchematic(node, options))
      .filter(Boolean)
      .map((item, i) => ({ ...item!, priority: i * 10 + 1000 }))

    aggregator.push(...edgeSchemaItems);
    aggregator.push(...nodeSchemaItems);

    return aggregator;
  };

  subscribeToAggregator.push(addNodesAndEdgesToAggregator);

  onMounted(() => {
    if (!canvas.value) {
      throw new Error('canvas element not found');
    }

    for (const [event, listeners] of Object.entries(
      mouseEvents,
    ) as MouseEventEntries) {
      canvas.value.addEventListener(event, listeners);
    }

    for (const [event, listeners] of Object.entries(
      keyboardEvents,
    ) as KeyboardEventEntries) {
      document.addEventListener(event, listeners);
    }
  });

  onBeforeUnmount(() => {
    if (!canvas.value) {
      throw new Error('Canvas element not found');
    }

    for (const [event, listeners] of Object.entries(
      mouseEvents,
    ) as MouseEventEntries) {
      canvas.value.removeEventListener(event, listeners);
    }

    for (const [event, listeners] of Object.entries(
      keyboardEvents,
    ) as KeyboardEventEntries) {
      document.removeEventListener(event, listeners);
    }
  });

  const { nodeIdToNodeMap, edgeIdToEdgeMap } = useNodeEdgeMap(nodes, edges);
  const {
    getNode,
    getEdge,
    addNode,
    addEdge,
    moveNode,
    bulkMoveNode,
    editEdgeLabel,
    removeNode,
    removeEdge,
    bulkAddNode,
    bulkRemoveNode,
    bulkAddEdge,
    bulkRemoveEdge,
  } = useGraphCRUD({
    nodes,
    edges,
    nodeMap: nodeIdToNodeMap,
    edgeMap: edgeIdToEdgeMap,
    emit,
    settings,
    updateGraphAtMousePosition,
    updateAggregator,
    animations,
    autoAnimate,
  });

  const nodeIdToIndex = computed(() =>
    nodes.value.reduce<Map<GNode['id'], number>>((map, node, i) => {
      map.set(node.id, i);
      return map;
    }, new Map()),
  );

  const edgeIdToIndex = computed(() =>
    edges.value.reduce<Map<GEdge['id'], number>>((map, edge, i) => {
      map.set(edge.id, i);
      return map;
    }, new Map()),
  );

  let currHoveredNode: GNode | undefined;
  subscribe('onMouseMove', ({ items }) => {
    const topItem = items.at(-1);
    // TODO change this to better support node anchors
    // that may be dragging over the node
    if (!topItem || topItem.graphType !== 'node') return;
    const node = getNode(topItem.id);
    if (node === currHoveredNode) return;
    emit('onNodeHoverChange', node, currHoveredNode);
    currHoveredNode = node;
  });

  const liftHoveredNodeToTop = (aggregator: Aggregator) => {
    if (!currHoveredNode) return aggregator;
    prioritizeNode(currHoveredNode.id, aggregator);
    return aggregator;
  };

  subscribeToAggregator.push(liftHoveredNodeToTop);

  /**
   * load a graph state into the graph
   * @param graphState - the graph state to load (nodes and edges)
   */
  const load = (
    graphState: { nodes: GNode[]; edges: GEdge[] },
    options?: HistoryOption,
  ) => {
    const previousState = {
      nodes: nodes.value,
      edges: edges.value,
    };

    nodes.value = graphState.nodes;
    edges.value = graphState.edges;

    const historyOptions = {
      ...LOAD_GRAPH_OPTIONS_DEFAULTS,
      ...options,
    };

    emit('onGraphLoaded', previousState, historyOptions);
    emit('onStructureChange');
  };

  /**
   * reset the graph to an empty state with no nodes or edges
   */
  const reset = () => {
    nodes.value = [];
    edges.value = [];
    emit('onGraphReset');
    emit('onStructureChange');
  };

  watch(themeName, async (newThemeName, oldThemeName) => {
    emit('onThemeChange', newThemeName, oldThemeName);
  });

  const activeSettings = ref(clone(settings.value));
  watch(
    settings,
    (newSettings) => {
      const settingsDiff = delta(activeSettings.value, newSettings);
      if (!settingsDiff) return;
      activeSettings.value = clone(settings.value);
      emit('onSettingsChange', settingsDiff);
      if ('isGraphDirected' in settingsDiff) emit('onStructureChange')
    },
    { deep: true },
  );

  return {
    /**
     * all the nodes contained in the graph
     */
    nodes,
    /**
     * all the edges contained in the graph
     */
    edges,

    nodeIdToIndex,
    edgeIdToIndex,

    getNode,
    getEdge,

    addNode,
    addEdge,

    moveNode,
    bulkMoveNode,

    editEdgeLabel,

    removeNode,
    removeEdge,

    bulkAddNode,
    bulkRemoveNode,

    bulkAddEdge,
    bulkRemoveEdge,

    getSchemaItemsByCoordinates,

    /**
     * a mapping of all graph events to a set of their callback functions
     */
    eventBus,
    subscribe,
    unsubscribe,
    emit,

    subscribeToAggregator,
    aggregator,
    updateAggregator,

    pluginHoldController,
    shapes,
    autoAnimate,
    animations,

    baseTheme: computed(() => THEMES[themeName.value]),
    themeName,
    getTheme,
    themeMap,
    settings,

    load,
    reset,

    magicCanvas,
    /**
     * whether the canvas is currently focused in the browser
     */
    canvasFocused,
    /**
     * whether the canvas is currently hovered by the mouse
     */
    canvasHovered: useElementHover(magicCanvas.canvas),

    draw,

    graphAtMousePosition,
    updateGraphAtMousePosition,
    ...graphCursorControls,
  };
};

export type BaseGraph = ReturnType<typeof useBaseGraph>;
