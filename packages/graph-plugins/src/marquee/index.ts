import { createEventHub } from '@magic/graph-primitives/events/createEventHub';
import { mergeEventHubs } from '@magic/graph-primitives/events/mergeEventHubs';
import { createThemeController } from '@magic/graph-plugins-shared/theme/createThemeController';
import { CoreEventMap } from '@magic/graph-core/events';
import { normalizeBoundingBox } from '@magic/shapes/helpers';
import type { BoundingBox, Coordinate } from '@magic/shapes/types/utility';
import { MOUSE_BUTTONS } from '@magic/utils/mouse';
import { DeepReadonly } from 'ts-essentials';

import { ref } from 'vue';
import { computed } from 'vue';

import { ANCHOR_PLUGIN_ID } from '../anchors/constants.ts';
import { Aggregator, CanvasElement } from '../canvas/aggregator/types.ts';
import { CanvasEventMap, CanvasGraphMouseEvent } from '../canvas/events.ts';
import { CANVAS_ELEMENT_CURSOR_FIELD_KEY } from '../canvas/setupCanvasCursor.ts';
import { GraphUnderCursor } from '../canvas/types.ts';
import { FocusEventMap } from '../focus/events.ts';
import { NODE_DRAG_CANVAS_ELEMENT_DATA_FIELD } from '../node-drag/constants.ts';
import { MARQUEE_PLUGIN_ID, MARQUEE_SHAPE_ID } from './constants.ts';
import { MarqueeEventMap, createMarqueeEventRegistry } from './events.ts';
import { getSelectionBox, getSurfaceArea } from './helpers.ts';
import { createMarqueeThemeOverrides } from './themes.ts';
import { MarqueePlugin } from './types.ts';

export const marquee: MarqueePlugin = ({
  controls,
  events: graphEventMap,
  actions,
  getters,
}) => {
  const marqueeEventRegistry = createMarqueeEventRegistry();
  const marqueeEventHub = createEventHub(marqueeEventRegistry);
  const events = mergeEventHubs<
    MarqueeEventMap,
    CoreEventMap & CanvasEventMap & FocusEventMap
  >(marqueeEventHub, graphEventMap);

  const theme = createThemeController(createMarqueeThemeOverrides());

  const marqueeBox = ref<BoundingBox | undefined>();
  const selectionBox = ref<BoundingBox | undefined>();

  /**
   * given a mouse event, engages or disengages the marquee box
   */
  const handleMarqueeEngagement = ({
    elements,
    coords,
    event,
  }: CanvasGraphMouseEvent) => {
    if (event.button !== MOUSE_BUTTONS.left) return;
    const topItem = elements.at(-1);
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

    for (const { id, shape } of controls.canvas.aggregator.aggregator.value) {
      const inSelectionBox = shape.efficientHitbox(box);
      if (inSelectionBox) targetedItems.push(id);
    }

    controls.focus.set(targetedItems);
  };

  const updateEncapsulatedNodeBox = () => {
    selectionBox.value = getSelectionBox(controls);
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
    const shape = controls.canvas.shapes.shapes.rect({
      id: MARQUEE_SHAPE_ID,
      ...normalizeBoundingBox(box),
      fillColor: theme._resolveToken('marquee.drag.color'),
      stroke: {
        color: theme._resolveToken('marquee.drag.border.color'),
        lineWidth: theme._resolveToken('marquee.drag.border.width'),
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

  const getSelectionBoxSchema = (box: BoundingBox): CanvasElement => {
    const id = 'encapsulated-node-box';
    const shape = controls.canvas.shapes.shapes.rect({
      id,
      ...box,
      fillColor: theme._resolveToken('marquee.selection.color'),
      stroke: {
        color: theme._resolveToken('marquee.selection.border.color'),
        lineWidth: theme._resolveToken('marquee.selection.border.width'),
      },
    });

    return {
      id,
      graphType: 'encapsulated-node-box',
      shape,
      priority: 3,
      data: {
        [NODE_DRAG_CANVAS_ELEMENT_DATA_FIELD]:
          controls.focus.focusedNodes.value.map((n) => n.id),
        [CANVAS_ELEMENT_CURSOR_FIELD_KEY]: theme._resolveToken(
          'marquee.selection.cursor',
        ),
      },
    };
  };

  const addEncapsulatedNodeBoxToAggregator = (aggregator: Aggregator) => {
    if (!selectionBox.value) return aggregator;

    const { width, height } = selectionBox.value;
    if (width === 0 || height === 0) return aggregator;

    const nodeBoxSchema = getSelectionBoxSchema(selectionBox.value);

    aggregator.push(nodeBoxSchema);
    return aggregator;
  };

  controls.canvas.aggregator.transformers.push(
    addEncapsulatedNodeBoxToAggregator,
  );
  controls.canvas.aggregator.transformers.push(addMarqueeBoxToAggregator);

  const enable = () => {
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

  const disable = () => {
    events.unsubscribe('onFocusChange', updateEncapsulatedNodeBox);

    events.unhandle('onMouseDown', handleMarqueeEngagement);
    events.unhandle('onMouseUp', disengageMarqueeBox);
    events.unhandle('onContextMenu', disengageMarqueeBox);
    events.unhandle('onMouseMove', setMarqueeBoxDimensions);

    events.unsubscribe('onNodeMoveStream', updateEncapsulatedNodeBox);

    if (marqueeBox.value) disengageMarqueeBox();
  };

  enable();

  return {
    events,
    actions,
    getters,
    controls: {
      marquee: {
        updateEncapsulatedNodeBox,
        activelySelecting: computed(() => !!marqueeBox.value),
        theme,
        lifecycle: {
          enable,
          disable,
        },
      },
    },
  };
};
