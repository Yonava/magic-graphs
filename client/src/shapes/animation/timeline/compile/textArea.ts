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
  defaultEasing,
) => (schema, progress) => {
  const nonAnimatedPropValue = schema[prop] as TextAreaWithDefaults

  const keyframes = propToRawKeyframes[prop].map((kf): TextAreaKeyframe => {
    const getValue = () => {
      if (typeof kf.value === 'function') {
        return kf.value(nonAnimatedPropValue, schema)
      }
      return kf.value
    }

    const value = resolveTextArea(getValue())?.textArea
    if (!value) throw 'received undefined value from resolved text area'

    return {
      ...kf,
      value,
    }
  })

  const getInterpolatedValue = interpolateTextArea(
    keyframes,
    defaultEasing,
    nonAnimatedPropValue,
  )

  return getInterpolatedValue(progress)
}