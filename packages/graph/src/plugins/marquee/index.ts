import { normalizeBoundingBox } from '@magic/shapes/helpers';
import type { BoundingBox, Coordinate } from '@magic/shapes/types/utility';
import { MOUSE_BUTTONS } from '@magic/utils/mouse';

import { ref } from 'vue';
import { computed } from 'vue';

import { BaseEventMap } from '../../base/events.ts';
import { EventHub, createEventHub } from '../../events/createEventHub.ts';
import { mergeEventHubs } from '../../events/mergeEventHubs.ts';
import type { Aggregator } from '../../types.ts';
import { CanvasEventMap, CanvasGraphMouseEvent } from '../canvas/events.ts';
import { CanvasPlugin } from '../canvas/types.ts';
import { FocusEventMap } from '../focus/events.ts';
import { GraphWithFocus } from '../focus/types.ts';
import { MARQUEE_SHAPE_ID } from './constants.ts';
import { MarqueeEventMap, createMarqueeEventRegistry } from './events.ts';
import { getEncapsulatedNodeBox, getSurfaceArea } from './helpers.ts';
import { GraphWithMarquee } from './types.ts';

export const useMarqueePlugin = <
  TransactionWrapperOptions,
  GraphEventMap extends BaseEventMap & CanvasEventMap,
  Plugins extends CanvasPlugin,
>(
  graph: GraphWithFocus<TransactionWrapperOptions, GraphEventMap, Plugins>,
): GraphWithMarquee<TransactionWrapperOptions, GraphEventMap, Plugins> => {
  const marqueeRegistry = createMarqueeEventRegistry();
  const marqueeHub: EventHub<MarqueeEventMap> = createEventHub(marqueeRegistry);
  const events = mergeEventHubs(
    marqueeHub,
    // casting because graph.events could be arbitrarily due to it being stuffed with other events
    // from plugins upstream
    graph.events as EventHub<BaseEventMap & CanvasEventMap & FocusEventMap>,
  );

  const marqueeBox = ref<BoundingBox | undefined>();
  const encapsulatedNodeBox = ref<BoundingBox | undefined>();

  const groupDragCoordinates = ref<Coordinate | undefined>();

  const { hold, release } = graph.pluginHoldController('marquee');

  /**
   * given a mouse event, engages or disengages the marquee box
   */
  const handleMarqueeEngagement = ({
    items,
    coords,
    event,
  }: CanvasGraphMouseEvent) => {
    if (event.button !== MOUSE_BUTTONS.left) return;
    const topItem = items.at(-1);
    if (topItem?.graphType !== 'encapsulated-node-box') release('nodeAnchors');
    if (!topItem) engageMarqueeBox(coords);
  };

  const groupDrag = ({ coords }: CanvasGraphMouseEvent) => {
    if (!groupDragCoordinates.value) return;

    const dx = coords.x - groupDragCoordinates.value.x;
    const dy = coords.y - groupDragCoordinates.value.y;
    groupDragCoordinates.value = coords;
    graph.actions.updateElements({
      nodes: graph.focus.focusedNodes.value.map((node) => ({
        id: node.id,
        values: {
          x: node.x + dx,
          y: node.y + dy,
        },
      })),
    });
    updateEncapsulatedNodeBox();
  };

  const beginGroupDrag = ({ items, coords, event }: CanvasGraphMouseEvent) => {
    if (event.button !== MOUSE_BUTTONS.left) return;
    if (marqueeBox.value) return;

    const topItem = items.at(-1);
    if (topItem?.graphType !== 'encapsulated-node-box') return;

    groupDragCoordinates.value = coords;
    events.emit('onGroupDragStart', graph.focus.focusedNodes.value, coords);
  };

  const endGroupDrag = () => {
    if (!groupDragCoordinates.value) return;
    events.emit(
      'onGroupDrop',
      graph.focus.focusedNodes.value,
      groupDragCoordinates.value,
    );
    groupDragCoordinates.value = undefined;
  };

  const engageMarqueeBox = (startingCoords: Coordinate) => {
    hold('nodeAnchors');
    graph.canvas.cursor.disabled.value = true;
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
    graph.canvas.cursor.disabled.value = false;
    release('nodeAnchors');
    events.emit('onMarqueeEndSelection', finalMarqueeBox);
  };

  const updateMarqueeSelectedItems = (box: BoundingBox) => {
    const surfaceArea = getSurfaceArea(box);
    if (surfaceArea < 100) return;
    const targetedItems: string[] = [];

    for (const { id, shape, graphType } of graph.canvas.aggregator.aggregator
      .value) {
      const { marqueeSelectableGraphTypes } = graph.settings.value;
      if (!marqueeSelectableGraphTypes.includes(graphType)) continue;
      const inSelectionBox = shape.efficientHitbox(box);
      if (inSelectionBox) targetedItems.push(id);
    }

    graph.focus.set(targetedItems);
  };

  const updateEncapsulatedNodeBox = () => {
    encapsulatedNodeBox.value = getEncapsulatedNodeBox(
      graph.focus.focusedNodes.value,
      graph,
    );
  };

  const setMarqueeBoxDimensions = ({ coords }: CanvasGraphMouseEvent) => {
    if (!marqueeBox.value) return;
    const { x, y } = coords;
    marqueeBox.value.width = x - marqueeBox.value.at.x;
    marqueeBox.value.height = y - marqueeBox.value.at.y;
    updateMarqueeSelectedItems(marqueeBox.value);
  };

  const getMarqueeBoxSchema = (box: BoundingBox) => {
    const shape = graph.canvas.shapes.shapes.rect({
      id: MARQUEE_SHAPE_ID,
      ...normalizeBoundingBox(box),
      fillColor: graph.getTheme('marquee.color'),
      stroke: {
        color: graph.getTheme('marquee.borderColor'),
        lineWidth: 2,
      },
    });

    return {
      id: MARQUEE_SHAPE_ID,
      graphType: 'marquee-box',
      shape,
      priority: Infinity,
    } as const;
  };

  const addMarqueeBoxToAggregator = (aggregator: Aggregator) => {
    if (!marqueeBox.value) return aggregator;

    const { width, height } = marqueeBox.value;
    if (width === 0 || height === 0) return aggregator;

    const selectionBoxSchemaItem = getMarqueeBoxSchema(marqueeBox.value);
    aggregator.push(selectionBoxSchemaItem);
    return aggregator;
  };

  const getEncapsulatedNodeBoxSchema = (box: BoundingBox) => {
    const id = 'encapsulated-node-box';
    const shape = graph.canvas.shapes.shapes.rect({
      id,
      ...box,
      fillColor: graph.getTheme('marquee.encapsulatedNodeBoxColor'),
      stroke: {
        color: graph.getTheme('marquee.encapsulatedNodeBoxBorderColor'),
        lineWidth: 2,
      },
    });

    return {
      id,
      graphType: 'encapsulated-node-box',
      shape,
      priority: Infinity,
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

    events.subscribe('onMouseDown', handleMarqueeEngagement);
    events.subscribe('onMouseUp', disengageMarqueeBox);
    events.subscribe('onContextMenu', disengageMarqueeBox);
    events.subscribe('onMouseMove', setMarqueeBoxDimensions);

    events.subscribe('onMouseDown', beginGroupDrag);
    events.subscribe('onMouseUp', endGroupDrag);
    events.subscribe('onMouseMove', groupDrag);

    events.subscribe('onTransactionComplete', updateEncapsulatedNodeBox);
  };

  const deactivate = () => {
    events.unsubscribe('onFocusChange', updateEncapsulatedNodeBox);

    events.unsubscribe('onMouseDown', handleMarqueeEngagement);
    events.unsubscribe('onMouseUp', disengageMarqueeBox);
    events.unsubscribe('onContextMenu', disengageMarqueeBox);
    events.unsubscribe('onMouseMove', setMarqueeBoxDimensions);

    events.unsubscribe('onMouseDown', beginGroupDrag);
    events.unsubscribe('onMouseUp', endGroupDrag);
    events.unsubscribe('onMouseMove', groupDrag);

    events.unsubscribe('onTransactionComplete', updateEncapsulatedNodeBox);

    if (marqueeBox.value) disengageMarqueeBox();
  };

  events.subscribe('onSettingsChange', (diff) => {
    if (diff.marquee === true) activate();
    else if (diff.marquee === false) deactivate();
  });

  if (graph.settings.value.marquee) activate();

  return {
    ...graph,
    events,
    marquee: {
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
  };
};
