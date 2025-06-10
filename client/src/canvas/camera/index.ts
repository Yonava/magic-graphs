import type { Ref } from "vue";
import { usePanAndZoom } from "./panZoom";
import { addTransform, getDevicePixelRatio, type TransformOptions } from "./utils";
import { cross } from "@shapes";
import colors from "@utils/colors";
import { getMagicCoordinates } from "@canvas/coordinates";

const computeAlpha = (z: number) => {
  const MIN = 0.5
  const MAX = 1
  if (z <= MIN) return '00'
  if (z >= MAX) return ''
  const strPercent = String(Math.floor(((z - MIN) / (MAX - MIN)) * 100))
  return strPercent.length === 1 ? `0${strPercent}` : strPercent
}

export const useCamera = (canvas: Ref<HTMLCanvasElement | undefined>) => {
  const { getTransform: getPZTransform, ...rest } = usePanAndZoom(canvas)
  const dpr = getDevicePixelRatio()

  const dprTransform: TransformOptions = {
    scaleX: dpr,
    scaleY: dpr,
  }

  return {
    ...rest,
    transformAndClear: (ctx: CanvasRenderingContext2D) => {
      ctx.resetTransform()
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const transforms = [dprTransform, getPZTransform()]
      for (const t of transforms) addTransform(ctx, t)

      const { panX, panY, zoom } = rest.state

      if (zoom.value <= 0.5) return

      const STAGGER = 100

      const startingCoords = getMagicCoordinates({
        clientX: -STAGGER,
        clientY: -STAGGER,
      }, ctx)

      const endingCoords = getMagicCoordinates({
        clientX: window.innerWidth + STAGGER,
        clientY: window.innerHeight + STAGGER
      }, ctx)

      for (let x = startingCoords.x; x < endingCoords.x; x += STAGGER) {
        for (let y = startingCoords.y; y < endingCoords.y; y += STAGGER) {
          cross({
            size: 12, at: {
              x: x + ((panX.value / zoom.value) % STAGGER),
              y: y + ((panY.value / zoom.value) % STAGGER),
            }, lineWidth: 1, fillColor: colors.GRAY_500 + computeAlpha(zoom.value)
          }).draw(ctx)
        }
      }
    },
  }
}

export type Camera = ReturnType<typeof useCamera>