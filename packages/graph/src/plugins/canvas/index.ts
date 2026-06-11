import { MagicCanvasProps } from '@magic/canvas/types';
import { useAnimatedShapes } from '@magic/shapes/animation/index';
import { KeyboardEventEntries, MouseEventEntries } from '@magic/utils/types';
import { onClickOutside, useElementHover } from '@vueuse/core';
import { DeepReadonly } from 'ts-essentials';

import { onBeforeUnmount, onMounted, ref } from 'vue';

import { CoreEventMap } from '../../core/events.ts';
import { CoreGraph } from '../../core/types.ts';
import { EventHub, createEventHub } from '../../events/createEventHub.ts';
import { mergeEventHubs } from '../../events/mergeEventHubs.ts';
import { emitKeyboardEvents, emitMouseEvents } from './emitDOMEvents.ts';
import {
  CanvasEventMap,
  CanvasGraphMouseEvent,
  createCanvasEventRegistry,
} from './events.ts';
import { Aggregator, GraphUnderCursor, GraphWithCanvas } from './types.ts';
import { useAggregator } from './useAggregator.ts';
import { useGraphCursor } from './useGraphCursor.ts';

export const CANVAS_EVENT_ID = 'canvas';

export const useCanvasPlugin = <
  TransactionWrapperOptions,
  EventMap extends CoreEventMap,
  Plugins,
>(
  graph: CoreGraph<TransactionWrapperOptions, EventMap, Plugins>,
  magicCanvas: MagicCanvasProps,
): GraphWithCanvas<TransactionWrapperOptions, EventMap, Plugins> => {
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

  const cursor = useGraphCursor({
    canvas: magicCanvas.canvas,
    subscribe: events.subscribe,
    getNode: graph.getNode,
    getTheme: graph.getTheme,
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
        const shape = graph.getTheme('edge.default.shape', edge, {
          ...graph,
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
        const shape = graph.getTheme('node.default.shape', node, {
          ...graph,
          shapes,
        });
        if (!shape) return;

        return {
          shape,
          id: node.id,
          graphType: 'node',
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

  return {
    ...graph,
    events,
    canvas: {
      aggregator,
      shapes,

      magicCanvas,

      focused: canvasFocused,
      hovered: useElementHover(magicCanvas.canvas),

      graphUnderCursor,
      forceUpdateGraphUnderCursor,

      cursor,
    },
  };
};
