import type { CoordinateKeyframe } from "@shape/animation/interpolation/types"
import type { CompileProp } from "."
import { interpolateCoordinate } from "@shape/animation/interpolation/coordinate"
import type { Coordinate } from "@shape/types/utility"

/**
 * compiles props that are coordinate based into a single animation function
 *
 * coordinate based props include: at, start, end, etc
 */
export const compileCoordinateProp: CompileProp = (
  prop,
  propToRawKeyframes,
  defaultEasing,
) => (schema, progress) => {
  const nonAnimatedPropValue = schema[prop] as Coordinate

  if (
    typeof nonAnimatedPropValue !== 'object' ||
    typeof nonAnimatedPropValue['x'] !== 'number' ||
    typeof nonAnimatedPropValue['y'] !== 'number'
  ) {
    throw `😳! prop ${prop} said to be a coordinate was not at runtime! got ${nonAnimatedPropValue}`
  }

  const keyframes = propToRawKeyframes[prop].map((kf): CoordinateKeyframe => {
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

  const getInterpolatedValue = interpolateCoordinate(
    keyframes,
    defaultEasing,
    nonAnimatedPropValue,
  )

  return getInterpolatedValue(progress)
}