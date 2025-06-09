import { onMounted, ref, type Ref } from "vue"
import { useCamera, type Camera } from "./camera"
import { useMagicCoordinates } from "./coordinates"
import type { Coordinate } from "@shape/types/utility"
import { getCtx } from "@utils/ctx"
import { getDevicePixelRatio } from "./camera/utils"

export type MagicCanvasProps = {
  canvas: Ref<HTMLCanvasElement | undefined>
  camera: Omit<Camera, 'cleanup'>,
  cursorCoordinates: Ref<Coordinate>,
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

    const dpr = getDevicePixelRatio()
    const rect = canvas.value.getBoundingClientRect();
    canvas.value.width = rect.width * dpr;
    canvas.value.height = rect.height * dpr;

    repaintInterval = setInterval(repaintCanvas, 1000 / REPAINT_FPS);
  })

  const { cleanup: cleanupCamera, ...camera } = useCamera(canvas);
  const { coordinates: cursorCoordinates, cleanup: cleanupCoords } = useMagicCoordinates(canvas, camera.state);

  let repaintInterval: NodeJS.Timeout;
  const REPAINT_FPS = 60;

  const repaintCanvas = () => {
    const ctx = getCtx(canvas);
    camera.transformAndClear(ctx);
    config.draw(ctx)
  };

  return {
    canvas,
    camera,
    cursorCoordinates,
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