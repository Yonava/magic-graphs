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

const initCanvasWidthHeight = (canvas: HTMLCanvasElement | undefined) => {
  if (!canvas) throw new Error('Canvas not found in DOM. Check ref link.');

  const dpr = getDevicePixelRatio();
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
};

export const useCanvas: UseCanvas = (options = {}) => {
  const canvas = ref<HTMLCanvasElement>();
  const canvasBoxSize = useElementSize(canvas);

  const drawContent = ref<DrawContent>(() => {});
  const drawBackgroundPattern = ref<DrawPattern>(() => {});

  const lifecycleEvents = createEventHub(createCanvasLifecycleEventRegistry());

  let repaintInterval: NodeJS.Timeout;

  onMounted(() => {
    initCanvasWidthHeight(canvas.value);
    repaintInterval = setInterval(repaintCanvas, 1000 / REPAINT_FPS);
    lifecycleEvents.emit('onMounted');
  });

  onBeforeUnmount(() => {
    lifecycleEvents.emit('onBeforeUnmount');
  });

  watch([canvasBoxSize.width, canvasBoxSize.height], () =>
    initCanvasWidthHeight(canvas.value),
  );

  const { cleanup: cleanupCamera, ...camera } = useCamera(
    canvas,
    options?.storageKey ?? '[default-storage-key]',
  );
  const { coordinates: cursorCoordinates, cleanup: cleanupCoords } =
    useCoordinates(canvas);

  const pattern = useBackgroundPattern(camera.state, drawBackgroundPattern);

  const repaintCanvas = () => {
    const ctx = getCtx(canvas);
    camera.transformAndClear(ctx);
    pattern.draw(ctx);
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
