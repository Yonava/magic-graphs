import type { CompileProp } from "."
import type { TextAreaKeyframe } from "@shape/animation/interpolation/types"
import { interpolateTextArea } from "@shape/animation/interpolation/textArea"
import { resolveTextArea, type TextAreaWithDefaults } from "@shape/text/defaults"

/**
 * compiles props that are textArea based
 */
export const compileTextAreaProp: CompileProp = (
  prop,
  propToRawKeyframes,
  easing,
) => (schema, progress) => {
  const nonAnimatedPropValue = schema[prop] as TextAreaWithDefaults

  const keyframes = propToRawKeyframes[prop].map((kf): TextAreaKeyframe => {
    const getValue = () => {
      if (typeof kf.value === 'function') {
        return kf.value(nonAnimatedPropValue, schema)
      }
      return kf.value
    }

    return {
      value: resolveTextArea(getValue()),
      progress: kf.progress,
    }
  })

  const getInterpolatedValue = interpolateTextArea(
    keyframes,
    easing,
    nonAnimatedPropValue,
  )

  return getInterpolatedValue(progress)
}