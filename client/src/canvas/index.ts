import { onMounted, ref, watch } from "vue"
import { useCamera } from "./camera"
import { useMagicCoordinates } from "./coordinates"
import { getCtx } from "@utils/ctx"
import { getDevicePixelRatio } from "./camera/utils"
import type { DrawContent, UseMagicCanvas } from "./types"
import { useElementSize } from "@vueuse/core"
import { useBackgroundPattern, type DrawPattern } from "./backgroundPattern"

const REPAINT_FPS = 60;

const initCanvasWidthHeight = (canvas: HTMLCanvasElement | undefined) => {
  if (!canvas) throw new Error('Canvas not found in DOM. Check ref link.');

  const dpr = getDevicePixelRatio()
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
}

export type MagicCanvasOptions = {
  /**
   * a unique ID that is used to track the camera state in localStorage
   */
  id?: string
}

export const useMagicCanvas: UseMagicCanvas = (options = {}) => {
  const canvas = ref<HTMLCanvasElement>()
  const canvasBoxSize = useElementSize(canvas)

  const drawContent = ref<DrawContent>(() => { })
  const drawBackgroundPattern = ref<DrawPattern>(() => { })

  let repaintInterval: NodeJS.Timeout;

  onMounted(() => {
    initCanvasWidthHeight(canvas.value)
    repaintInterval = setInterval(repaintCanvas, 1000 / REPAINT_FPS);
  })

  watch([canvasBoxSize.width, canvasBoxSize.height], () => initCanvasWidthHeight(canvas.value))

  const { cleanup: cleanupCamera, ...camera } = useCamera(canvas, options?.id ?? '[default-id]');
  const { coordinates: cursorCoordinates, cleanup: cleanupCoords } = useMagicCoordinates(canvas);

  const pattern = useBackgroundPattern(camera.state, drawBackgroundPattern)

  const repaintCanvas = () => {
    const ctx = getCtx(canvas);
    camera.transformAndClear(ctx);
    pattern.draw(ctx)
    drawContent.value(ctx)
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
    },
    draw: {
      content: drawContent,
      backgroundPattern: drawBackgroundPattern,
    }
  }
}