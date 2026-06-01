import type { MagicCanvasProps } from '@magic/canvas/types';
import { useAnimatedShapes } from '@magic/shapes/animation/index';
import { clone } from '@magic/utils/clone';
import { deepMerge } from '@magic/utils/deepMerge';
import { delta } from '@magic/utils/delta/index';
import type {
  KeyboardEventEntries,
  KeyboardEventMap,
  MouseEventEntries,
  MouseEventMap,
} from '@magic/utils/types';
import { onClickOutside, useElementHover } from '@vueuse/core';

import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import { createEventHub } from '../events/createEventHub.ts';
import { prioritizeNode } from '../helpers/prioritization.ts';
import { getEdgeSchematic } from '../schematics/edge.ts';
import { getNodeSchematic } from '../schematics/node.ts';
import { DEFAULT_GRAPH_SETTINGS } from '../settings/index.ts';
import type { GraphSettings } from '../settings/index.ts';
import { getThemeResolver } from '../themes/getThemeResolver.ts';
import { THEME_LOADOUTS } from '../themes/index.ts';
import type { GraphThemeName } from '../themes/index.ts';
import { GraphInterface, getInitialThemeMap } from '../themes/types.ts';
import type { Aggregator, GEdge, GNode } from '../types.ts';
import { useGraphActions } from './actions/useGraphActions.ts';
import {
  type GraphAnimations,
  getDefaultGraphAnimations,
} from './animations.ts';
import { useGraphCursor } from './cursor/useGraphCursor.ts';
import { createBaseEventBus } from './events.ts';
import { useCommitTransaction } from './transaction/useCommitTransaction.ts';
import { useTransactionSucceeded } from './transaction/useTransactionSucceeded.ts';
import type { BaseGraph, GraphAtMousePosition } from './types.ts';
import { useAggregator } from './useAggregator.ts';
import { useNodeEdgeMap } from './useNodeEdgeMap.ts';
import { usePluginHoldController } from './usePluginHold.ts';

export const useBaseGraph = (
  magicCanvas: MagicCanvasProps,
  startupSettings: Partial<GraphSettings> = {},
): BaseGraph => {
  const themeName = ref<GraphThemeName>('light');

  const themeMap = getInitialThemeMap();
  const getTheme = getThemeResolver(themeName, themeMap);

  const settings = ref<GraphSettings>({
    ...DEFAULT_GRAPH_SETTINGS,
    ...startupSettings,
  });

  const eventBus = createBaseEventBus();
  const events = createEventHub(eventBus);

  const aggregator = useAggregator(events);

  const canvasFocused = ref(true);

  onClickOutside(magicCanvas.canvas, () => {
    canvasFocused.value = false;
  });

  events.subscribe('onMouseDown', () => {
    const el = document.activeElement;
    if (el instanceof HTMLElement && typeof el.blur === 'function') el.blur();
    canvasFocused.value = true;
  });

  const nodes = ref<GNode[]>([]);
  const edges = ref<GEdge[]>([]);
  const { nodeIdToNodeMap, edgeIdToEdgeMap } = useNodeEdgeMap(nodes, edges);
  const getNode = (id: GNode['id']) => nodeIdToNodeMap.value.get(id);
  const getEdge = (id: GEdge['id']) => edgeIdToEdgeMap.value.get(id);

  const graphAtMousePosition = ref<GraphAtMousePosition>({
    coords: { x: 0, y: 0 },
    items: [],
  });

  const cursor = useGraphCursor({
    magicCanvas,
    subscribe: events.subscribe,
    graphAtMousePosition,
  });

  const updateGraphAtMousePosition = () =>
    (graphAtMousePosition.value = {
      coords: magicCanvas.cursorCoordinates.value,
      items: aggregator.getSchemaItemsByCoordinates(
        magicCanvas.cursorCoordinates.value,
      ),
    });

  const graphMouseEv = (event: MouseEvent) => ({
    ...graphAtMousePosition.value,
    event,
  });

  const mouseEvents: Partial<MouseEventMap> = {
    click: (ev: MouseEvent) => {
      ev.preventDefault();
      events.emit('onClick', graphMouseEv(ev));
    },
    mousemove: (ev: MouseEvent) => {
      ev.preventDefault();
      updateGraphAtMousePosition();
      events.emit('onMouseMove', graphMouseEv(ev));
    },
    mousedown: (ev: MouseEvent) => {
      ev.preventDefault();
      updateGraphAtMousePosition();
      events.emit('onMouseDown', graphMouseEv(ev));
    },
    mouseup: (ev: MouseEvent) => {
      ev.preventDefault();
      updateGraphAtMousePosition();
      events.emit('onMouseUp', graphMouseEv(ev));
    },
    dblclick: (ev: MouseEvent) => {
      ev.preventDefault();
      events.emit('onDblClick', graphMouseEv(ev));
    },
    contextmenu: (ev: MouseEvent) => {
      events.emit('onContextMenu', graphMouseEv(ev));
    },
  };

  const keyboardEvents: Partial<KeyboardEventMap> = {
    keydown: (ev: KeyboardEvent) => events.emit('onKeyDown', ev),
    keyup: (ev: KeyboardEvent) => events.emit('onKeyUp', ev),
  };

  const shapes = useAnimatedShapes();
  const animations: GraphAnimations = deepMerge(
    // TODO: @Yonava fix bad type
    getDefaultGraphAnimations(shapes.defineTimeline as any),
    // TODO: @Yonava fix bad type
    settings.value.animations(shapes.defineTimeline as any),
  );

  const addNodesAndEdgesToAggregator = (aggregator: Aggregator) => {
    const options: GraphInterface = {
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
      .map((item, i) => ({ ...item!, priority: i * 10 }));

    const nodeSchemaItems = nodes.value
      .map((node) => getNodeSchematic(node, options))
      .filter(Boolean)
      .map((item, i) => ({ ...item!, priority: i * 10 + 1000 }));

    aggregator.push(...edgeSchemaItems);
    aggregator.push(...nodeSchemaItems);

    return aggregator;
  };

  aggregator.transformers.push(addNodesAndEdgesToAggregator);

  onMounted(() => {
    if (!magicCanvas.canvas.value) {
      throw new Error('Canvas element not found in DOM');
    }

    for (const [event, listeners] of Object.entries(
      mouseEvents,
    ) as MouseEventEntries) {
      magicCanvas.canvas.value.addEventListener(event, listeners);
    }

    for (const [event, listeners] of Object.entries(
      keyboardEvents,
    ) as KeyboardEventEntries) {
      document.addEventListener(event, listeners);
    }
  });

  onBeforeUnmount(() => {
    if (!magicCanvas.canvas.value) {
      throw new Error('Canvas element not found in DOM');
    }

    for (const [event, listeners] of Object.entries(
      mouseEvents,
    ) as MouseEventEntries) {
      magicCanvas.canvas.value.removeEventListener(event, listeners);
    }

    for (const [event, listeners] of Object.entries(
      keyboardEvents,
    ) as KeyboardEventEntries) {
      document.removeEventListener(event, listeners);
    }
  });

  const onTransactionSucceeded = useTransactionSucceeded({
    edges,
    nodes,
    emit: events.emit,
    updateAggregator: aggregator.updateAggregator,
    updateGraphAtMousePosition,
  });
  const commitTransaction = useCommitTransaction({
    getGraphState: () => ({ nodes: nodes.value, edges: edges.value }),
    onTransactionSucceeded,
  });

  const actions = useGraphActions({
    commitTransaction,
    graphState: {
      nodes,
      edges,
    },
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
  events.subscribe('onMouseMove', ({ items }) => {
    const topItem = items.at(-1);
    // TODO change this to better support node anchors
    // that may be dragging over the node
    if (!topItem || topItem.graphType !== 'node') return;
    const node = getNode(topItem.id);
    if (node === currHoveredNode) return;
    events.emit('onNodeHoverChange', node, currHoveredNode);
    currHoveredNode = node;
  });

  const liftHoveredNodeToTop = (aggregator: Aggregator) => {
    if (!currHoveredNode) return aggregator;
    prioritizeNode(currHoveredNode.id, aggregator);
    return aggregator;
  };

  aggregator.transformers.push(liftHoveredNodeToTop);

  watch(themeName, async (newThemeName, oldThemeName) => {
    events.emit('onThemeChange', newThemeName, oldThemeName);
  });

  const activeSettings = ref(clone(settings.value));
  watch(
    settings,
    (newSettings) => {
      const settingsDiff = delta(activeSettings.value, newSettings);
      if (!settingsDiff) return;
      activeSettings.value = clone(settings.value);
      events.emit('onSettingsChange', settingsDiff);
      if ('isGraphDirected' in settingsDiff) events.emit('onStructureChange');
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

    actions,

    events,

    aggregator,

    pluginHoldController: usePluginHoldController(settings),
    shapes,

    baseTheme: computed(() => THEME_LOADOUTS[themeName.value]),
    themeName,
    getTheme,
    themeMap,
    settings,

    magicCanvas,
    /**
     * whether the canvas is currently focused in the browser
     */
    canvasFocused,
    /**
     * whether the canvas is currently hovered by the mouse
     */
    canvasHovered: useElementHover(magicCanvas.canvas),

    graphAtMousePosition,
    updateGraphAtMousePosition,
    cursor,
  };
};
