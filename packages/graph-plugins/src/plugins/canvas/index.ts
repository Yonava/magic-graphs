import { MagicCanvasProps } from '@magic/canvas/types';
import { CoreEventMap } from '@magic/graph/core/events';
import { EventHub, createEventHub } from '@magic/graph/events/createEventHub';
import { mergeEventHubs } from '@magic/graph/events/mergeEventHubs';
import { GraphPlugin } from '@magic/graph/plugins/types';
import { useAnimatedShapes } from '@magic/shapes/animation/index';
import { cross } from '@magic/shapes/shapes/cross/index';
import { KeyboardEventEntries, MouseEventEntries } from '@magic/utils/types';
import { onClickOutside, useElementHover } from '@vueuse/core';
import { DeepReadonly } from 'ts-essentials';

import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

import { emitKeyboardEvents, emitMouseEvents } from './emitDOMEvents.ts';
import {
  CanvasEventMap,
  CanvasGraphMouseEvent,
  createCanvasEventRegistry,
} from './events.ts';
import {
  CANVAS_ELEMENT_CURSOR_FIELD_KEY,
  setupCanvasCursor,
} from './setupCanvasCursor.ts';
import { createLayer } from './themes/createLayer.ts';
import { createTokenResolver } from './themes/createTokenResolver.ts';
import { ALL_THEME_PRESETS, ThemePreset } from './themes/index.ts';
import { createThemeOverrides } from './themes/types.ts';
import { Aggregator, CanvasPluginControls, GraphUnderCursor } from './types.ts';
import { useAggregator } from './useAggregator.ts';

export const CANVAS_EVENT_ID = 'canvas';

type CanvasPlugin = GraphPlugin<CanvasPluginControls>;

export const canvas =
  (magicCanvas: MagicCanvasProps): CanvasPlugin =>
  (graph) => {
    const canvasRegistry = createCanvasEventRegistry();
    const canvasHub: EventHub<CanvasEventMap> = createEventHub(canvasRegistry);
    const events = mergeEventHubs(
      canvasHub,
      // casting because graph.events could be arbitrarily broad due to it being stuffed with other events
      // from plugins upstream
      graph.events as EventHub<CoreEventMap>,
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

    events.subscribe('onTransactionComplete', (transaction) => {
      if (transaction.updatedEdges.length || transaction.updatedNodes.length) {
        // TODO remove when updates/mutations are removed transactions system
        // prevents onGraphUnderCursorChange spam when handlers subscribe to the
        // onGraphUnderCursorChange event. If this wasn't there, mouse move dom events
        // would fire off an event, which would trigger the handlers in drag (for example)
        // to fire off a update for the node, then that would land here retriggering the
        // updateGraphAtMousePosition call resulting in duplicate event spam
        return;
      }

      forceUpdateGraphUnderCursor();
    });

    const activeThemePreset = ref<ThemePreset>('light');
    const themeOverrides = createThemeOverrides();
    const resolveToken = createTokenResolver(activeThemePreset, themeOverrides);

    setupCanvasCursor({
      canvas: magicCanvas.canvas,
      subscribe: events.subscribe,
      getNode: graph.getNode,
      resolveToken,
      graphUnderCursor,
    });

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
      const edgeCanvasElements = graph.edges.value
        .map((edge) => {
          const shape = resolveToken('edge.default.shape', edge, {
            ...graph,
            resolveToken,
            shapes,
          });
          if (!shape) return;

          return {
            shape,
            id: edge.id,
            graphType: 'edge',
          } as const;
        })
        .filter(Boolean)
        .map((item, i) => ({ ...item!, priority: i * 10 }));

      const nodeCanvasElements = graph.nodes.value
        .map((node) => {
          const shape = resolveToken('node.default.shape', node, {
            ...graph,
            resolveToken,
            shapes,
          });
          if (!shape) return;

          return {
            shape,
            id: node.id,
            graphType: 'node',
            data: {
              [CANVAS_ELEMENT_CURSOR_FIELD_KEY]: resolveToken(
                'node.default.cursor',
                node,
              ),
            },
          } as const;
        })
        .filter(Boolean)
        .map((item, i) => ({ ...item!, priority: i * 10 + 1000 }));

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
    };
  };
