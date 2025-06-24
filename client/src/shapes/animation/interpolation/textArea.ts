import type { TextArea } from "@shape/types/utility";
import type { ColorKeyframe, InterpolationFunction, NumberKeyframe } from "./types";
import type { DeepRequired } from "ts-essentials";
import { interpolateColor } from "./color";
import { interpolateNumber } from "./number";

export const interpolateTextArea: InterpolationFunction<
  DeepRequired<TextArea>
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

    const { textBlock } = fallback

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