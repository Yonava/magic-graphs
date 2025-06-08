import type { Ref } from "vue"
import type { TransformOptions } from "../utils"

export type CameraPluggable = (canvasRef: Ref<HTMLCanvasElement | undefined>) => {
  getTransform: () => TransformOptions
}