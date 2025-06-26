import type { NumberKeyframe } from "@shape/animation/interpolation/types"
import type { CompileProp } from "."
import { interpolateNumber } from "@shape/animation/interpolation/number"

/**
 * compiles props that are number based into a single animation function
 *
 * number based props include: width, height, size, lineWidth etc
 */
export const compileNumericProp: CompileProp = (
  prop,
  propToRawKeyframes,
  easing,
) => (schema, progress) => {
  const nonAnimatedPropValue = schema[prop]

  if (typeof nonAnimatedPropValue !== 'number') {
    throw `😳! prop ${prop} said to be a number was not at runtime! got ${nonAnimatedPropValue}`
  }

  const keyframes = propToRawKeyframes[prop].map((kf): NumberKeyframe => {
    const getValue = () => {
      if (typeof kf.value === 'function') {
        return kf.value(nonAnimatedPropValue, schema)
      }
      return nonAnimatedPropValue
    }

    return {
      value: getValue(),
      progress: kf.progress,
    }
  })

  const getInterpolatedValue = interpolateNumber(
    keyframes,
    easing,
    nonAnimatedPropValue,
  )

  return getInterpolatedValue(progress)
}