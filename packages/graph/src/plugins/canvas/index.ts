import { MagicCanvasProps } from '@magic/canvas/types';
import { useAnimatedShapes } from '@magic/shapes/animation/index';
import { KeyboardEventEntries, MouseEventEntries } from '@magic/utils/types';
import { onClickOutside, useElementHover } from '@vueuse/core';
import { DeepReadonly } from 'ts-essentials';

import { onBeforeUnmount, onMounted, ref } from 'vue';

import { BaseEventMap } from '../../base/events.ts';
import { BaseGraph } from '../../base/types.ts';
import { EventHub, createEventHub } from '../../events/createEventHub.ts';
import { mergeEventHubs } from '../../events/mergeEventHubs.ts';
import { Aggregator } from '../../types.ts';
import { useGraphCursor } from './cursor/useGraphCursor.ts';
import { emitKeyboardEvents, emitMouseEvents } from './emitDOMEvents.ts';
import {
  CanvasEventMap,
  CanvasGraphMouseEvent,
  createCanvasEventRegistry,
} from './events.ts';
import { GraphAtMousePosition, GraphWithCanvas } from './types.ts';
import { useAggregator } from './useAggregator.ts';

export const CANVAS_EVENT_ID = 'canvas';

export const useCanvasPlugin = <
  TransactionWrapperOptions,
  EventMap extends BaseEventMap,
  Plugins,
>(
  graph: BaseGraph<TransactionWrapperOptions, EventMap, Plugins>,
  magicCanvas: MagicCanvasProps,
): GraphWithCanvas<TransactionWrapperOptions, EventMap, Plugins> => {
  const canvasRegistry = createCanvasEventRegistry();
  const canvasHub: EventHub<CanvasEventMap> = createEventHub(canvasRegistry);
  const events = mergeEventHubs(
    canvasHub,
    // casting because graph.events could be arbitrarily broad due to it being stuffed with other events
    // from plugins upstream
    graph.events as EventHub<BaseEventMap>,
  );

  const aggregator = useAggregator({ emit: events.emit });

  const canvasFocused = ref(true);

  const graphAtMousePosition: GraphAtMousePosition = {
    coords: { x: 0, y: 0 },
    items: [],
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
    // ensure aggregator has an up to date snapshot of the canvas
    aggregator.updateAggregator();
    updateGraphAtMousePosition();
  });

  const cursor = useGraphCursor({
    canvas: magicCanvas.canvas,
    subscribe: events.subscribe,
    graphAtMousePosition,
  });

  const updateGraphAtMousePosition = (): DeepReadonly<GraphAtMousePosition> => {
    const coords = magicCanvas.cursorCoordinates.value;
    const roundedCoords = { x: Math.round(coords.x), y: Math.round(coords.y) };
    const items = aggregator.getSchemaItemsByCoordinates(roundedCoords);
    graphAtMousePosition.coords = roundedCoords;
    graphAtMousePosition.items = items;
    events.emit('onGraphCursorUpdate', graphAtMousePosition);
    return graphAtMousePosition;
  };

  const graphMouseEvent = (event: MouseEvent): CanvasGraphMouseEvent => ({
    ...graphAtMousePosition,
    event,
  });

  const mouseEvents = emitMouseEvents(
    graphMouseEvent,
    events.emit,
    updateGraphAtMousePosition,
  );

  const keyboardEvents = emitKeyboardEvents(events.emit);

  const shapes = useAnimatedShapes();

  const addNodesAndEdgesToAggregator = (aggregator: Aggregator) => {
    const edgeSchemaItems = graph.edges.value
      .map((edge) => {
        const shape = graph.getTheme('edge.base.shape', edge, {
          ...graph,
          shapes,
        });
        if (!shape) return;

        return {
          shape: shape,
          id: edge.id,
          graphType: 'edge',
        } as const;
      })
      .filter(Boolean)
      .map((item, i) => ({ ...item!, priority: i * 10 }));

    const nodeSchemaItems = graph.nodes.value
      .map((node) => {
        const shape = graph.getTheme('node.base.shape', node, {
          ...graph,
          shapes,
        });
        if (!shape) return;

        return {
          shape: shape,
          id: node.id,
          graphType: 'node',
        } as const;
      })
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

  return {
    ...graph,
    events,
    canvas: {
      aggregator,
      shapes,

      magicCanvas,

      canvasFocused,
      canvasHovered: useElementHover(magicCanvas.canvas),

      graphAtMousePosition,
      updateGraphAtMousePosition,

      cursor,
    },
  };
};
