import { onMounted, ref, type Ref } from "vue"
import { useCamera, type Camera } from "./camera"
import { useMagicCoordinates } from "./useCoordinates"
import type { Coordinate } from "@shape/types/utility"

export type MagicCanvasProps = {
  canvasRef: (canvas: HTMLCanvasElement) => void,
  canvas: Ref<HTMLCanvasElement | undefined>
  camera: Omit<Camera, 'cleanup'>,
  coordinates: Ref<Coordinate>,
  cleanup: (canvas: HTMLCanvasElement) => void
}

export type UseMagicCanvas = () => MagicCanvasProps

export const useMagicCanvas: UseMagicCanvas = () => {
  const canvas = ref<HTMLCanvasElement>()

  onMounted(() => {
    console.log(canvas.value)
  })

  const { cleanup: cleanupCamera, ...camera } = useCamera(canvas);
  const { coordinates, cleanup: cleanupCoords } = useMagicCoordinates(canvas, camera.state);

  return {
    canvasRef: (ref) => canvas.value = ref,
    canvas,
    camera,
    coordinates,
    cleanup: (ref) => {
      cleanupCoords(ref)
      cleanupCamera(ref)
    },
  }
}