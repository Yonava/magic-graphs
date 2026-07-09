import { EventMapToEventRegistry } from '@graph/primitives/events/types';

export type CanvasLifecycleEvents = {
  onMounted: () => void;
  onBeforeUnmount: () => void;
};

type CanvasSurfaceLifecycleEventRegistry =
  EventMapToEventRegistry<CanvasLifecycleEvents>;

export const createCanvasLifecycleEventRegistry =
  (): CanvasSurfaceLifecycleEventRegistry => ({
    onMounted: new Set(),
    onBeforeUnmount: new Set(),
  });
