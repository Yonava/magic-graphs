import type { SchemaId, Shape, ShapeFactory, ShapeName, WithId } from "@shape/types"
import { shapeProps } from "@shape/types"
import type { ActiveAnimation } from "./types"
import { getAnimationProgress, getCurrentRunCount } from "./utils"
import { useDefineTimeline } from "./timeline/defineTimeline"
import { shapeDefaults } from "@shape/defaults/shapes"
import { shapes } from ".."
import { useAutoAnimate } from "./autoAnimate"

export const useAnimatedShapes = () => {
  /**
   * a mapping between shapes (via ids) and the animations currently
   * active/running on those shapes
   */
  const activeAnimations: Map<SchemaId, ActiveAnimation> = new Map()

  const schemaIdToShapeName: Map<SchemaId, ShapeName> = new Map()

  const { defineTimeline, timelineIdToTimeline } = useDefineTimeline({
    play: ({ shapeId, ...rest }) => activeAnimations.set(shapeId, {
      ...rest,
      startedAt: Date.now()
    }),
    stop: ({ shapeId }) => activeAnimations.delete(shapeId),
    pause: () => console.warn('not implemented'),
    resume: () => console.warn('not implemented'),
  })

  /**
   * returns the schema of the shape being animated at the time it's invoked
   */
  const getAnimatedSchema = (schemaId: string) => {
    const animation = activeAnimations.get(schemaId)
    if (!animation) return

    const shapeName = schemaIdToShapeName.get(schemaId)
    if (!shapeName) return console.warn('animation set without shape name mapping. this should never happen!')

    const { schema } = animation;
    if (!schema) return console.warn('animation set without a schema. this should never happen!')

    const timeline = timelineIdToTimeline.get(animation.timelineId)
    if (!timeline) throw 'animation activated without a timeline!'

    const animationWithTimeline = {
      ...timeline,
      ...animation,
    }

    if (!animationWithTimeline.validShapes.has(shapeName)) return console.warn('invalid shape name!')

    // cleanup animation if expired
    const currentRunCount = getCurrentRunCount(animationWithTimeline)
    const shouldRemove = currentRunCount >= animationWithTimeline.runCount
    if (shouldRemove) {
      activeAnimations.delete(schemaId)
      return
    }

    // resolve the properties for the animated shape schema
    const { properties } = animationWithTimeline
    const progress = getAnimationProgress(animationWithTimeline)

    const infusedProps = Object.entries(properties).reduce((acc, curr) => {
      const [propName, getAnimatedValue] = curr
      if (!(propName in schema)) return acc

      acc[propName] = getAnimatedValue(schema, progress)

      return acc
    }, {} as Record<string, number>)

    return {
      ...schema,
      ...infusedProps,
    }
  }

  const { autoAnimate, captureChanges, applyAutoAnimate } = useAutoAnimate(defineTimeline, getAnimatedSchema)

  const animatedFactory = <T>(
    factory: ShapeFactory<T>,
    shapeName: ShapeName,
  ): ShapeFactory<WithId<T>> => (schema) => {
    return new Proxy(factory(schema), {
      get: (target, rawProp) => {
        const prop = rawProp as keyof Shape

        if (!shapeProps.has(prop)) return target[prop]

        const animation = activeAnimations.get(schema.id)

        const alteredFactory = applyAutoAnimate(schema, prop, factory, shapeName)
        captureChanges(schema)
        if (alteredFactory) return alteredFactory

        if (!animation) return target[prop]

        if (!animation?.schema) {
          const defaultResolver = (shapeDefaults as any)[shapeName]
          if (!defaultResolver) throw `cant find defaults for ${shapeName}`
          const schemaWithDefaults = defaultResolver(schema)
          animation.schema = schemaWithDefaults;
          schemaIdToShapeName.set(schema.id, shapeName);
        }

        const animatedSchema = getAnimatedSchema(schema.id)
        if (!animatedSchema) return target[prop]

        return factory(animatedSchema)[prop]
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
    getAnimatedSchema,
  }
}