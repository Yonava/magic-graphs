import { ref } from "vue";
import type { Aggregator } from "@graph/types";
import { useTheme } from "@graph/themes/useTheme";
import { MARQUEE_CONSTANTS } from "@graph/plugins/marquee/types";
import colors from "@colors";
import { rect } from "@shapes";
import type { BoundingBox, Coordinate } from "@shape/types";
import type { BaseGraph } from "@graph/base";
import type { GraphMouseEvent } from "@graph/base/types";
import type { GraphFocusPlugin } from "../focus";
import { getEncapsulatedNodeBox } from "./helpers";

export const useMarquee = (graph: BaseGraph & GraphFocusPlugin) => {
  const marqueeBox = ref<BoundingBox | undefined>();
  const encapsulatedNodeBox = ref<BoundingBox | undefined>();

  const groupDragCoordinates = ref<Coordinate | undefined>();

  const { setTheme, removeTheme } = useTheme(graph, MARQUEE_CONSTANTS.THEME_ID);

  const hideNodeAnchors = () => {
    setTheme("nodeAnchorColor", colors.TRANSPARENT);
    setTheme("nodeAnchorColorWhenParentFocused", colors.TRANSPARENT);
  };
  const showNodeAnchors = () => {
    removeTheme("nodeAnchorColor");
    removeTheme("nodeAnchorColorWhenParentFocused");
  };

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
    if (event.button !== 0) return;
    const topItem = items.at(-1);
    if (topItem?.graphType !== "encapsulated-node-box") showNodeAnchors();
    if (!topItem) engageMarqueeBox(coords);
  };

  const groupDrag = ({ items, coords }: GraphMouseEvent) => {
    if (!groupDragCoordinates.value) return;
    const topItem = items.at(-1);
    if (topItem?.graphType !== "encapsulated-node-box") return;
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
    if (event.button !== 0) return;
    if (marqueeBox.value) return;
    const topItem = items.at(-1);
    if (topItem?.graphType !== "encapsulated-node-box") return;
    groupDragCoordinates.value = coords;
    graph.emit("onGroupDragStart", graph.focus.focusedNodes.value, coords);
  };

  const groupDrop = () => {
    if (!groupDragCoordinates.value) return;
    graph.emit(
      "onGroupDrop",
      graph.focus.focusedNodes.value,
      groupDragCoordinates.value,
    );
    groupDragCoordinates.value = undefined;
  };

  const engageMarqueeBox = (startingCoords: { x: number; y: number }) => {
    hideNodeAnchors();
    graph.graphCursorDisabled.value = true;
    marqueeBox.value = {
      at: startingCoords,
      width: 0,
      height: 0,
    };
    graph.emit("onMarqueeBeginSelection", startingCoords);
  };

  const disengageMarqueeBox = () => {
    if (!marqueeBox.value) return;
    const finalMarqueeBox = marqueeBox.value;
    marqueeBox.value = undefined;
    graph.graphCursorDisabled.value = false;
    showNodeAnchors();
    graph.emit("onMarqueeEndSelection", finalMarqueeBox);
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
    const shape = rect({
      ...box,
      color: graph.getTheme("marqueeSelectionBoxColor"),
      stroke: {
        color: graph.getTheme("marqueeSelectionBoxBorderColor"),
        width: 2,
      },
    });

    return {
      id: "marquee-box",
      graphType: "marquee-box",
      shape,
      priority: Infinity,
    } as const;
  };

  const addMarqueeBoxToAggregator = (aggregator: Aggregator) => {
    if (!marqueeBox.value) return aggregator;
    const selectionBoxSchemaItem = getMarqueeBoxSchema(marqueeBox.value);
    aggregator.push(selectionBoxSchemaItem);
    return aggregator;
  };

  const getEncapsulatedNodeBoxSchema = (box: BoundingBox) => {
    const shape = rect({
      ...box,
      color: graph.getTheme("marqueeEncapsulatedNodeBoxColor"),
      stroke: {
        color: graph.getTheme("marqueeEncapsulatedNodeBoxBorderColor"),
        width: 2,
      },
    });

    return {
      id: "encapsulated-node-box",
      graphType: "encapsulated-node-box",
      shape,
      priority: Infinity,
    } as const;
  };

  const addEncapsulatedNodeBoxToAggregator = (aggregator: Aggregator) => {
    if (!encapsulatedNodeBox.value) return aggregator;
    const selectionAreaSchemaItem = getEncapsulatedNodeBoxSchema(
      encapsulatedNodeBox.value,
    );
    aggregator.push(selectionAreaSchemaItem);
    return aggregator;
  };

  graph.updateAggregator.push(addEncapsulatedNodeBoxToAggregator);
  graph.updateAggregator.push(addMarqueeBoxToAggregator);

  const activate = () => {
    graph.subscribe("onFocusChange", updateEncapsulatedNodeBox);

    graph.subscribe("onMouseDown", handleMarqueeEngagement);
    graph.subscribe("onMouseUp", disengageMarqueeBox);
    graph.subscribe("onContextMenu", disengageMarqueeBox);
    graph.subscribe("onMouseMove", setMarqueeBoxDimensions);

    graph.subscribe("onMouseDown", beginGroupDrag);
    graph.subscribe("onMouseUp", groupDrop);
    graph.subscribe("onMouseMove", groupDrag);

    graph.subscribe("onUndo", updateEncapsulatedNodeBox);
    graph.subscribe("onRedo", updateEncapsulatedNodeBox);
  };

  const deactivate = () => {
    graph.unsubscribe("onFocusChange", updateEncapsulatedNodeBox);

    graph.unsubscribe("onMouseDown", handleMarqueeEngagement);
    graph.unsubscribe("onMouseUp", disengageMarqueeBox);
    graph.unsubscribe("onContextMenu", disengageMarqueeBox);
    graph.unsubscribe("onMouseMove", setMarqueeBoxDimensions);

    graph.unsubscribe("onMouseDown", beginGroupDrag);
    graph.unsubscribe("onMouseUp", groupDrop);
    graph.unsubscribe("onMouseMove", groupDrag);

    graph.unsubscribe("onUndo", updateEncapsulatedNodeBox);
    graph.unsubscribe("onRedo", updateEncapsulatedNodeBox);

    if (marqueeBox.value) disengageMarqueeBox();
  };

  graph.subscribe("onSettingsChange", (diff) => {
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
  };
};

export type GraphMarqueeControls = ReturnType<typeof useMarquee>;
export type GraphMarqueePlugin = {
  /**
   * controls for the marquee plugin
   */
  marquee: GraphMarqueeControls;
};
