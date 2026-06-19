import { MagicCanvasProps } from '@magic/canvas/types';
import { CoreEventMap } from '@magic/graph/core/events';
import { createEventHub } from '@magic/graph/events/createEventHub';
import { mergeEventHubs } from '@magic/graph/events/mergeEventHubs';
import { useAnimatedShapes } from '@magic/shapes/animation/index';
import { cross } from '@magic/shapes/shapes/cross/index';
import { nullThrows } from '@magic/utils/assert';
import { KeyboardEventEntries, MouseEventEntries } from '@magic/utils/types';
import { onClickOutside, useElementHover } from '@vueuse/core';
import { DeepReadonly } from 'ts-essentials';

import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

import { CANVAS_PLUGIN_ID } from './constants.ts';
import { emitKeyboardEvents, emitMouseEvents } from './emitDOMEvents.ts';
import {
  CanvasEventMap,
  CanvasGraphMouseEvent,
  createCanvasEventRegistry,
} from './events.ts';
import { getNodeZScores } from './nodeZScores.ts';
import {
  CANVAS_ELEMENT_CURSOR_FIELD_KEY,
  setupCanvasCursor,
} from './setupCanvasCursor.ts';
import { setupOnHoveredElementChangeEvent } from './setupHoveredElement.ts';
import { createLayer } from './themes/createLayer.ts';
import { createTokenResolver } from './themes/createTokenResolver.ts';
import { ALL_THEME_PRESETS, ThemePreset } from './themes/index.ts';
import { createThemeOverrides } from './themes/types.ts';
import { Aggregator, CanvasPlugin, GraphUnderCursor } from './types.ts';
import { useAggregator } from './useAggregator.ts';

export const canvas =
  (magicCanvas: MagicCanvasProps): CanvasPlugin =>
  (controls, graphEventHub, actions, getters) => {
    const canvasEventRegistry = createCanvasEventRegistry();
    const canvasEventHub = createEventHub(canvasEventRegistry);
    const events = mergeEventHubs<CanvasEventMap, CoreEventMap>(
      canvasEventHub,
      graphEventHub,
    );

    const aggregator = useAggregator({ emit: events.emit });

    const canvasFocused = ref(true);

    const graphUnderCursor: GraphUnderCursor = {
      coords: { x: 0, y: 0 },
      elements: [],
    };

    onClickOutside(magicCanvas.canvas, () => {
      canvasFocused.value = false;
    });

    events.subscribe('onMouseDown', () => {
      const el = document.activeElement;
      if (el instanceof HTMLElement && typeof el.blur === 'function') el.blur();
      canvasFocused.value = true;
    });

    events.subscribe('onTransactionComplete', () => {
      forceUpdateGraphUnderCursor();
    });

    const activeThemePreset = ref<ThemePreset>('light');
    const themeOverrides = createThemeOverrides();
    const resolveToken = createTokenResolver(activeThemePreset, themeOverrides);

    const weightLayer = createLayer(
      themeOverrides,
      CANVAS_PLUGIN_ID + '/theme/edge-weight',
    );
    weightLayer.set('edge.default.text', (edge) =>
      getters.getEdge(edge.id).weight.toFraction(),
    );
    weightLayer.set('edge.focus.text', (edge) =>
      getters.getEdge(edge.id).weight.toFraction(),
    );

    setupCanvasCursor({
      canvas: magicCanvas.canvas,
      subscribe: events.subscribe,
      getNode: getters.getNode,
      resolveToken,
      graphUnderCursor,
    });

    setupOnHoveredElementChangeEvent(events);

    // went with max+1 instead of closed rotation for node hovers since rotation requires
    // redistributing z values across all nodes, which breaks when new nodes arrive with a default z that
    // collides with the existing distribution. max+1 gives permanent promotion
    // without touching other nodes and works fine since node z-scored get normalized for rendering anyway.
    const setHoveredNode = (nodeId: string) => {
      const maxZ = Math.max(
        ...controls.nodes.value.map((n) => controls.positions.get(n.id).z),
      );
      controls.positions.set({ nodeId, update: { z: maxZ + 1 } });
    };

    events.handle(
      'onHoveredElementChange',
      (hoveredEl) => {
        if (!hoveredEl) return;
        const { id } = hoveredEl;
        if (controls.isNode(id)) setHoveredNode(id);
      },
      CANVAS_PLUGIN_ID,
    );

    const forceUpdateGraphUnderCursor = (): DeepReadonly<GraphUnderCursor> => {
      const coords = magicCanvas.cursorCoordinates.value;
      graphUnderCursor.coords = coords;

      aggregator.updateAggregator();
      const newElements = aggregator.getCanvasElementsAtCoordinate(coords);
      graphUnderCursor.elements = newElements;

      events.emit('onGraphUnderCursorChange', graphUnderCursor);
      return graphUnderCursor;
    };

    const graphMouseEvent = (event: MouseEvent): CanvasGraphMouseEvent => ({
      ...graphUnderCursor,
      event,
    });

    const mouseEvents = emitMouseEvents(
      graphMouseEvent,
      events.emit,
      forceUpdateGraphUnderCursor,
    );

    const keyboardEvents = emitKeyboardEvents(events.emit);

    const shapes = useAnimatedShapes();

    const addNodesAndEdgesToAggregator = (aggregator: Aggregator) => {
      const edgeCanvasElements = controls.edges.value
        .map((edge) => {
          const shape = resolveToken('edge.default.shape', edge, {
            ...controls,
            ...getters,
            resolveToken,
            shapes,
          });
          if (!shape) return;

          return {
            shape,
            id: edge.id,
            graphType: 'edge',
            priority: 1,
          } as const;
        })
        .filter((el) => !!el);

      const nodeZScores = getNodeZScores({
        nodes: controls.nodes.value,
        positions: controls.positions,
      });

      const nodeCanvasElements = controls.nodes.value
        .map((node) => {
          const shape = resolveToken('node.default.shape', node, {
            ...controls,
            ...getters,
            resolveToken,
            shapes,
          });
          if (!shape) return;

          return {
            shape,
            id: node.id,
            graphType: 'node',
            priority:
              2 +
              nullThrows(nodeZScores.get(node.id), 'node z score not found'),
            data: {
              [CANVAS_ELEMENT_CURSOR_FIELD_KEY]: resolveToken(
                'node.default.cursor',
                node,
              ),
            },
          } as const;
        })
        .filter((el) => !!el);

      aggregator.push(...edgeCanvasElements);
      aggregator.push(...nodeCanvasElements);

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

    events.subscribe('onDraw', () => {
      const canvas = magicCanvas.canvas.value;
      if (!canvas) return;
      canvas.style.backgroundColor = resolveToken('canvas.color');
    });

    magicCanvas.draw.backgroundPattern.value = (ctx, at, alpha) =>
      cross({
        at,
        size: 12,
        lineWidth: 1,
        fillColor: resolveToken('canvas.patternColor') + alpha,
      }).draw(ctx);

    return {
      getters,
      controls: {
        canvas: {
          aggregator,
          shapes,

          magicCanvas,

          focused: canvasFocused,
          hovered: useElementHover(magicCanvas.canvas),

          graphUnderCursor,
          forceUpdateGraphUnderCursor,

          theme: {
            resolvedPreset: computed(
              () => ALL_THEME_PRESETS[activeThemePreset.value],
            ),
            activePreset: activeThemePreset,
            _resolveToken: resolveToken,
            _overrides: themeOverrides,
            createLayer: (layerId) => createLayer(themeOverrides, layerId),
          },
        },
      },
      actions,
      events,
    };
  };
