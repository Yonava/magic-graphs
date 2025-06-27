import type { SchemaId, Shape, ShapeFactory, ShapeName, WithId } from "@shape/types"
import type { ActiveAnimation } from "./types"
import { square } from "@shapes/square"
import { getAnimationProgress, getCurrentRunCount, validPropsSet } from "./utils"
import { rect } from "@shapes/rect"
import { line } from "@shapes/line"
import { arrow } from "@shapes/arrow"
import { useDefineTimeline } from "./timeline/defineTimeline"
import { uturn } from "@shapes/uturn"
import { circle } from "@shapes/circle"
import { resolveCircleDefaults } from "@shape/shapes/circle/defaults"
import { resolveUTurnDefaults } from "@shape/shapes/uturn/defaults"
import { resolveLineDefaults } from "@shape/shapes/line/defaults"
import { resolveArrowDefaults } from "@shape/shapes/arrow/defaults"
import { resolveSquareDefaults } from "@shape/shapes/square/defaults"
import { resolveRectDefaults } from "@shape/shapes/rect/defaults"

export const defaultMap = {
  circle: resolveCircleDefaults,
  uturn: resolveUTurnDefaults,
  line: resolveLineDefaults,
  arrow: resolveArrowDefaults,
  square: resolveSquareDefaults,
  rect: resolveRectDefaults,
} as const

export const useAnimatedShapes = () => {

  /**
   * a mapping between shapes (via ids) and the animations currently
   * active/running on those shapes
   */
  const activeAnimations: Map<SchemaId, ActiveAnimation> = new Map()

  const { defineTimeline, timelineIdToTimeline } = useDefineTimeline({
    play: ({ shapeId, ...rest }) => activeAnimations.set(shapeId, {
      ...rest,
      startedAt: Date.now()
    }),
    stop: ({ shapeId }) => activeAnimations.delete(shapeId),
    pause: () => console.warn('not implemented'),
    resume: () => console.warn('not implemented'),
  })

  const animatedFactory = <T>(
    factory: ShapeFactory<T>,
    shapeName: ShapeName,
  ) => (schema: WithId<T>) => {
    return new Proxy(factory(schema), {
      get: (target, rawProp) => {
        const prop = rawProp as keyof Shape

        if (!validPropsSet.has(prop)) {
          return target[prop]
        }

        const animation = activeAnimations.get(schema.id)

        if (!animation) return target[prop]

        const timeline = timelineIdToTimeline.get(animation.timelineId)
        if (!timeline) throw 'animation activated without a timeline!'

        const animationWithTimeline = {
          ...timeline,
          ...animation,
        }

        if (!animationWithTimeline.validShapes.has(shapeName)) return target[prop]

        // cleanup animation if expired
        const currentRunCount = getCurrentRunCount(animationWithTimeline)
        const shouldRemove = currentRunCount >= animationWithTimeline.runCount
        if (shouldRemove) {
          activeAnimations.delete(schema.id)
          return target[prop]
        }

        // resolve the properties for the animated shape schema
        const { properties } = animationWithTimeline
        const progress = getAnimationProgress(animationWithTimeline)

        const defaultResolver = (defaultMap as any)[shapeName]
        if (!defaultResolver) throw `cant find defaults for ${shapeName}`
        const schemaWithDefaults = defaultResolver(schema)

        const infusedProps = Object.entries(properties).reduce((acc, curr) => {
          const [propName, getAnimatedValue] = curr
          if (!(propName in schemaWithDefaults)) return acc

          acc[propName] = getAnimatedValue(schemaWithDefaults, progress)

          return acc
        }, {} as Record<string, number>)

        return factory({
          ...schemaWithDefaults,
          ...infusedProps,
        })[prop]
      }
    })
  }

  return {
    shapes: {
      square: animatedFactory(square, 'square'),
      rect: animatedFactory(rect, 'rect'),
      line: animatedFactory(line, 'line'),
      arrow: animatedFactory(arrow, 'arrow'),
      uturn: animatedFactory(uturn, 'uturn'),
      circle: animatedFactory(circle, 'circle'),
    },
    defineTimeline,
  }
}