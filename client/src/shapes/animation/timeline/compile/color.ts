import type { CompileProp } from "."
import { interpolateColor, isColorString } from "@shape/animation/interpolation/color"
import type { ColorKeyframe } from "@shape/animation/interpolation/types"

/**
 * compiles props that are color based, such
 * as fillColor, into a single animation function
 */
export const compileColorProp: CompileProp = (
  prop,
  propToRawKeyframes,
  easing,
) => (schema, progress) => {
  const nonAnimatedPropValue = schema[prop]

  const isColor = (
    typeof nonAnimatedPropValue === 'string' &&
    isColorString(nonAnimatedPropValue)
  )
  if (!isColor) {
    throw `😳! prop ${prop} said to be a color was not at runtime! got ${nonAnimatedPropValue}`
  }

  const keyframes = propToRawKeyframes[prop].map((kf): ColorKeyframe => {
    const getValue = () => {
      if (typeof kf.value === 'function') {
        return kf.value(nonAnimatedPropValue, schema)
      }
      return kf.value
    }

    return {
      ...kf,
      value: getValue(),
    }
  })

  const getInterpolatedValue = interpolateColor(
    keyframes,
    easing,
    nonAnimatedPropValue,
  )

  return getInterpolatedValue(progress)
}
