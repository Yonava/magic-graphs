import { EventMapToEventRegistry } from '@graph/primitives/events/types';

export type CanvasLifecycleEvents = {
  onMounted: () => void;
  onBeforeUnmount: () => void;
  /**
   * triggered at the top and bottom of a repaint, bracketing everything the
   * frame does: the clear, the background pattern and the content draw.
   *
   * this exists for measurement. the canvas plugin's own `onBeforeDraw` and
   * `onDraw` bracket the content draw alone, which leaves out two of the
   * costlier parts of a frame, so timing built on those would be measuring the
   * wrong thing
   */
  onBeforeRepaint: () => void;
  onAfterRepaint: () => void;
};

type CanvasSurfaceLifecycleEventRegistry =
  EventMapToEventRegistry<CanvasLifecycleEvents>;

export const createCanvasLifecycleEventRegistry =
  (): CanvasSurfaceLifecycleEventRegistry => ({
    onMounted: new Set(),
    onBeforeUnmount: new Set(),
    onBeforeRepaint: new Set(),
    onAfterRepaint: new Set(),
  });
