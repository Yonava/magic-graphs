import { getCtx } from '@core/utils/ctx/index';
import { createEventHub } from '@graph/primitives/events/createEventHub';
import { useElementSize } from '@vueuse/core';

import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

import { type DrawPattern, useBackgroundPattern } from './backgroundPattern.ts';
import { useCamera } from './camera/index.ts';
import { getDevicePixelRatio } from './camera/utils.ts';
import { useCoordinates } from './coordinates/index.ts';
import { createCanvasLifecycleEventRegistry } from './events.ts';
import type { DrawContent, UseCanvas } from './types.ts';

const REPAINT_FPS = 60;

/**
 * measures the canvas, sizes its backing store to match at the current device
 * pixel ratio, and hands the measurement back so callers that need the canvas's
 * screen position do not have to pay for a second layout to get it
 */
const measureAndSizeCanvas = (canvas: HTMLCanvasElement | undefined) => {
  if (!canvas) throw new Error('Canvas not found in DOM. Check ref link.');

  const dpr = getDevicePixelRatio();
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  return rect;
};

export const useCanvas: UseCanvas = () => {
  const canvas = ref<HTMLCanvasElement>();
  const canvasBoxSize = useElementSize(canvas);

  const drawContent = ref<DrawContent>(() => {});
  const drawBackgroundPattern = ref<DrawPattern>(() => () => {});

  /*
    the background pattern needs the canvas's screen position to work out which
    slice of the world is visible, and reading it forces layout. the canvas
    fills the viewport, so the only thing that moves it is a resize, which is
    already being watched
  */
  let canvasRect: Pick<DOMRect, 'left' | 'top'> = { left: 0, top: 0 };

  const lifecycleEvents = createEventHub(createCanvasLifecycleEventRegistry());

  let repaintInterval: NodeJS.Timeout;

  onMounted(() => {
    canvasRect = measureAndSizeCanvas(canvas.value);
    repaintInterval = setInterval(repaintCanvas, 1000 / REPAINT_FPS);
    lifecycleEvents.emit('onMounted');
  });

  onBeforeUnmount(() => {
    lifecycleEvents.emit('onBeforeUnmount');
  });

  watch([canvasBoxSize.width, canvasBoxSize.height], () => {
    canvasRect = measureAndSizeCanvas(canvas.value);
  });

  const { cleanup: cleanupCamera, ...camera } = useCamera(canvas);
  const { coordinates: cursorCoordinates, cleanup: cleanupCoords } =
    useCoordinates(canvas);

  const pattern = useBackgroundPattern(camera.state, drawBackgroundPattern);

  const repaintCanvas = () => {
    const ctx = getCtx(canvas);
    camera.transformAndClear(ctx);
    pattern.draw(ctx, canvasRect);
    drawContent.value(ctx);
  };

  return {
    canvas,
    camera,
    cursorCoordinates,
    ref: {
      canvasRef: (ref) => (canvas.value = ref),
      cleanup: (ref) => {
        cleanupCoords(ref);
        cleanupCamera(ref);
        clearInterval(repaintInterval);
      },
    },
    draw: {
      content: drawContent,
      backgroundPattern: drawBackgroundPattern,
    },
    lifecycleEvents,
  };
};
