import type { Ref } from 'vue';

import { usePanAndZoom } from './panZoom.ts';
import { addTransform, useDevicePixelRatio } from './utils.ts';

export const useCamera = (
  canvas: Ref<HTMLCanvasElement | undefined>,
  storageKey: string,
) => {
  const { getTransform: getPZTransform, ...rest } = usePanAndZoom(
    canvas,
    storageKey,
  );
  const dpr = useDevicePixelRatio();

  return {
    ...rest,
    transformAndClear: (ctx: CanvasRenderingContext2D) => {
      ctx.resetTransform();
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const transforms = [
        {
          scaleX: dpr.value,
          scaleY: dpr.value,
        },
        getPZTransform(),
      ];
      for (const t of transforms) addTransform(ctx, t);
    },
  };
};

export type Camera = ReturnType<typeof useCamera>;
