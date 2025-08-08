import { getCtx } from '@utils/ctx';
import { useElementSize } from '@vueuse/core';

import { onMounted, ref, watch } from 'vue';

import { type DrawPattern, useBackgroundPattern } from './backgroundPattern';
import { useCamera } from './camera';
import { getDevicePixelRatio } from './camera/utils';
import { useMagicCoordinates } from './coordinates';
import type { DrawContent, UseMagicCanvas } from './types';

const REPAINT_FPS = 60;

const initCanvasWidthHeight = (canvas: HTMLCanvasElement | undefined) => {
  if (!canvas) throw new Error('Canvas not found in DOM. Check ref link.');

  const dpr = getDevicePixelRatio();
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
};

export const useMagicCanvas: UseMagicCanvas = (options = {}) => {
  const canvas = ref<HTMLCanvasElement>();
  const canvasBoxSize = useElementSize(canvas);

  const drawContent = ref<DrawContent>(() => {});
  const drawBackgroundPattern = ref<DrawPattern>(() => {});

  let repaintInterval: NodeJS.Timeout;

  onMounted(() => {
    initCanvasWidthHeight(canvas.value);
    repaintInterval = setInterval(repaintCanvas, 1000 / REPAINT_FPS);
  });

  watch([canvasBoxSize.width, canvasBoxSize.height], () =>
    initCanvasWidthHeight(canvas.value),
  );

  const { cleanup: cleanupCamera, ...camera } = useCamera(
    canvas,
    options?.storageKey ?? '[default-storage-key]',
  );
  const { coordinates: cursorCoordinates, cleanup: cleanupCoords } =
    useMagicCoordinates(canvas);

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
  };
};
