import { MagicCanvasProps } from '@magic/canvas/types';
import { useAnimatedShapes } from '@magic/shapes/animation/index';
import { deepMerge } from '@magic/utils/deepMerge';
import { KeyboardEventEntries, MouseEventEntries } from '@magic/utils/types';
import { onClickOutside, useElementHover } from '@vueuse/core';

import { onBeforeUnmount, onMounted, ref } from 'vue';

import {
  GraphAnimations,
  getDefaultGraphAnimations,
} from '../../base/animations.ts';
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
  createCanvasEventBus,
} from './events.ts';
import { GraphAtMousePosition, GraphWithCanvas } from './types.ts';
import { useAggregator } from './useAggregator.ts';

export const useCanvasPlugin = <
  TransactionWrapperOptions,
  EventMap extends BaseEventMap,
  Plugins,
>(
  graph: BaseGraph<TransactionWrapperOptions, EventMap, Plugins>,
  magicCanvas: MagicCanvasProps,
): GraphWithCanvas<TransactionWrapperOptions, EventMap, Plugins> => {
  const canvasBus = createCanvasEventBus();
  const canvasHub: EventHub<CanvasEventMap> = createEventHub(canvasBus);
  const events = mergeEventHubs(
    canvasHub,
    // casting because graph.events could be arbitrarily broad due to it being stuffed with other events
    // from plugins upstream
    graph.events as EventHub<BaseEventMap>,
  );

  const aggregator = useAggregator({ emit: events.emit });

  const canvasFocused = ref(true);

  const graphAtMousePosition = ref<GraphAtMousePosition>({
    coords: { x: 0, y: 0 },
    items: [],
  });

  onClickOutside(magicCanvas.canvas, () => {
    canvasFocused.value = false;
  });

  events.subscribe('onMouseDown', () => {
    const el = document.activeElement;
    if (el instanceof HTMLElement && typeof el.blur === 'function') el.blur();
    canvasFocused.value = true;
  });

  const cursor = useGraphCursor({
    canvas: magicCanvas.canvas,
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

  const graphMouseEvent = (event: MouseEvent): CanvasGraphMouseEvent => ({
    ...graphAtMousePosition.value,
    event,
  });

  const mouseEvents = emitMouseEvents(
    graphMouseEvent,
    events.emit,
    updateGraphAtMousePosition,
  );

  const keyboardEvents = emitKeyboardEvents(events.emit);

  const shapes = useAnimatedShapes();
  const animations: GraphAnimations = deepMerge(
    getDefaultGraphAnimations(shapes.defineTimeline),
    graph.settings.value.animations(shapes.defineTimeline),
  );

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
