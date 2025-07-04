import type { Coordinate, TextArea } from "@shape/types/utility";
import type { Color } from "@utils/colors";
import type { DeepRequired } from "ts-essentials";
import type { EasingFunction } from "../easing";

export type AnimationKeyframe<T> = {
  /**
   * The value at this point in the animation timeline.
   */
  value: T;
  /**
   * The progress position, ranging from 0 to 1.
   * For example, in a 1-second animation:
   * - 0 represents 0ms (start)
   * - 0.5 represents 500ms (midpoint)
   * - 1 represents 1000ms (end)
   */
  progress: number;
};

export type InterpolationFunction<T> = (
  keyframes: AnimationKeyframe<T>[],
  easing: EasingFunction,
  fallbackValue: T
) => (progress: number) => T;

export type NumberKeyframe = AnimationKeyframe<number>
export type ColorKeyframe = AnimationKeyframe<Color>
export type CoordinateKeyframe = AnimationKeyframe<Coordinate>
export type TextAreaKeyframe = AnimationKeyframe<DeepRequired<TextArea>>