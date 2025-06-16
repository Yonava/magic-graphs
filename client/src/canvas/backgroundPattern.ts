
import { getMagicCoordinates } from "@canvas/coordinates";
import type { Camera } from "./camera";
import type { Coordinate } from "@shape/types/utility";
import type { DrawFns } from "./types";

const STAGGER = 100

const START_PATTERN_FADE_OUT = 0.75
const PATTERN_FULLY_FADED_OUT = 0.25

const computeAlpha = (z: number) => {
  if (z <= PATTERN_FULLY_FADED_OUT) return '00'
  if (z >= START_PATTERN_FADE_OUT) return ''
  const strPercent = String(Math.floor(((z - PATTERN_FULLY_FADED_OUT) / (START_PATTERN_FADE_OUT - PATTERN_FULLY_FADED_OUT)) * 100))
  return strPercent.length === 1 ? `0${strPercent}` : strPercent
}

export type DrawPattern = (ctx: CanvasRenderingContext2D, at: Coordinate, alpha: string) => void

export const useBackgroundPattern = (
  { panX, panY, zoom }: Camera['state'],
  drawPattern: DrawFns['backgroundPattern']
) => {
  const draw = (ctx: CanvasRenderingContext2D) => {
    if (zoom.value <= PATTERN_FULLY_FADED_OUT) return

    const startingCoords = getMagicCoordinates({
      clientX: 0,
      clientY: 0,
    }, ctx)

    const endingCoords = getMagicCoordinates({
      clientX: window.innerWidth + STAGGER,
      clientY: window.innerHeight + STAGGER
    }, ctx)

    const offsetX = (panX.value / zoom.value) % STAGGER;
    const offsetY = (panY.value / zoom.value) % STAGGER;

    for (let x = startingCoords.x + offsetX; x < endingCoords.x; x += STAGGER) {
      for (let y = startingCoords.y + offsetY; y < endingCoords.y; y += STAGGER) {
        drawPattern.value(ctx, { x, y }, computeAlpha(zoom.value))
      }
    }
  }

  return { draw }
}