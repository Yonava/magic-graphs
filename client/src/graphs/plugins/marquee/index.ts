import { ref } from 'vue';
import type { Aggregator } from '@graph/types';
import type { BoundingBox, Coordinate } from '@shape/types/utility';
import type { BaseGraph } from '@graph/base';
import type { GraphMouseEvent } from '@graph/base/types';
import type { GraphFocusPlugin } from '../focus';
import { getEncapsulatedNodeBox } from './helpers';
import { normalizeBoundingBox } from '@shape/helpers';
import { computed } from 'vue';
import { MOUSE_BUTTONS } from '@utils/mouse';

export const useMarquee = (graph: BaseGraph & GraphFocusPlugin) => {
  const marqueeBox = ref<BoundingBox | undefined>();
  const encapsulatedNodeBox = ref<BoundingBox | undefined>();

  const groupDragCoordinates = ref<Coordinate | undefined>();

  const { hold, release } = graph.pluginHoldController('marquee')

  const getSurfaceArea = (box: BoundingBox) => {
    const { width, height } = box;
    return Math.abs(width * height);
  };

  /**
   * given a mouse event, engages or disengages the marquee box
   */
  const handleMarqueeEngagement = ({
    items,
    coords,
    event,
  }: GraphMouseEvent) => {
    if (event.button !== MOUSE_BUTTONS.left) return;
    const topItem = items.at(-1);
    if (topItem?.graphType !== 'encapsulated-node-box') release('nodeAnchors')
    if (!topItem) engageMarqueeBox(coords);
  };

  const groupDrag = ({ coords }: GraphMouseEvent) => {
    if (!groupDragCoordinates.value) return;

    const dx = coords.x - groupDragCoordinates.value.x;
    const dy = coords.y - groupDragCoordinates.value.y;
    groupDragCoordinates.value = coords;
    for (const node of graph.focus.focusedNodes.value) {
      graph.moveNode(node.id, {
        x: node.x + dx,
        y: node.y + dy,
      });
    }
    updateEncapsulatedNodeBox();
  };

  const beginGroupDrag = ({ items, coords, event }: GraphMouseEvent) => {
    if (event.button !== MOUSE_BUTTONS.left) return;
    if (marqueeBox.value) return;

    const topItem = items.at(-1);
    if (topItem?.graphType !== 'encapsulated-node-box') return;

    groupDragCoordinates.value = coords;
    graph.emit('onGroupDragStart', graph.focus.focusedNodes.value, coords);
  };

  const endGroupDrag = () => {
    if (!groupDragCoordinates.value) return;
    graph.emit(
      'onGroupDrop',
      graph.focus.focusedNodes.value,
      groupDragCoordinates.value,
    );
    groupDragCoordinates.value = undefined;
  };

  const engageMarqueeBox = (startingCoords: Coordinate) => {
    hold('nodeAnchors')
    graph.graphCursorDisabled.value = true;
    marqueeBox.value = {
      at: startingCoords,
      width: 0,
      height: 0,
    };
    graph.emit('onMarqueeBeginSelection', startingCoords);
  };

  const disengageMarqueeBox = () => {
    if (!marqueeBox.value) return;
    const finalMarqueeBox = marqueeBox.value;
    marqueeBox.value = undefined;
    graph.graphCursorDisabled.value = false;
    release('nodeAnchors')
    graph.emit('onMarqueeEndSelection', finalMarqueeBox);
  };

  const updateMarqueeSelectedItems = (box: BoundingBox) => {
    const surfaceArea = getSurfaceArea(box);
    if (surfaceArea < 100) return;
    const targetedItems: string[] = [];

    for (const { id, shape, graphType } of graph.aggregator.value) {
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

  const setMarqueeBoxDimensions = ({ coords }: GraphMouseEvent) => {
    if (!marqueeBox.value) return;
    const { x, y } = coords;
    marqueeBox.value.width = x - marqueeBox.value.at.x;
    marqueeBox.value.height = y - marqueeBox.value.at.y;
    updateMarqueeSelectedItems(marqueeBox.value);
  };

  const getMarqueeBoxSchema = (box: BoundingBox) => {
    const id = 'marquee-box'
    const shape = graph.shapes.rect({
      id,
      ...normalizeBoundingBox(box),
      fillColor: graph.getTheme("marqueeSelectionBoxColor"),
      stroke: {
        color: graph.getTheme("marqueeSelectionBoxBorderColor"),
        lineWidth: 2,
      },
    });

    return {
      id,
      graphType: "marquee-box",
      shape,
      priority: Infinity,
    } as const;
  };

  const addMarqueeBoxToAggregator = (aggregator: Aggregator) => {
    if (!marqueeBox.value) return aggregator;

    const { width, height } = marqueeBox.value
    if (width === 0 || height === 0) return aggregator

    const selectionBoxSchemaItem = getMarqueeBoxSchema(marqueeBox.value);
    aggregator.push(selectionBoxSchemaItem);
    return aggregator;
  };

  const getEncapsulatedNodeBoxSchema = (box: BoundingBox) => {
    const id = "encapsulated-node-box"
    const shape = graph.shapes.rect({
      id,
      ...box,
      fillColor: graph.getTheme("marqueeEncapsulatedNodeBoxColor"),
      stroke: {
        color: graph.getTheme("marqueeEncapsulatedNodeBoxBorderColor"),
        lineWidth: 2,
      },
    });

    return {
      id,
      graphType: "encapsulated-node-box",
      shape,
      priority: Infinity,
    } as const;
  };

  const addEncapsulatedNodeBoxToAggregator = (aggregator: Aggregator) => {
    if (!encapsulatedNodeBox.value) return aggregator;

    const { width, height } = encapsulatedNodeBox.value
    if (width === 0 || height === 0) return aggregator

    const nodeBoxSchema = getEncapsulatedNodeBoxSchema(
      encapsulatedNodeBox.value,
    );

    aggregator.push(nodeBoxSchema);
    return aggregator;
  };

  graph.subscribeToAggregator.push(addEncapsulatedNodeBoxToAggregator);
  graph.subscribeToAggregator.push(addMarqueeBoxToAggregator);

  const activate = () => {
    graph.subscribe('onFocusChange', updateEncapsulatedNodeBox);

    graph.subscribe('onMouseDown', handleMarqueeEngagement);
    graph.subscribe('onMouseUp', disengageMarqueeBox);
    graph.subscribe('onContextMenu', disengageMarqueeBox);
    graph.subscribe('onMouseMove', setMarqueeBoxDimensions);

    graph.subscribe('onMouseDown', beginGroupDrag);
    graph.subscribe('onMouseUp', endGroupDrag);
    graph.subscribe('onMouseMove', groupDrag);

    graph.subscribe('onUndo', updateEncapsulatedNodeBox);
    graph.subscribe('onRedo', updateEncapsulatedNodeBox);
  };

  const deactivate = () => {
    graph.unsubscribe('onFocusChange', updateEncapsulatedNodeBox);

    graph.unsubscribe('onMouseDown', handleMarqueeEngagement);
    graph.unsubscribe('onMouseUp', disengageMarqueeBox);
    graph.unsubscribe('onContextMenu', disengageMarqueeBox);
    graph.unsubscribe('onMouseMove', setMarqueeBoxDimensions);

    graph.unsubscribe('onMouseDown', beginGroupDrag);
    graph.unsubscribe('onMouseUp', endGroupDrag);
    graph.unsubscribe('onMouseMove', groupDrag);

    graph.unsubscribe('onUndo', updateEncapsulatedNodeBox);
    graph.unsubscribe('onRedo', updateEncapsulatedNodeBox);

    if (marqueeBox.value) disengageMarqueeBox();
  };

  graph.subscribe('onSettingsChange', (diff) => {
    if (diff.marquee === true) activate();
    else if (diff.marquee === false) deactivate();
  });

  if (graph.settings.value.marquee) activate();

  return {
    /**
     * updates the bounding box around the nodes that are currently focused.
     * use this when you are changing theme or position outside of the standard supported use cases
     */
    updateEncapsulatedNodeBox,
    /**
     * true when the marquee box is being actively sized by user
     */
    activelySelecting: computed(() => !!marqueeBox.value)
  };
};

export type GraphMarqueeControls = ReturnType<typeof useMarquee>;
export type GraphMarqueePlugin = {
  /**
   * controls for the marquee plugin
   */
  marquee: GraphMarqueeControls;
};
