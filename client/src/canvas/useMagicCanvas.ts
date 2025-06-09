import { onMounted, ref, type Ref } from "vue"
import { useCamera, type Camera } from "./camera"
import { useMagicCoordinates } from "./useCoordinates"
import type { Coordinate } from "@shape/types/utility"

export type MagicCanvasProps = {
  canvasRef: (canvasRef: HTMLCanvasElement) => void,
  canvas: Ref<HTMLCanvasElement | undefined>
  camera: Camera,
  coordinates: Ref<Coordinate>,
}

export type UseMagicCanvas = () => MagicCanvasProps

export const useMagicCanvas: UseMagicCanvas = () => {
  const canvas = ref<HTMLCanvasElement>()

  onMounted(() => {
    console.log(canvas.value)
  })

  const camera = useCamera(canvas);
  const coordinates = useMagicCoordinates(canvas, camera.state);

  return {
    canvasRef: (ref) => canvas.value = ref,
    canvas,
    camera,
    coordinates,
  }
}