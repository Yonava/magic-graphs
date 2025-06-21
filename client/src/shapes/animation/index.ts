import type { SchemaId, Shape, ShapeFactory, WithId } from "@shape/types"
import type { ActiveAnimation, ActiveAnimationWithDefinition } from "./types"
import { square } from "@shapes/square"
import { validPropsSet } from "./utils"
import type { SquareSchema } from "@shapes/square/types"

export const useAnimatedShapes = () => {
  /**
   * a mapping between shapes (via ids) and the animations currently
   * active/running on those shapes
   */
  const activeAnimations: Map<SchemaId, ActiveAnimation[]> = new Map()

  const squareWithId: ShapeFactory<WithId<SquareSchema>> = (schema) => {
    return new Proxy(square(schema), {
      get: (target, rawProp) => {
        const prop = rawProp as keyof Shape

        if (!validPropsSet.has(prop)) {
          console.warn('invalid prop passed to animated shape')
          return target[prop]
        }

        const animationsOnShape = activeAnimations.get(schema.id)

        const notAnimating = !animationsOnShape || animationsOnShape.length === 0
        if (notAnimating) return target[prop]

        const animationDefs = animationsOnShape.map((a): ActiveAnimationWithDefinition => ({
          ...getAnimationDefinition(a.definitionId),
          ...a
        }))

        // cleanup expired animations
        for (const animation of animationDefs) {
          // const { timeAtStart, def: { durationMs } } = animation
          // const timesRun = getTimesRun(animationDurationMs, Date.now() - timeBegun)
          // const shouldRemove = timesRun >= 0.5
          // if (shouldRemove) {
          //   activeAnimations.delete(schema.id)
          // }
        }

        // resolve the properties for the animated shape schema
        const animatedSchema = {}
      }
    })
  }

  return {
    shapes: { square: squareWithId },
    animation: {
      start: (id: SchemaId) => {
        activeAnimations.set(id, Date.now())
      },
      stop: (id: SchemaId) => {
        activeAnimations.delete(id)
      }
    },
  }
}