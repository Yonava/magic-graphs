import { EventMapToEventRegistry } from '@magic/graph-primitives/events/types';

export type MagicCanvasLifecycleEvents = {
  onMounted: () => void;
  onBeforeUnmount: () => void;
};

type MagicCanvasLifecycleEventRegistry =
  EventMapToEventRegistry<MagicCanvasLifecycleEvents>;

export const createMagicCanvasLifecycleEventRegistry =
  (): MagicCanvasLifecycleEventRegistry => ({
    onMounted: new Set(),
    onBeforeUnmount: new Set(),
  });
