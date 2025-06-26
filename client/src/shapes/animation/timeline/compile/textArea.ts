import { getTextAreaWithDefaults } from "@shape/defaults/utility"
import type { CompileProp } from "."
import type { TextArea } from "@shape/types/utility"
import type { TextAreaKeyframe } from "@shape/animation/interpolation/types"
import { interpolateTextArea } from "@shape/animation/interpolation/textArea"

/**
 * compiles props that are textArea based
 */
export const compileTextAreaProp: CompileProp = (
  prop,
  propToRawKeyframes,
  easing,
) => (schema, progress) => {
  const nonAnimatedPropValue = getTextAreaWithDefaults(schema[prop] as TextArea)

  const keyframes = propToRawKeyframes[prop].map((kf): TextAreaKeyframe => {
    const getValue = () => {
      if (typeof kf.value === 'function') {
        return kf.value(nonAnimatedPropValue, schema)
      }
      return getTextAreaWithDefaults(kf.value)
    }

    return {
      value: getValue(),
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