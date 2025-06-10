import { onMounted, ref } from "vue"
import { useCamera } from "./camera"
import { useMagicCoordinates } from "./coordinates"
import { getCtx } from "@utils/ctx"
import { getDevicePixelRatio } from "./camera/utils"
import type { MagicCanvasConfig, UseMagicCanvas } from "./types"

const REPAINT_FPS = 60;

export const useMagicCanvas: UseMagicCanvas = (config: MagicCanvasConfig) => {
  const canvas = ref<HTMLCanvasElement>()

  let repaintInterval: NodeJS.Timeout;

  onMounted(() => {
    if (!canvas.value) throw new Error('Canvas not found in DOM. Check ref link.');

    const dpr = getDevicePixelRatio()
    const rect = canvas.value.getBoundingClientRect();
    canvas.value.width = rect.width * dpr;
    canvas.value.height = rect.height * dpr;

    repaintInterval = setInterval(repaintCanvas, 1000 / REPAINT_FPS);
  })

  const { cleanup: cleanupCamera, ...camera } = useCamera(canvas);
  const { coordinates: cursorCoordinates, cleanup: cleanupCoords } = useMagicCoordinates(canvas);

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