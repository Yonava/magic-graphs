import type { Ref } from "vue"
import { defineCamera } from "./defineCamera"
import { usePan } from "./pluggables/pan"
import { useZoom } from "./pluggables/zoom"

export const useCamera = (canvas: Ref<HTMLCanvasElement | undefined>) => {
  const pan = usePan(canvas)
  const zoom = useZoom(canvas)

  return defineCamera({
    pluggables: [pan, zoom]
  })
}