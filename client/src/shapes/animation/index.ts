import type { SchemaId, Shape, ShapeFactory, WithId } from "@shape/types"
import type { ActiveAnimation, ActiveAnimationWithDefinition } from "./types"
import { square } from "@shapes/square"
import { getAnimationProgress, getCurrentRunCount, validPropsSet } from "./utils"
import type { SquareSchema } from "@shapes/square/types"
import type { AnimationDefinition, DefineAnimation } from "./defineAnimation"

export const useAnimatedShapes = (animationDefs: DefineAnimation[]) => {
  const defMap: Map<AnimationDefinition['id'], AnimationDefinition> = new Map()

  for (const animationDef of animationDefs) {
    defMap.set(animationDef.id, animationDef.getDefinition())
  }

  const getAnimationDefinition = (id: DefineAnimation['id']) => {
    const animation = defMap.get(id)
    if (!animation) throw new Error(`unrecognized animation id: ${id}`)
    return animation
  }

  /**
   * a mapping between shapes (via ids) and the animations currently
   * active/running on those shapes
   */
  const activeAnimations: Map<SchemaId, ActiveAnimation> = new Map()

  const squareWithId: ShapeFactory<WithId<SquareSchema>> = (schema) => {
    return new Proxy(square(schema), {
      get: (target, rawProp) => {
        const prop = rawProp as keyof Shape

        if (!validPropsSet.has(prop)) {
          return target[prop]
        }

        const animation = activeAnimations.get(schema.id)

        if (!animation) return target[prop]

        const animationWithDef: ActiveAnimationWithDefinition = {
          ...getAnimationDefinition(animation.definitionId),
          ...animation,
        }

        // cleanup expired animations
        const currentRunCount = getCurrentRunCount(animationWithDef)
        const shouldRemove = currentRunCount >= animationWithDef.runCount
        if (shouldRemove) {
          activeAnimations.delete(schema.id)
          return target[prop]
        }

        // resolve the properties for the animated shape schema
        const { props } = animationWithDef
        const progress = getAnimationProgress(animationWithDef)

        const infusedProps = Object.entries(props).reduce((acc, curr) => {
          const [propName, progressFn] = curr
          if (!(propName in schema)) return acc
          acc[propName] = progressFn(progress) * (schema as any)[propName]
          return acc
        }, {} as Record<string, number>)

        return square({
          ...schema,
          ...infusedProps,
        })[prop]
      }
    })
  }

  return {
    shapes: { square: squareWithId },
    animation: {
      start: (id: SchemaId, definitionId: string, runCount: number) => {
        activeAnimations.set(id, {
          definitionId,
          runCount,
          startedAt: Date.now(),
        })
      },
      stop: (id: SchemaId) => {
        activeAnimations.delete(id)
      }
    },
  }
}