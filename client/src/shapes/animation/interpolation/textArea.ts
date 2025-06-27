import type { ColorKeyframe, InterpolationFunction, NumberKeyframe } from "./types";
import { interpolateColor } from "./color";
import { interpolateNumber } from "./number";
import type { TextAreaWithDefaults } from "@shape/text/defaults";

export const interpolateTextArea: InterpolationFunction<
  TextAreaWithDefaults
> = (keyframes, easing, fallback) => {
  return (progress) => {
    const colorKeyframes = keyframes.map((kf): ColorKeyframe => ({
      ...kf,
      value: kf.value.color
    }))

    const activeColorKeyframes = keyframes.map((kf): ColorKeyframe => ({
      ...kf,
      value: kf.value.activeColor,
    }))


    const textColorKeyframes = keyframes.map((kf): ColorKeyframe => ({
      ...kf,
      value: kf.value.textBlock.color,
    }))

    const textSizeKeyframes = keyframes.map((kf): NumberKeyframe => ({
      ...kf,
      value: kf.value.textBlock.fontSize,
    }))

    const textAreaColor = interpolateColor(colorKeyframes, easing, fallback.color);
    const textColor = interpolateColor(textColorKeyframes, easing, fallback.textBlock.color)
    const textFontSize = interpolateNumber(textSizeKeyframes, easing, fallback.textBlock.fontSize)
    const textAreaActiveColor = interpolateColor(activeColorKeyframes, easing, fallback.activeColor)

    const { textBlock } = fallback

    return {
      textBlock: {
        ...textBlock,
        color: textColor(progress),
        fontSize: textFontSize(progress),
      },
      color: textAreaColor(progress),
      activeColor: textAreaActiveColor(progress),
    }
  }
}