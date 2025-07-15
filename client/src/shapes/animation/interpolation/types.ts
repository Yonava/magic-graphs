import type { Coordinate } from "@shape/types/utility";
import type { Color } from "@utils/colors";
import type { DeepRequired } from "ts-essentials";
import type { EasingFunction } from "../easing";
import type { TextArea } from "@shape/text/types";

/**
 * Represents a keyframe in an animation, defining the value at a specific point in the animation timeline.
 *
 * @template T The type of value being animated (e.g., number, color, coordinate).
 */
export type AnimationKeyframe<T> = {
  /**
   * The value at this point in the animation timeline.
   */
  value: T;

  /**
   * The normalized progress position of the keyframe, ranging from 0 to 1.
   *
   * For example, in a 1-second animation:
   * - 0 represents 0ms (start)
   * - 0.5 represents 500ms (midpoint)
   * - 1 represents 1000ms (end)
   */
  progress: number;

  /**
   * The easing function applied between this keyframe and the next.
   *
   * Defines how the interpolation progresses over time within this segment.
   */
  easing?: EasingFunction;
};

export type InterpolationFunction<T> = (
  keyframes: AnimationKeyframe<T>[],
  defaultEasing: EasingFunction,
  fallbackValue: T
) => (progress: number) => T;

export type NumberKeyframe = AnimationKeyframe<number>
export type ColorKeyframe = AnimationKeyframe<Color>
export type CoordinateKeyframe = AnimationKeyframe<Coordinate>
export type TextAreaKeyframe = AnimationKeyframe<DeepRequired<TextArea>>