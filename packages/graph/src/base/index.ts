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
import { useElementHover } from '@vueuse/core';

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
import type { BaseGraph } from './types.ts';
import { useNodeEdgeMap } from './useNodeEdgeMap.ts';
import { usePluginHoldController } from './usePluginHold.ts';

export const useBaseGraph = (
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

  const nodes = ref<GNode[]>([]);
  const edges = ref<GEdge[]>([]);
  const { nodeIdToNodeMap, edgeIdToEdgeMap } = useNodeEdgeMap(nodes, edges);
  const getNode = (id: GNode['id']) => nodeIdToNodeMap.value.get(id);
  const getEdge = (id: GEdge['id']) => edgeIdToEdgeMap.value.get(id);

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
