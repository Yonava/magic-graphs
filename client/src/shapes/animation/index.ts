import type { SchemaId, Shape, ShapeFactory, ShapeName, WithId } from "@shape/types"
import { shapeProps } from "@shape/types"
import type { ActiveAnimation } from "./types"
import { getAnimationProgress, getCurrentRunCount } from "./utils"
import { useDefineTimeline } from "./timeline/defineTimeline"
import { shapeDefaults } from "@shape/defaults/shapes"
import { shapes } from ".."
import { useAutoAnimateAnchorPoint } from "./autoAnimate"

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

  const { autoAnimate, captureChanges, applyAutoAnimate } = useAutoAnimateAnchorPoint(defineTimeline)

  const animatedFactory = <T>(
    factory: ShapeFactory<T>,
    shapeName: ShapeName,
  ): ShapeFactory<WithId<T>> => (schema) => {
    return new Proxy(factory(schema), {
      get: (target, rawProp) => {
        const prop = rawProp as keyof Shape

        if (!shapeProps.has(prop)) return target[prop]

        const animation = activeAnimations.get(schema.id)

        if (!animation) {
          const alteredFactory = applyAutoAnimate(schema, prop, factory)
          if (alteredFactory) return alteredFactory
          captureChanges(schema)
          return target[prop]
        }

        captureChanges(schema)

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

        const defaultResolver = (shapeDefaults as any)[shapeName]
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
      arrow: animatedFactory(shapes.arrow, 'arrow'),
      circle: animatedFactory(shapes.circle, 'circle'),
      cross: animatedFactory(shapes.cross, 'cross'),
      ellipse: animatedFactory(shapes.ellipse, 'ellipse'),
      image: animatedFactory(shapes.image, 'image'),
      line: animatedFactory(shapes.line, 'line'),
      rect: animatedFactory(shapes.rect, 'rect'),
      scribble: animatedFactory(shapes.scribble, 'scribble'),
      square: animatedFactory(shapes.square, 'square'),
      star: animatedFactory(shapes.star, 'star'),
      triangle: animatedFactory(shapes.triangle, 'triangle'),
      uturn: animatedFactory(shapes.uturn, 'uturn'),
    },
    defineTimeline,
    autoAnimate,
  }
}