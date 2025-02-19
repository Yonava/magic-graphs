import { ref, watch } from "vue";
import type { Aggregator } from "@graph/types";
import type { BaseGraph } from "@graph/base";
import type { GraphMouseEvent } from "@graph/base/types";
import type { Coordinate } from "@shape/types";
import { generateId } from "@utils/id";
import { shapes } from "@shapes";
import colors from "@utils/colors";
import type { Color } from "@utils/colors";
import { BRUSH_WEIGHTS, COLORS } from "./constants";
import { useAnnotationHistory } from "./history";
import type { Annotation } from "./types";
import { useNonNullGraphColors } from "@graph/themes/useGraphColors";
import { getCircleBoundingBox } from "@shape/circle/hitbox";

const ERASER_BRUSH_RADIUS = 10;

const graphColor = useNonNullGraphColors();

export const useAnnotations = (graph: BaseGraph) => {
  const selectedColor = ref<Color>(COLORS[0]);
  const selectedBrushWeight = ref(BRUSH_WEIGHTS[1]);
  const erasing = ref(false);
  const erasedScribbleIds = ref(new Set<string>());

  const batch = ref<Coordinate[]>([]);
  const scribbles = ref<Annotation[]>([]);
  const isDrawing = ref(false);
  const lastPoint = ref<Coordinate>();

  const isActive = ref(false);

  const history = useAnnotationHistory(scribbles);

  const clear = () => {
    if (scribbles.value.length === 0) return;

    history.addToUndoStack({
      action: "remove",
      annotations: scribbles.value,
    });

    scribbles.value = [];
  };

  /**
   * starts drawing from the current mouse position
   */
  const startDrawing = ({ coords, event }: GraphMouseEvent) => {
    if (event.button !== 0) return;

    isDrawing.value = true;
    lastPoint.value = coords;
    batch.value = [coords];
  };

  /**
   * draws a line that connects two points.
   * the delta between two mouse points while
   * mouse is being dragged
   */
  const drawLine = ({ coords }: GraphMouseEvent) => {
    if (!isDrawing.value || !lastPoint.value) return;

    if (batch.value.length === 0) return;

    if (erasing.value) {
      const eraserBoundingBox = getCircleBoundingBox({
        at: coords,
        radius: ERASER_BRUSH_RADIUS,
      })();

      const erasedScribbles = scribbles.value.filter((scribble) => {
        const shape = shapes.scribble(scribble);
        return shape.efficientHitbox(eraserBoundingBox);
      });

      for (const erasedScribble of erasedScribbles) {
        erasedScribbleIds.value.add(erasedScribble.id);
      }
      return;
    }

    lastPoint.value = coords;
    batch.value.push(coords);
  };

  const stopDrawing = () => {
    if (!isDrawing.value) return;

    isDrawing.value = false;
    lastPoint.value = undefined;

    if (erasing.value) {
      const erasedScribbles = scribbles.value.filter((scribble) => {
        return erasedScribbleIds.value.has(scribble.id);
      });

      history.addToUndoStack({
        action: "remove",
        annotations: erasedScribbles,
      });

      scribbles.value = scribbles.value.filter((scribble) => {
        return !erasedScribbleIds.value.has(scribble.id);
      });
      erasedScribbleIds.value.clear();
      return;
    }

    const scribble = {
      id: generateId(),
      type: "draw",
      points: batch.value,
      color: selectedColor.value,
      brushWeight: selectedBrushWeight.value,
    } as const;

    scribbles.value.push(scribble);

    history.addToUndoStack({
      action: "add",
      annotations: [scribble],
    });

    batch.value = [];
  };

  watch(erasing, () => {
    if (!graph.canvas.value) return;
    graph.canvas.value.style.cursor = erasing.value ? "none" : "crosshair";
  });

  const addScribblesToAggregator = (aggregator: Aggregator) => {
    if (!isActive.value) return aggregator;

    if (erasing.value) {
      const eraserCursor = shapes.circle({
        at: graph.graphAtMousePosition.value.coords,
        radius: ERASER_BRUSH_RADIUS,
        color: colors.TRANSPARENT,
        stroke: {
          color: graphColor.value.contrast,
          width: 2,
        },
      });

      aggregator.push({
        graphType: "annotation",
        id: eraserCursor.id,
        shape: eraserCursor,
        priority: 5050,
      });
    } else if (batch.value.length > 0 && isDrawing.value) {
      const incompleteScribble = shapes.scribble({
        type: "draw",
        points: batch.value,
        color: selectedColor.value,
        brushWeight: selectedBrushWeight.value,
      });

      aggregator.push({
        graphType: "annotation",
        id: incompleteScribble.id,
        shape: incompleteScribble,
        priority: 5001,
      });
    }

    for (const scribble of scribbles.value) {
      const isErased = erasedScribbleIds.value.has(scribble.id);
      aggregator.push({
        graphType: "annotation",
        id: scribble.id,
        shape: shapes.scribble({
          ...scribble,
          color: scribble.color + (isErased ? "50" : ""),
        }),
        priority: 5000,
      });
    }

    return aggregator;
  };

  graph.updateAggregator.push(addScribblesToAggregator);

  const activate = () => {
    if (!graph.canvas.value) return;

    isActive.value = true;

    graph.settings.value.interactive = false;
    graph.settings.value.marquee = false;
    graph.settings.value.focusable = false;
    graph.settings.value.draggable = false;

    graph.graphCursorDisabled.value = true;

    graph.canvas.value.style.cursor = "crosshair";

    graph.subscribe("onMouseDown", startDrawing);
    graph.subscribe("onMouseMove", drawLine);
    graph.subscribe("onMouseUp", stopDrawing);
  };

  const deactivate = () => {
    if (!graph.canvas.value) return;

    isActive.value = false;
    erasing.value = false;

    graph.settings.value.interactive = true;
    graph.settings.value.marquee = true;
    graph.settings.value.focusable = true;
    graph.settings.value.draggable = true;

    graph.graphCursorDisabled.value = false;

    graph.canvas.value.style.cursor = "default";

    graph.unsubscribe("onMouseDown", startDrawing);
    graph.unsubscribe("onMouseMove", drawLine);
    graph.unsubscribe("onMouseUp", stopDrawing);
  };

  const load = (annotations: Annotation[]) => {
    scribbles.value = annotations;
  };

  return {
    clear: clear,
    isActive: isActive,

    annotations: scribbles,

    erasing: erasing,
    color: selectedColor,
    brushWeight: selectedBrushWeight,

    activate: activate,
    deactivate: deactivate,

    load,

    undo: history.undo,
    redo: history.redo,
    canUndo: history.canUndo,
    canRedo: history.canRedo,
  };
};

export type GraphAnnotationControls = ReturnType<typeof useAnnotations>;
export type GraphAnnotationPlugin = {
  /**
   * controls for facilitating the "marking up" or drawing over the graph
   */
  annotation: GraphAnnotationControls;
};
