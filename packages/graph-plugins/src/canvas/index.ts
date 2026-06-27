import { MagicCanvasProps } from '@magic/canvas/types';
import { createEventHub } from '@magic/graph-core-infra/events/createEventHub';
import { mergeEventHubs } from '@magic/graph-core-infra/events/mergeEventHubs';
import { createThemeController } from '@magic/graph-plugins-shared/theme/createThemeController';
import { CoreEventMap } from '@magic/graph/events';
import { useAnimatedShapes } from '@magic/shapes/animation/index';
import { cross } from '@magic/shapes/shapes/cross/index';
import { KeyboardEventEntries, MouseEventEntries } from '@magic/utils/types';
import { onClickOutside, useElementHover } from '@vueuse/core';
import { DeepReadonly } from 'ts-essentials';

import { onBeforeUnmount, onMounted, ref } from 'vue';

import { createAggregator } from './aggregator/createAggregator.ts';
import { CANVAS_PLUGIN_ID } from './constants.ts';
import { emitKeyboardEvents, emitMouseEvents } from './emitDOMEvents.ts';
import {
  CanvasEventMap,
  CanvasGraphMouseEvent,
  createCanvasEventRegistry,
} from './events.ts';
import { createNodeCanvasElementPriorityGetter } from './nodeCanvasElementPriority.ts';
import { setupCanvasCursor } from './setupCanvasCursor.ts';
import { setupOnHoveredElementChangeEvent } from './setupHoveredElement.ts';
import { createCanvasDetectors, createCanvasThemeOverrides } from './themes.ts';
import { CanvasPlugin, GraphUnderCursor } from './types.ts';

export const canvas =
  (magicCanvas: MagicCanvasProps): CanvasPlugin =>
  ({ controls, events: graphEventHub, actions, getters }) => {
    const canvasEventRegistry = createCanvasEventRegistry();
    const canvasEventHub = createEventHub(canvasEventRegistry);
    const events = mergeEventHubs<CanvasEventMap, CoreEventMap>(
      canvasEventHub,
      graphEventHub,
    );

    const aggregator = createAggregator({ emit: events.emit });

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

    const theme = createThemeController(createCanvasThemeOverrides());

    setupCanvasCursor({
      canvas: magicCanvas.canvas,
      subscribe: events.subscribe,
      getNode: getters.getNode,
      resolveToken: theme._resolveToken,
      graphUnderCursor,
    });

    setupOnHoveredElementChangeEvent(events);

    // went with max+1 instead of closed rotation for node hovers since rotation requires
    // redistributing z values across all nodes, which breaks when new nodes arrive with a default z that
    // collides with the existing distribution. max+1 gives permanent promotion
    // without touching other nodes and works fine since node z-scored get normalized for rendering anyway.
    const setHoveredNode = (nodeId: string) => {
      const maxZ = controls.nodes.value.reduce(
        (max, n) => Math.max(max, controls.positions.get(n.id).z),
        -Infinity,
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
      canvas.style.backgroundColor = theme._resolveToken('canvas.color');
    });

    let getNodePriority = createNodeCanvasElementPriorityGetter({
      nodes: controls.nodes.value,
      positions: controls.positions,
    });
    events.subscribe('onBeforeDraw', () => {
      getNodePriority = createNodeCanvasElementPriorityGetter({
        nodes: controls.nodes.value,
        positions: controls.positions,
      });
    });

    magicCanvas.draw.backgroundPattern.value = (ctx, at, alpha) =>
      cross({
        at,
        size: 12,
        lineWidth: 1,
        fillColor: theme._resolveToken('canvas.patternColor') + alpha,
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

          getNodePriority: () => getNodePriority,

          theme: {
            ...theme,
            detectors: createCanvasDetectors(theme._resolveToken),
          },
        },
      },
      actions,
      events,
      onAfterInit: () => {
        const weightLayer = theme.createLayer(
          CANVAS_PLUGIN_ID + '/theme/edge-weight',
        );
        weightLayer.set('edge.default.text.content', (edge) =>
          getters.getEdge(edge.id).weight.toFraction(),
        );
      },
    };
  };
