import { onMounted, ref, watch } from "vue"
import { useCamera } from "./camera"
import { useMagicCoordinates } from "./coordinates"
import { getCtx } from "@utils/ctx"
import { getDevicePixelRatio } from "./camera/utils"
import type { MagicCanvasConfig, UseMagicCanvas } from "./types"
import { useElementSize } from "@vueuse/core"

const REPAINT_FPS = 60;

const initCanvasWidthHeight = (canvas: HTMLCanvasElement | undefined) => {
  if (!canvas) throw new Error('Canvas not found in DOM. Check ref link.');

  const dpr = getDevicePixelRatio()
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
}

export const useMagicCanvas: UseMagicCanvas = (config: MagicCanvasConfig) => {
  const canvas = ref<HTMLCanvasElement>()
  const canvasBoxSize = useElementSize(canvas)

  let repaintInterval: NodeJS.Timeout;

  onMounted(() => {
    initCanvasWidthHeight(canvas.value)
    repaintInterval = setInterval(repaintCanvas, 1000 / REPAINT_FPS);
  })

  watch([canvasBoxSize.width, canvasBoxSize.height], () => initCanvasWidthHeight(canvas.value))

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