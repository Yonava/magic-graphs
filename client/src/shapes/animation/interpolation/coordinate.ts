import { interpolateNumber } from "./number";
import type { InterpolationFunction, NumberKeyframe } from "./types";
import type { Coordinate } from "@shape/types/utility";

export const interpolateCoordinate: InterpolationFunction<
  Coordinate
> = (keyframes, defaultEasing, fallback) => {
  return (progress) => {
    const xKeyframes = keyframes.map((kf): NumberKeyframe => ({
      value: kf.value.x,
      progress: kf.progress,
    }))

    const yKeyframes = keyframes.map((kf): NumberKeyframe => ({
      value: kf.value.y,
      progress: kf.progress,
    }))

    const x = interpolateNumber(xKeyframes, defaultEasing, fallback.x)
    const y = interpolateNumber(yKeyframes, defaultEasing, fallback.y)

    return {
      x: x(progress),
      y: y(progress),
    }
  }
}