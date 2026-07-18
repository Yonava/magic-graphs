import { createAnimatedShapes } from '@canvas/primitives/animation/index';
import { cross } from '@canvas/primitives/shapes/cross/index';
import { CanvasProps } from '@canvas/surface/types';
import { KeyboardEventEntries, MouseEventEntries } from '@core/utils/types';
import { CoreEventMap } from '@graph/core/events';
import { createThemeController } from '@graph/plugins-shared/theme';
import { createEventHub } from '@graph/primitives/events/createEventHub';
import { mergeEventHubs } from '@graph/primitives/events/mergeEventHubs';
import { StructuralEventMap } from '@graph/primitives/transactions/types';
import { DeepReadonly } from 'ts-essentials';

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
  (magicCanvas: CanvasProps): CanvasPlugin =>
  ({ controls, events: graphEventHub, actions, getters }) => {
    const canvasEventRegistry = createCanvasEventRegistry();
    const canvasEventHub = createEventHub(canvasEventRegistry);
    const events = mergeEventHubs<
      CanvasEventMap,
      CoreEventMap & StructuralEventMap
    >(canvasEventHub, graphEventHub);

    const aggregator = createAggregator({ emit: events.emit });

    const graphUnderCursor: GraphUnderCursor = {
      coords: { x: 0, y: 0 },
      elements: [],
    };

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
      const maxZ = controls.nodes.reduce(
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

    const shapes = createAnimatedShapes();

    magicCanvas.lifecycleEvents.subscribe('onMounted', () => {
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

    magicCanvas.lifecycleEvents.subscribe('onBeforeUnmount', () => {
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

    magicCanvas.draw.backgroundPattern.value = (ctx, at, alpha) => {
      cross({
        at,
        size: 12,
        lineWidth: 1,
        fillColor: theme._resolveToken('canvas.patternColor', at, alpha),
      }).draw(ctx);
    };

    events.subscribe('onDraw', () => {
      const canvas = magicCanvas.canvas.value;
      if (!canvas) return;
      canvas.style.backgroundColor = theme._resolveToken('canvas.color');
    });

    let getNodePriority = createNodeCanvasElementPriorityGetter({
      nodes: controls.nodes,
      positions: controls.positions,
    });
    events.subscribe('onBeforeDraw', () => {
      getNodePriority = createNodeCanvasElementPriorityGetter({
        nodes: controls.nodes,
        positions: controls.positions,
      });
    });

    return {
      name: 'canvas',
      getters,
      controls: {
        aggregator,
        shapes,

        magicCanvas,

        graphUnderCursor,
        forceUpdateGraphUnderCursor,

        getNodePriority: () => getNodePriority,

        theme: {
          ...theme,
          detectors: createCanvasDetectors(theme._resolveToken),
        },
      },
      transit: {
        encode: () => {
          const camera = magicCanvas.camera.state;
          return {
            panX: camera.panX.value,
            panY: camera.panY.value,
            zoom: camera.zoom.value,
          };
        },
        decode: (data) => {
          const camera = magicCanvas.camera.state;
          camera.panX.value = data.panX;
          camera.panY.value = data.panY;
          camera.zoom.value = data.zoom;
        },
        validate: (data) => true,
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
