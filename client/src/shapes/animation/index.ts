import type { SchemaId, Shape, ShapeFactory, ShapeName, WithId } from "@shape/types"
import { shapeProps } from "@shape/types"
import type { ActiveAnimation } from "./types"
import { getAnimationProgress, getCurrentRunCount } from "./utils"
import { useDefineTimeline } from "./timeline/defineTimeline"
import { shapeDefaults } from "@shape/defaults/shapes"
import { shapes } from ".."
import { useAutoAnimate } from "./autoAnimate"

/**
 * a mapping between shapes (via ids) and the animations currently
 * active/running on those shapes
 */
export type ActiveAnimationsMap = Map<SchemaId, ActiveAnimation[]>;

export const useAnimatedShapes = () => {
  const activeAnimations: ActiveAnimationsMap = new Map()

  const schemaIdToShapeName: Map<SchemaId, ShapeName> = new Map()

  const { defineTimeline, timelineIdToTimeline } = useDefineTimeline({
    play: ({ shapeId, timelineId, runCount = Infinity }) => {
      const newAnimation: ActiveAnimation = {
        runCount,
        startedAt: Date.now(),
        timelineId,
      }

      const currAnimations = activeAnimations.get(shapeId)
      if (currAnimations) {
        currAnimations.push(newAnimation)
      } else {
        activeAnimations.set(shapeId, [newAnimation])
      }
    },
    stop: ({ shapeId, timelineId }) => {
      const animations = activeAnimations.get(shapeId)
      if (!animations) return
      const stillRunning = animations.filter((a) => a.timelineId !== timelineId)
      if (stillRunning.length === 0) return activeAnimations.delete(shapeId)
      activeAnimations.set(shapeId, stillRunning)
    },
    pause: () => console.warn('not implemented'),
    resume: () => console.warn('not implemented'),
  })

  /**
   * returns the schema of the shape being animated at the time it's invoked
   */
  const getAnimatedSchema = (schemaId: string) => {
    const animations = activeAnimations.get(schemaId)
    if (!animations || animations.length === 0) return

    let outputSchema = animations[0].schema

    if (!outputSchema) {
      return console.warn('animation set without a schema. this should never happen!')
    }

    for (const animation of animations) {
      const timeline = timelineIdToTimeline.get(animation.timelineId)
      if (!timeline) throw 'animation activated without a timeline!'

      const animationWithTimeline = {
        ...timeline,
        ...animation,
      }

      const shapeName = schemaIdToShapeName.get(schemaId)
      if (!shapeName) {
        console.warn('animation set without shape name mapping. this should never happen!')
        continue
      }

      if (!animationWithTimeline.validShapes.has(shapeName)) {
        console.warn('invalid shape name!')
        continue
      }

      // cleanup animation if expired
      const currentRunCount = getCurrentRunCount(animationWithTimeline)
      const shouldRemove = currentRunCount >= animationWithTimeline.runCount
      if (shouldRemove) {
        activeAnimations.delete(schemaId)
        continue
      }

      // resolve the properties for the animated shape schema
      const { properties } = animationWithTimeline
      const progress = getAnimationProgress(animationWithTimeline)

      const infusedProps = Object.entries(properties).reduce((acc, curr) => {
        const [propName, getAnimatedValue] = curr
        acc[propName] = getAnimatedValue(outputSchema, progress)
        return acc
      }, {} as Record<string, number>)

      outputSchema = {
        ...outputSchema,
        ...infusedProps,
      }
    }

    return outputSchema
  }

  const {
    autoAnimate,
    captureSchemaState: captureChanges,
    applyAutoAnimation: applyAutoAnimate,
  } = useAutoAnimate(defineTimeline, getAnimatedSchema)

  const animatedFactory = <T>(
    factory: ShapeFactory<T>,
    shapeName: ShapeName,
  ): ShapeFactory<WithId<T>> => (schema) => {
    return new Proxy(factory(schema), {
      get: (target, rawProp) => {
        const prop = rawProp as keyof Shape

        if (!shapeProps.has(prop)) return target[prop]

        const animations = activeAnimations.get(schema.id)

        const defaultResolver = (shapeDefaults as any)[shapeName]
        if (!defaultResolver) throw `cant find defaults for ${shapeName}`
        const schemaWithDefaults = defaultResolver(schema)

        const alteredSchema = applyAutoAnimate(schemaWithDefaults, shapeName)
        captureChanges(schemaWithDefaults)
        if (alteredSchema) return factory(alteredSchema)[prop]

        if (!animations || animations.length === 0) return target[prop]

        if (!animations[0]?.schema) {
          animations[0].schema = schemaWithDefaults;
        }

        const hasShapeName = schemaIdToShapeName.get(schema.id)
        if (!hasShapeName) schemaIdToShapeName.set(schema.id, shapeName);

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
    activeAnimations,
  }
}