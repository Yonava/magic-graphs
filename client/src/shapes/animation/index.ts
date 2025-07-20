import type { EverySchemaPropName, SchemaId, Shape, ShapeFactory, ShapeName, WithId } from "@shape/types"
import { shapeProps } from "@shape/types"
import type { ActiveAnimation, LooseSchema } from "./types"
import { getAnimationProgress, getCurrentRunCount } from "./utils"
import { useDefineTimeline } from "./timeline/define"
import { shapeDefaults } from "@shape/defaults/shapes"
import { shapes } from ".."
import { useAutoAnimate } from "./autoAnimate"


type ActiveAnimationsMap = Map<SchemaId, ActiveAnimation[]>;
export type GetAnimatedSchema = (schemaId: SchemaId) => LooseSchema | undefined

export const useAnimatedShapes = () => {
  /**
   * a mapping between shapes (via ids) and the animations currently
   * active/running on those shapes
   */
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
   * if schema is actively being animated, returns the live schema with animated props applied.
   */
  const getAnimatedSchema: GetAnimatedSchema = (schemaId) => {
    const animations = activeAnimations.get(schemaId)
    if (!animations || animations.length === 0) return

    let outputSchema = animations[0].schema

    if (!outputSchema) {
      console.warn('animation set without a schema. this should never happen!')
      return
    }

    for (const animation of animations) {
      const timeline = timelineIdToTimeline.get(animation.timelineId)
      if (!timeline) throw new Error('animation activated without a timeline!')

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
        acc[propName as EverySchemaPropName] = getAnimatedValue(outputSchema, progress)
        return acc
      }, {} as LooseSchema)

      outputSchema = {
        ...outputSchema,
        ...infusedProps,
      }
    }

    return outputSchema
  }

  const autoAnimate = useAutoAnimate(defineTimeline, getAnimatedSchema)

  const animatedFactory = <T extends Omit<LooseSchema, 'id'>>(
    factory: ShapeFactory<T>,
    shapeName: ShapeName,
  ): ShapeFactory<WithId<T>> => (schema) => new Proxy(factory(schema), {
    get: (target, rawProp) => {
      const prop = rawProp as keyof Shape
      if (!shapeProps.has(prop)) return target[prop]

      const animations = activeAnimations.get(schema.id)

      const defaultResolver: ((schema: LooseSchema) => LooseSchema) | undefined = (shapeDefaults as any)?.[shapeName]
      if (!defaultResolver) throw new Error(`cant find defaults for ${shapeName}`)
      const schemaWithDefaults = defaultResolver(schema)

      autoAnimate.captureSchemaState(schemaWithDefaults, shapeName)

      const targetMapSchema = autoAnimate.snapshotMap.get(schema.id)
      if (targetMapSchema) return factory((targetMapSchema as WithId<T>))[prop]

      if (!animations || animations.length === 0) return target[prop]
      if (!animations[0]?.schema) animations[0].schema = schemaWithDefaults;

      if (prop === 'startTextAreaEdit') return console.warn('shapes with active animations cannot spawn text inputs')

      const hasShapeName = schemaIdToShapeName.get(schema.id)
      if (!hasShapeName) schemaIdToShapeName.set(schema.id, shapeName);

      const animatedSchema = getAnimatedSchema(schema.id)
      if (!animatedSchema) return target[prop]

      return factory((animatedSchema as WithId<T>))[prop]
    }
  })

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
    autoAnimate: { captureFrame: autoAnimate.captureFrame },
    getAnimatedSchema,
    activeAnimations,
  }
}

export type AnimatedShapeControls = ReturnType<typeof useAnimatedShapes>