import { interpolateNumber } from "./number";
import type { InterpolationFunction, NumberKeyframe } from "./types";
import type { Coordinate } from "@shape/types/utility";

export const interpolateCoordinate: InterpolationFunction<
  Coordinate
> = (keyframes, easing, fallback) => (progress) => {
  const xKeyframes = keyframes.map((kf): NumberKeyframe => ({
    value: kf.value.x,
    progress: kf.progress,
  }))

  const yKeyframes = keyframes.map((kf): NumberKeyframe => ({
    value: kf.value.y,
    progress: kf.progress,
  }))

  return {
    x: interpolateNumber(xKeyframes, easing, fallback.x)(progress),
    y: interpolateNumber(yKeyframes, easing, fallback.y)(progress),
  }
}