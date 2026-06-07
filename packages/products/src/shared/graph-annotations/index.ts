import { ANCHOR_EVENT_ID } from '@magic/graph/plugins/anchors/index';
import { CanvasGraphMouseEvent } from '@magic/graph/plugins/canvas/events';
import { DRAG_EVENT_ID } from '@magic/graph/plugins/drag/index';
import { MARQUEE_EVENT_ID } from '@magic/graph/plugins/marquee/index';
import type { Aggregator } from '@magic/graph/types';
import { GraphWithPlugins } from '@magic/graph/useGraph';
import { circle } from '@magic/shapes/shapes/circle/index';
import type { ScribbleSchema } from '@magic/shapes/shapes/scribble/types';
import type { WithId } from '@magic/shapes/types/index';
import type { Coordinate } from '@magic/shapes/types/utility';
import colors from '@magic/utils/colors';
import type { Color } from '@magic/utils/colors';
import { generateId } from '@magic/utils/id';
import { MOUSE_BUTTONS } from '@magic/utils/mouse';

import { computed, ref, watch } from 'vue';

import { BRUSH_WEIGHTS, COLORS } from './constants.ts';
import { useAnnotationHistory } from './history.ts';
import type { Annotation } from './types.ts';

const ERASER_BRUSH_RADIUS = 10;

const PRIORITY = { before: [MARQUEE_EVENT_ID, DRAG_EVENT_ID, ANCHOR_EVENT_ID] };

export const useGraphAnnotations = (graph: GraphWithPlugins) => {
  const selectedColor = ref<Color>(COLORS[0]);
  const selectedBrushWeight = ref(BRUSH_WEIGHTS[1]);
  const isErasing = ref(false);
  const isLaserPointing = ref(false);
  const laserDecayInterval = ref<NodeJS.Timeout>();
  const lastMoveTime = ref(Date.now());
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
      action: 'remove',
      annotations: scribbles.value,
    });

    scribbles.value = [];
  };

  const startDecayTimer = () => {
    if (laserDecayInterval.value) return;

    laserDecayInterval.value = setInterval(() => {
      const inactivityTime = Date.now() - lastMoveTime.value;
      const shouldErase =
        inactivityTime > 50 && isLaserPointing.value && batch.value.length >= 2;
      if (shouldErase) batch.value.shift();
    }, 50);
  };

  /**
   * starts drawing from the current mouse position
   */
  const startDrawing = (
    { coords, event }: CanvasGraphMouseEvent,
    consume: () => void,
  ) => {
    if (event.button !== MOUSE_BUTTONS.left) return;
    consume();
    if (isErasing.value) {
      const eraserBoundingBox = circle({
        at: coords,
        radius: ERASER_BRUSH_RADIUS,
      }).getBoundingBox();

      const erasedScribbles = scribbles.value.filter((scribble) => {
        const shape = graph.canvas.shapes.shapes.scribble(scribble);
        return shape.efficientHitbox(eraserBoundingBox);
      });

      for (const erasedScribble of erasedScribbles) {
        erasedScribbleIds.value.add(erasedScribble.id);
      }
    }

    isDrawing.value = true;
    lastPoint.value = coords;
    batch.value = [coords];
  };

  /**
   * draws a line that connects two points.
   * the delta between two mouse points while
   * mouse is being dragged
   */
  const drawLine = ({ coords }: CanvasGraphMouseEvent, consume: () => void) => {
    if (!isDrawing.value || !lastPoint.value) return;
    if (batch.value.length === 0) return;
    consume();
    if (isErasing.value) {
      const eraserBoundingBox = circle({
        at: coords,
        radius: ERASER_BRUSH_RADIUS,
      }).getBoundingBox();

      const erasedScribbles = scribbles.value.filter((scribble) => {
        const shape = graph.canvas.shapes.shapes.scribble(scribble);
        return shape.efficientHitbox(eraserBoundingBox);
      });

      for (const erasedScribble of erasedScribbles) {
        erasedScribbleIds.value.add(erasedScribble.id);
      }
      return;
    }

    lastPoint.value = coords;
    batch.value.push(coords);

    if (isLaserPointing.value && batch.value.length > 10) {
      batch.value.shift();
    }

    if (isLaserPointing.value) {
      startDecayTimer();
    }

    lastMoveTime.value = Date.now();
  };

  const stopDrawing = (_: unknown, consume: () => void) => {
    if (!isDrawing.value) return;
    consume();
    isDrawing.value = false;
    lastPoint.value = undefined;

    if (isErasing.value) {
      const erasedScribbles = scribbles.value.filter((scribble) => {
        return erasedScribbleIds.value.has(scribble.id);
      });

      history.addToUndoStack({
        action: 'remove',
        annotations: erasedScribbles,
      });

      scribbles.value = scribbles.value.filter((scribble) => {
        return !erasedScribbleIds.value.has(scribble.id);
      });
      erasedScribbleIds.value.clear();
      return;
    }

    if (isLaserPointing.value) {
      laserDecayInterval.value = undefined;
      return;
    }

    const scribble = {
      id: generateId(),
      type: 'draw',
      points: batch.value,
      fillColor: selectedColor.value,
      brushWeight: selectedBrushWeight.value,
    } as const satisfies WithId<ScribbleSchema>;

    scribbles.value.push(scribble);

    history.addToUndoStack({
      action: 'add',
      annotations: [scribble],
    });

    batch.value = [];
  };

  const hideCursor = computed(() => isErasing.value || isLaserPointing.value);

  watch(hideCursor, () => {
    const canvas = graph.canvas.magicCanvas.canvas.value;
    if (!canvas) return;
    canvas.style.cursor = hideCursor.value ? 'none' : 'crosshair';
  });

  const addScribblesToAggregator = (aggregator: Aggregator) => {
    if (!isActive.value) return aggregator;

    if (isErasing.value && graph.canvas.canvasHovered.value) {
      const eraserId = 'annotation-eraser-cursor';
      const eraserCursor = graph.canvas.shapes.shapes.circle({
        id: eraserId,
        at: graph.canvas.graphAtMousePosition.value.coords,
        radius: ERASER_BRUSH_RADIUS,
        fillColor: colors.TRANSPARENT,
        stroke: {
          color: graph.getTheme('graph.color'),
          lineWidth: 2,
        },
      });

      aggregator.push({
        graphType: 'annotation-eraser',
        id: eraserId,
        shape: eraserCursor,
        priority: 5050,
      });
    } else if (batch.value.length > 0 && isDrawing.value) {
      const incompleteAnnotationId = 'annotation-incomplete';
      const incompleteScribble = graph.canvas.shapes.shapes.scribble({
        id: incompleteAnnotationId,
        type: 'draw',
        points: batch.value,
        fillColor: selectedColor.value,
        brushWeight: selectedBrushWeight.value,
      });

      aggregator.push({
        graphType: 'annotation',
        id: incompleteAnnotationId,
        shape: incompleteScribble,
        priority: 5001,
      });
    } else if (isLaserPointing.value && graph.canvas.canvasHovered.value) {
      const laserPointerCursorId = 'laser-pointer-cursor';
      const laserPointerCursor = graph.canvas.shapes.shapes.circle({
        id: laserPointerCursorId,
        at: graph.canvas.graphAtMousePosition.value.coords,
        radius: selectedBrushWeight.value,
        fillColor: selectedColor.value,
      });

      aggregator.push({
        graphType: 'annotation',
        id: laserPointerCursorId,
        shape: laserPointerCursor,
        priority: 5050,
      });
    }

    for (const scribble of scribbles.value) {
      const isErased = erasedScribbleIds.value.has(scribble.id);
      aggregator.push({
        graphType: 'annotation',
        id: scribble.id,
        shape: graph.canvas.shapes.shapes.scribble({
          ...scribble,
          fillColor: scribble.fillColor + (isErased ? '50' : ''),
        }),
        priority: 5000,
      });
    }

    return aggregator;
  };

  graph.canvas.aggregator.transformers.push(addScribblesToAggregator);

  const activate = () => {
    const canvas = graph.canvas.magicCanvas.canvas.value;
    if (!canvas) return;

    isActive.value = true;

    graph.canvas.cursor.disabled.value = true;
    canvas.style.cursor = 'crosshair';

    graph.events.handle('onMouseDown', startDrawing, 'annotation', PRIORITY);
    graph.events.handle('onMouseMove', drawLine, 'annotation', PRIORITY);
    graph.events.handle('onMouseUp', stopDrawing, 'annotation', PRIORITY);
  };

  const deactivate = () => {
    const canvas = graph.canvas.magicCanvas.canvas.value;
    if (!canvas) return;

    isActive.value = false;
    isErasing.value = false;

    graph.canvas.cursor.disabled.value = false;
    canvas.style.cursor = 'default';

    graph.events.unhandle('onMouseDown', startDrawing);
    graph.events.unhandle('onMouseMove', drawLine);
    graph.events.unhandle('onMouseUp', stopDrawing);
  };

  const load = (annotations: Annotation[]) => {
    scribbles.value = annotations;
  };

  return {
    clear: clear,
    isActive: isActive,

    annotations: scribbles,

    isLaserPointing,
    isErasing,
    color: selectedColor,
    brushWeight: selectedBrushWeight,

    activate: activate,
    deactivate: deactivate,

    load,

    history: {
      undo: history.undo,
      redo: history.redo,
      canUndo: history.canUndo,
      canRedo: history.canRedo,
    },
  };
};

export type GraphAnnotationsControls = ReturnType<typeof useGraphAnnotations>;
