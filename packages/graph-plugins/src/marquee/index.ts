import { normalizeBoundingBox } from '@canvas/primitives/helpers';
import type { BoundingBox, Coordinate } from '@canvas/primitives/types/utility';
import { MOUSE_BUTTONS } from '@core/utils/mouse';
import { CoreEventMap } from '@graph/core/events';
import { createThemeController } from '@graph/plugins-shared/theme';
import { createEventHub } from '@graph/primitives/events/createEventHub';
import { mergeEventHubs } from '@graph/primitives/events/mergeEventHubs';
import { StructuralEventMap } from '@graph/primitives/transactions/types';
import { DeepReadonly } from 'ts-essentials';

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
    CoreEventMap & StructuralEventMap & CanvasEventMap & FocusEventMap
  >(marqueeEventHub, graphEventMap);

  const theme = createThemeController(createMarqueeThemeOverrides());

  let marqueeBox: BoundingBox | undefined = undefined;
  let selectionBox: BoundingBox | undefined = undefined;

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
    marqueeBox = {
      at: startingCoords,
      width: 0,
      height: 0,
    };
    events.emit('onMarqueeBeginSelection', startingCoords);
  };

  const disengageMarqueeBox = () => {
    if (!marqueeBox) return;
    const finalMarqueeBox = marqueeBox;
    marqueeBox = undefined;
    events.emit('onMarqueeEndSelection', finalMarqueeBox);
  };

  const updateMarqueeSelectedItems = (box: BoundingBox) => {
    const surfaceArea = getSurfaceArea(box);
    if (surfaceArea < 100) return;
    const targetedItems: string[] = [];

    for (const { id, shape } of controls.canvas.aggregator.aggregator()) {
      const inSelectionBox = shape.efficientHitbox(box);
      if (inSelectionBox) targetedItems.push(id);
    }

    controls.focus.set(targetedItems);
  };

  const updateSelectionBox = () => {
    selectionBox = getSelectionBox(controls);
  };

  const setMarqueeBoxDimensions = (
    { coords }: DeepReadonly<GraphUnderCursor>,
    consume: () => void,
  ) => {
    if (!marqueeBox) return;
    consume();

    const { x, y } = coords;
    marqueeBox.width = x - marqueeBox.at.x;
    marqueeBox.height = y - marqueeBox.at.y;
    updateMarqueeSelectedItems(marqueeBox);
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
      shape,
      priority: Infinity,
    };
  };

  const addMarqueeBoxToAggregator = (aggregator: Aggregator) => {
    if (!marqueeBox) return aggregator;

    const { width, height } = marqueeBox;
    if (width === 0 || height === 0) return aggregator;

    const selectionBoxCanvasElement = getMarqueeBoxCanvasElement(marqueeBox);
    aggregator.push(selectionBoxCanvasElement);
    return aggregator;
  };

  const getSelectionBoxSchema = (box: BoundingBox): CanvasElement => {
    const id = 'selection-box';
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
      shape,
      priority: 3,
      data: {
        [NODE_DRAG_CANVAS_ELEMENT_DATA_FIELD]: controls.focus
          .focusedNodes()
          .map((n) => n.id),
        [CANVAS_ELEMENT_CURSOR_FIELD_KEY]: theme._resolveToken(
          'marquee.selection.cursor',
        ),
      },
    };
  };

  const addSelectionBoxToAggregator = (aggregator: Aggregator) => {
    if (!selectionBox) return aggregator;

    const { width, height } = selectionBox;
    if (width === 0 || height === 0) return aggregator;

    const selectionBoxSchema = getSelectionBoxSchema(selectionBox);

    aggregator.push(selectionBoxSchema);
    return aggregator;
  };

  controls.canvas.aggregator.transformers.push(addSelectionBoxToAggregator);
  controls.canvas.aggregator.transformers.push(addMarqueeBoxToAggregator);

  const enable = () => {
    events.subscribe('onFocusChange', updateSelectionBox);

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

    events.subscribe('onNodeMoveStream', updateSelectionBox);
  };

  const disable = () => {
    events.unsubscribe('onFocusChange', updateSelectionBox);

    events.unhandle('onMouseDown', handleMarqueeEngagement);
    events.unhandle('onMouseUp', disengageMarqueeBox);
    events.unhandle('onContextMenu', disengageMarqueeBox);
    events.unhandle('onMouseMove', setMarqueeBoxDimensions);

    events.unsubscribe('onNodeMoveStream', updateSelectionBox);

    disengageMarqueeBox();
  };

  enable();

  return {
    name: 'marquee',
    events,
    actions,
    getters,
    controls: {
      theme,
      lifecycle: {
        enable,
        disable,
      },
    },
  };
};
