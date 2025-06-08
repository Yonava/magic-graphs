import type { Ref } from "vue";
import { usePanAndZoom } from "./panZoom";
import { addTransform, getDevicePixelRatio, type TransformOptions } from "./utils";

export const useCamera = (canvas: Ref<HTMLCanvasElement | undefined>) => {
  const panAndZoom = usePanAndZoom(canvas)
  const dpr = getDevicePixelRatio()

  const dprTransform: TransformOptions = {
    scaleX: dpr,
    scaleY: dpr,
  }

  return {
    transform: (ctx: CanvasRenderingContext2D) => {
      ctx.resetTransform()
      const transforms = [dprTransform, panAndZoom.getTransform()]
      for (const t of transforms) addTransform(ctx, t)
    }
  }
}

export type Camera = ReturnType<typeof useCamera>