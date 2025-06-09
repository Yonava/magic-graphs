import { onMounted, ref, type Ref } from "vue"
import { useCamera, type Camera } from "./camera"
import { useMagicCoordinates } from "./useCoordinates"
import type { Coordinate } from "@shape/types/utility"
import { getCtx } from "@utils/ctx"
import { initCanvas } from "./initCanvas"

export type MagicCanvasProps = {
  canvas: Ref<HTMLCanvasElement | undefined>
  camera: Omit<Camera, 'cleanup'>,
  coordinates: Ref<Coordinate>,
  ref: {
    canvasRef: (canvas: HTMLCanvasElement) => void,
    cleanup: (canvas: HTMLCanvasElement) => void,
  }
}

export type MagicCanvasConfig = {
  draw: (ctx: CanvasRenderingContext2D) => void
}

export type UseMagicCanvas = (config: MagicCanvasConfig) => MagicCanvasProps

export const useMagicCanvas: UseMagicCanvas = (config: MagicCanvasConfig) => {
  const canvas = ref<HTMLCanvasElement>()

  onMounted(() => {
    if (!canvas.value) throw new Error('Canvas not found in DOM. Check ref link.');
    initCanvas(canvas.value);
    repaintInterval = setInterval(repaintCanvas, 1000 / REPAINT_FPS);
  })

  let repaintInterval: NodeJS.Timeout;
  const REPAINT_FPS = 60;

  const repaintCanvas = () => {
    const ctx = getCtx(canvas);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    camera.transform(ctx);
    config.draw(ctx)
  };

  const { cleanup: cleanupCamera, ...camera } = useCamera(canvas);
  const { coordinates, cleanup: cleanupCoords } = useMagicCoordinates(canvas, camera.state);

  return {
    canvas,
    camera,
    coordinates,
    ref: {
      canvasRef: (ref) => canvas.value = ref,
      cleanup: (ref) => {
        cleanupCoords(ref)
        cleanupCamera(ref)
        clearInterval(repaintInterval)
      },
    }
  }
}