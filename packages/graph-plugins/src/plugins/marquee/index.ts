import { CoreEventMap } from '@magic/graph/core/events';
import { createEventHub } from '@magic/graph/events/createEventHub';
import { mergeEventHubs } from '@magic/graph/events/mergeEventHubs';
import { GraphPlugin } from '@magic/graph/plugins/types';
import { normalizeBoundingBox } from '@magic/shapes/helpers';
import type { BoundingBox, Coordinate } from '@magic/shapes/types/utility';
import { MOUSE_BUTTONS } from '@magic/utils/mouse';
import { DeepReadonly } from 'ts-essentials';

import { ref } from 'vue';
import { computed } from 'vue';

import { ANCHOR_PLUGIN_ID } from '../anchors/constants.ts';
import { CanvasEventMap, CanvasGraphMouseEvent } from '../canvas/events.ts';
import { CANVAS_ELEMENT_CURSOR_FIELD_KEY } from '../canvas/setupCanvasCursor.ts';
import {
  Aggregator,
  CanvasElement,
  CanvasPlugin,
  GraphUnderCursor,
} from '../canvas/types.ts';
import { FocusEventMap } from '../focus/events.ts';
import { FocusPlugin } from '../focus/types.ts';
import { NODE_DRAG_CANVAS_ELEMENT_DATA_FIELD } from '../node-drag/constants.ts';
import { MARQUEE_PLUGIN_ID, MARQUEE_SHAPE_ID } from './constants.ts';
import { MarqueeEventMap, createMarqueeEventRegistry } from './events.ts';
import { getEncapsulatedNodeBox, getSurfaceArea } from './helpers.ts';
import { MarqueeControls } from './types.ts';

export type MarqueePlugin = GraphPlugin<{
  actions: {};
  controls: { marquee: MarqueeControls };
  events: MarqueeEventMap;
  dependsOn: [CanvasPlugin, FocusPlugin];
}>;

export const marquee: MarqueePlugin = (graph, graphEventMap, actions) => {
  const marqueeEventRegistry = createMarqueeEventRegistry();
  const marqueeEventHub = createEventHub(marqueeEventRegistry);
  const events = mergeEventHubs<
    MarqueeEventMap,
    CoreEventMap & CanvasEventMap & FocusEventMap
  >(marqueeEventHub, graphEventMap);

  const marqueeBox = ref<BoundingBox | undefined>();
  const encapsulatedNodeBox = ref<BoundingBox | undefined>();

  /**
   * given a mouse event, engages or disengages the marquee box
   */
  const handleMarqueeEngagement = ({
    elements: items,
    coords,
    event,
  }: CanvasGraphMouseEvent) => {
    if (event.button !== MOUSE_BUTTONS.left) return;
    const topItem = items.at(-1);
    if (!topItem) engageMarqueeBox(coords);
  };

  const engageMarqueeBox = (startingCoords: Coordinate) => {
    marqueeBox.value = {
      at: startingCoords,
      width: 0,
      height: 0,
    };
    events.emit('onMarqueeBeginSelection', startingCoords);
  };

  const disengageMarqueeBox = () => {
    if (!marqueeBox.value) return;
    const finalMarqueeBox = marqueeBox.value;
    marqueeBox.value = undefined;
    events.emit('onMarqueeEndSelection', finalMarqueeBox);
  };

  const updateMarqueeSelectedItems = (box: BoundingBox) => {
    const surfaceArea = getSurfaceArea(box);
    if (surfaceArea < 100) return;
    const targetedItems: string[] = [];

    for (const { id, shape } of graph.canvas.aggregator.aggregator.value) {
      const inSelectionBox = shape.efficientHitbox(box);
      if (inSelectionBox) targetedItems.push(id);
    }

    graph.focus.set(targetedItems);
  };

  const updateEncapsulatedNodeBox = () => {
    encapsulatedNodeBox.value = getEncapsulatedNodeBox(graph);
  };

  const setMarqueeBoxDimensions = (
    { coords }: DeepReadonly<GraphUnderCursor>,
    consume: () => void,
  ) => {
    if (!marqueeBox.value) return;
    consume();

    const { x, y } = coords;
    marqueeBox.value.width = x - marqueeBox.value.at.x;
    marqueeBox.value.height = y - marqueeBox.value.at.y;
    updateMarqueeSelectedItems(marqueeBox.value);
  };

  const getMarqueeBoxCanvasElement = (box: BoundingBox): CanvasElement => {
    const shape = graph.canvas.shapes.shapes.rect({
      id: MARQUEE_SHAPE_ID,
      ...normalizeBoundingBox(box),
      fillColor: graph.canvas.theme._resolveToken('marquee.color'),
      stroke: {
        color: graph.canvas.theme._resolveToken('marquee.borderColor'),
        lineWidth: 2,
      },
    });

    return {
      id: MARQUEE_SHAPE_ID,
      graphType: 'marquee-box',
      shape,
      priority: Infinity,
    };
  };

  const addMarqueeBoxToAggregator = (aggregator: Aggregator) => {
    if (!marqueeBox.value) return aggregator;

    const { width, height } = marqueeBox.value;
    if (width === 0 || height === 0) return aggregator;

    const selectionBoxCanvasElement = getMarqueeBoxCanvasElement(
      marqueeBox.value,
    );
    aggregator.push(selectionBoxCanvasElement);
    return aggregator;
  };

  const getEncapsulatedNodeBoxSchema = (box: BoundingBox) => {
    const id = 'encapsulated-node-box';
    const shape = graph.canvas.shapes.shapes.rect({
      id,
      ...box,
      fillColor: graph.canvas.theme._resolveToken(
        'marquee.encapsulatedNodeBox.color',
      ),
      stroke: {
        color: graph.canvas.theme._resolveToken(
          'marquee.encapsulatedNodeBox.borderColor',
        ),
        lineWidth: 2,
      },
    });

    return {
      id,
      graphType: 'encapsulated-node-box',
      shape,
      priority: Infinity,
      data: {
        [NODE_DRAG_CANVAS_ELEMENT_DATA_FIELD]:
          graph.focus.focusedNodes.value.map((n) => n.id),
        [CANVAS_ELEMENT_CURSOR_FIELD_KEY]: graph.canvas.theme._resolveToken(
          'marquee.encapsulatedNodeBox.cursor',
        ),
      },
    } as const;
  };

  const addEncapsulatedNodeBoxToAggregator = (aggregator: Aggregator) => {
    if (!encapsulatedNodeBox.value) return aggregator;

    const { width, height } = encapsulatedNodeBox.value;
    if (width === 0 || height === 0) return aggregator;

    const nodeBoxSchema = getEncapsulatedNodeBoxSchema(
      encapsulatedNodeBox.value,
    );

    aggregator.push(nodeBoxSchema);
    return aggregator;
  };

  graph.canvas.aggregator.transformers.push(addEncapsulatedNodeBoxToAggregator);
  graph.canvas.aggregator.transformers.push(addMarqueeBoxToAggregator);

  const activate = () => {
    events.subscribe('onFocusChange', updateEncapsulatedNodeBox);

    events.handle('onMouseDown', handleMarqueeEngagement, MARQUEE_PLUGIN_ID);
    events.handle('onMouseUp', disengageMarqueeBox, MARQUEE_PLUGIN_ID);
    events.handle('onContextMenu', disengageMarqueeBox, MARQUEE_PLUGIN_ID);

    // if mouse is held down, resize the marquee box around the cursor position
    events.handle(
      'onGraphUnderCursorChange',
      setMarqueeBoxDimensions,
      MARQUEE_PLUGIN_ID,
      { before: [ANCHOR_PLUGIN_ID] },
    );

    events.subscribe('onNodeMoveStream', updateEncapsulatedNodeBox);
  };

  const deactivate = () => {
    events.unsubscribe('onFocusChange', updateEncapsulatedNodeBox);

    events.unhandle('onMouseDown', handleMarqueeEngagement);
    events.unhandle('onMouseUp', disengageMarqueeBox);
    events.unhandle('onContextMenu', disengageMarqueeBox);
    events.unhandle('onMouseMove', setMarqueeBoxDimensions);

    events.unsubscribe('onNodeMoveStream', updateEncapsulatedNodeBox);

    if (marqueeBox.value) disengageMarqueeBox();
  };

  activate();

  return {
    events,
    actions,
    controls: {
      marquee: {
        activate,
        deactivate,
        /**
         * updates the bounding box around the nodes that are currently focused.
         * use this when you are changing theme or position outside of the standard supported use cases
         */
        updateEncapsulatedNodeBox,
        /**
         * true when the marquee box is being actively sized by user
         */
        activelySelecting: computed(() => !!marqueeBox.value),
      },
    },
  };
};
