import type { Ref } from "vue"
import { usePan } from "./pluggables"
import { defineCamera } from "./defineCamera"

export const useCamera = (canvas: Ref<HTMLCanvasElement | undefined>) => {
  const pan = usePan(canvas)
  return defineCamera({
    pluggables: [pan]
  })
}