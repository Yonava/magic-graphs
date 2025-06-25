import type { SchemaId, Shape, ShapeFactory, WithId } from "@shape/types"
import type { ActiveAnimation } from "./types"
import { square } from "@shapes/square"
import { getAnimationProgress, getCurrentRunCount, validPropsSet } from "./utils"
import { rect } from "@shapes/rect"
import { line } from "@shapes/line"
import {
  FILL_COLOR_DEFAULTS,
  BORDER_RADIUS_DEFAULTS,
  LINE_WIDTH_DEFAULTS,
  ROTATION_DEFAULTS
} from "@shape/defaults/schema"
import { arrow } from "@shapes/arrow"
import { getTextAreaWithDefaults } from "@shape/defaults/utility"
import type { TextArea } from "@shape/types/utility"
import { useDefineTimeline } from "./defineTimeline"

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
    stop: ({ shapeId }) => activeAnimations.delete(shapeId)
  })

  const animatedFactory = <T>(factory: ShapeFactory<T>) => (schema: WithId<T>) => {
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

        // cleanup animation if expired
        const currentRunCount = getCurrentRunCount(animationWithTimeline)
        const shouldRemove = currentRunCount >= animationWithTimeline.runCount
        if (shouldRemove) {
          activeAnimations.delete(schema.id)
          return target[prop]
        }

        // resolve the properties for the animated shape schema
        const { props } = animationWithTimeline
        const progress = getAnimationProgress(animationWithTimeline)

        const schemaWithDefaults = {
          // we must animate all the default props whether or
          // not the shape actually implements that prop because
          // we do not have a way of knowing at runtime
          // what properties a given schema implements
          ...LINE_WIDTH_DEFAULTS,
          ...ROTATION_DEFAULTS,
          ...BORDER_RADIUS_DEFAULTS,
          ...FILL_COLOR_DEFAULTS,
          ...schema,
        }

        const schemaTextArea = (schema as any)['textArea'] as TextArea | undefined
        if (schemaTextArea) {
          (schemaWithDefaults as any)['textArea'] = getTextAreaWithDefaults(schemaTextArea)
        }

        const infusedProps = Object.entries(props).reduce((acc, curr) => {
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
      square: animatedFactory(square),
      rect: animatedFactory(rect),
      line: animatedFactory(line),
      arrow: animatedFactory(arrow),
    },
    defineTimeline,
  }
}