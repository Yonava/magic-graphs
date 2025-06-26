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
  easing,
) => (schema, progress) => {
  const nonAnimatedPropValue = schema[prop] as Coordinate

  if (
    typeof nonAnimatedPropValue !== 'object' ||
    typeof nonAnimatedPropValue['x'] !== 'number' ||
    typeof nonAnimatedPropValue['y'] !== 'number'
  ) {
    throw `😳! prop ${prop} said to be a coordinate was not at runtime! got ${nonAnimatedPropValue}`
  }

  const keyframes = propToRawKeyframes[prop].map((pt): CoordinateKeyframe => {
    const getValue = () => {
      if (typeof pt.value === 'function') {
        return pt.value(nonAnimatedPropValue, schema)
      }

      return {
        x: pt.value.x + nonAnimatedPropValue.x,
        y: pt.value.y + nonAnimatedPropValue.y,
      }
    }

    return {
      value: getValue(),
      progress: pt.progress,
    }
  })

  const getInterpolatedValue = interpolateCoordinate(
    keyframes,
    easing,
    nonAnimatedPropValue,
  )

  return getInterpolatedValue(progress)
}