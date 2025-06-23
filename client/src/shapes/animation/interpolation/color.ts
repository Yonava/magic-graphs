import type { EasingFunction } from "@utils/animate";
import type { Color } from "@utils/colors";
import tinycolor from "tinycolor2";
import type { ColorKeyframe } from "./types";

export const isColor = (color: tinycolor.Instance) => color.isValid();

export const interpolateColorKeyframes = (
  keyframes: ColorKeyframe[],
  easing: EasingFunction,
  fallbackValue: Color
) => (progress: number) => {
  if (keyframes.length === 0) return fallbackValue;

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
      const easedProgress = easing(localProgress);

      const startRgba = tinycolor(startKeyframe.value).toRgb();
      const endRgba = tinycolor(endKeyframe.value).toRgb();

      const r = startRgba.r + (endRgba.r - startRgba.r) * easedProgress;
      const g = startRgba.g + (endRgba.g - startRgba.g) * easedProgress;
      const b = startRgba.b + (endRgba.b - startRgba.b) * easedProgress;
      const a = startRgba.a + (endRgba.a - startRgba.a) * easedProgress;

      return tinycolor({ r, g, b, a }).toRgbString();
    }
  }

  return fallbackValue
};
