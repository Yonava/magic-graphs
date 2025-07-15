import type { Color } from "@utils/colors";
import tinycolor from "tinycolor2";
import type { InterpolationFunction } from "./types";

/**
 * @returns true if the supplied string can be parsed as a color
 */
export const isColorString = (color: Color) => isColor(tinycolor(color))
export const isColor = (color: tinycolor.Instance) => color.isValid();

export const interpolateColor: InterpolationFunction<
  Color
> = (keyframes, defaultEasing, fallback) => (progress) => {
  if (keyframes.length === 0) return fallback;

  const validColors = keyframes.map(kf => tinycolor(kf.value));

  if (!validColors.every(isColor)) {
    throw new Error('Invalid color provided in keyframe.');
  }

  for (let i = 0; i < keyframes.length - 1; i++) {
    const startKeyframe = keyframes[i];
    const endKeyframe = keyframes[i + 1];

    if (progress >= startKeyframe.progress && progress <= endKeyframe.progress) {
      const range = endKeyframe.progress - startKeyframe.progress;
      const localProgress = (progress - startKeyframe.progress) / range;
      const easingFn = startKeyframe.easing ?? defaultEasing;
      const easedProgress = easingFn(localProgress)

      const startRgba = tinycolor(startKeyframe.value).toRgb();
      const endRgba = tinycolor(endKeyframe.value).toRgb();

      const r = startRgba.r + (endRgba.r - startRgba.r) * easedProgress;
      const g = startRgba.g + (endRgba.g - startRgba.g) * easedProgress;
      const b = startRgba.b + (endRgba.b - startRgba.b) * easedProgress;
      const a = startRgba.a + (endRgba.a - startRgba.a) * easedProgress;

      return tinycolor({ r, g, b, a }).toRgbString();
    }
  }

  return fallback
};
