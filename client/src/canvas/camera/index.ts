import type { Ref } from "vue";
import { usePanAndZoom } from "./panZoom";
import { addTransform, getDevicePixelRatio, type TransformOptions } from "./utils";

export const useCamera = (canvas: Ref<HTMLCanvasElement | undefined>, canvasId: string) => {
  const { getTransform: getPZTransform, ...rest } = usePanAndZoom(canvas, canvasId)
  const dpr = getDevicePixelRatio()

  const dprTransform: TransformOptions = {
    scaleX: dpr,
    scaleY: dpr,
  }

  return {
    ...rest,
    transformAndClear: (ctx: CanvasRenderingContext2D) => {
      ctx.resetTransform()
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const transforms = [dprTransform, getPZTransform()]
      for (const t of transforms) addTransform(ctx, t)
    },
  }
}

export type Camera = ReturnType<typeof useCamera>