import type { NumberKeyframe } from "@shape/animation/interpolation/types"
import type { CompileProp } from "."
import { interpolateNumber } from "@shape/animation/interpolation/number"
import { EASING_FUNCTIONS } from "@utils/animate"

/**
 * compiles props that are color based, such
 * as fillColor, into a single animation function
 */
export const compileColorProp: CompileProp = (
  prop,
  propToRawKeyframes,
) => (schema, progress) => {

}