import type { Ref } from "vue";
import { usePanAndZoom } from "./panZoom";
import { addTransform, getDevicePixelRatio, type TransformOptions } from "./utils";

export const useCamera = (canvas: Ref<HTMLCanvasElement | undefined>) => {
  const { getTransform: getPZTransform, ...rest } = usePanAndZoom(canvas)
  const dpr = getDevicePixelRatio()

  const dprTransform: TransformOptions = {
    scaleX: dpr,
    scaleY: dpr,
  }

  return {
    ...rest,
    transform: (ctx: CanvasRenderingContext2D) => {
      ctx.resetTransform()
      const transforms = [dprTransform, getPZTransform()]
      for (const t of transforms) addTransform(ctx, t)
    },
  }
}

export type Camera = ReturnType<typeof useCamera>