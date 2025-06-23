import type { EasingFunction } from "@utils/animate";
import type { CoordinateKeyframe, InterpolationFunction } from "./types";
import type { Coordinate } from "@shape/types/utility";


export const interpolateCoordinate: InterpolationFunction<
  Coordinate
> = (keyframes, easing, fallback) => (progress) => { }