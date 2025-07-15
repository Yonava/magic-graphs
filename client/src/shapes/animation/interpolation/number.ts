import type { InterpolationFunction } from "./types";

/**
 * Interpolates a numeric value based on the provided keyframes and easing function.
 *
 * @param keyframes - An array of keyframes, each defining a progress point (0 to 1) and its corresponding value.
 *                    The keyframes should be ordered by progress in ascending order.
 * @param defaultEasing - A function that modifies the interpolation curve (e.g., linear, ease-in, ease-out).
 * @param fallback - The value to return if no keyframes are provided.
 * @returns A function that takes a progress value (between 0 and 1) and returns the interpolated value.
 *          If the provided progress is outside the range of keyframes, the nearest keyframe's value is returned.
 *
 * @example
 * const interpolated = valueAtProgress(
 *  [{ progress: 0, value: 0 }, { progress: 1, value: 10 }],
 *  t => t,
 *  0
 * );
 *
 * interpolated(0.5); // 5
 */
export const interpolateNumber: InterpolationFunction<
  number
> = (keyframes, defaultEasing, fallback) => (progress) => {
  if (keyframes.length === 0) return fallback;

  if (progress <= keyframes[0].progress) return keyframes[0].value;
  if (progress >= keyframes[keyframes.length - 1].progress) return keyframes[keyframes.length - 1].value;

  for (let i = 0; i < keyframes.length - 1; i++) {
    const p1 = keyframes[i];
    const p2 = keyframes[i + 1];

    if (progress >= p1.progress && progress <= p2.progress) {
      const t = (progress - p1.progress) / (p2.progress - p1.progress);
      const easing = p1.easing ?? defaultEasing;
      return p1.value + easing(t) * (p2.value - p1.value);
    }
  }

  return fallback;
};