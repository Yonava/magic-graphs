import type { CameraPluggable } from "./pluggables";
import { addTransform, getDevicePixelRatio, type TransformOptions } from "./utils";

export type CameraConfig = {
  pluggables: ReturnType<CameraPluggable>[];
}

export const defineCamera = (config: Partial<CameraConfig> = {}) => {
  const {
    pluggables = []
  } = config

  const dpr = getDevicePixelRatio()

  const dprTransform: TransformOptions = {
    scaleX: dpr,
    scaleY: dpr,
  }

  return {
    transform: (ctx: CanvasRenderingContext2D) => {
      ctx.resetTransform()
      const transforms = [dprTransform, ...pluggables.map(plug => plug.getTransform())]
      for (const t of transforms) addTransform(ctx, t)
    }
  }
}

export type Camera = ReturnType<typeof defineCamera>