import type { Ref } from "vue"
import { defineCamera } from "./defineCamera"
import { useCameraState } from "./pluggables"

export const useCamera = (canvas: Ref<HTMLCanvasElement | undefined>) => {
  const state = useCameraState(canvas)

  return defineCamera({
    pluggables: state
  })
}