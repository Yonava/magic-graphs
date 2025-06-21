import { arrow } from './shapes/arrow';
import { line } from './shapes/line';
import { rect } from './shapes/rect';
import { square } from './shapes/square';
import { triangle } from './shapes/triangle';
import { uturn } from './shapes/uturn';
import { cross } from './shapes/cross';
import { scribble } from './shapes/scribble';
import { ellipse } from './shapes/ellipse';
import { star } from './shapes/star';
import { image } from './shapes/image';
import { circle } from './shapes/circle';
import { initShapeCache } from './cacher';
import type { SquareSchema } from '@shapes/square/types';
import { shapeProps, type SchemaId, type Shape, type ShapeFactory, type WithId } from './types';
import type { ObjectKeysToTuple } from '@utils/types';

export const useOptimizedShapes = () => {
  const toOptimized = initShapeCache()
  return {
    arrow: toOptimized(arrow),
    circle: toOptimized(circle),
    line: toOptimized(line),
    rect: toOptimized(rect),
    square: toOptimized(square),
    triangle: toOptimized(triangle),
    uturn: toOptimized(uturn),
    cross: toOptimized(cross),
    scribble: toOptimized(scribble),
    ellipse: toOptimized(ellipse),
    star: toOptimized(star),
    image: toOptimized(image),
  }
}

export type OptimizedShapes = ReturnType<typeof useOptimizedShapes>

type AnimationId = string

type ActiveAnimation = {
  /**
   * ID linking to the animation definition
   */
  definitionId: AnimationId,
  /**
   * unix timestamp when the animation started
   */
  startedAt: number,
  /**
   * number of times this animation will run before automatically stopping (can be fractional).
   * set to `Infinity` to run animation indefinitely
   */
  runCount: number,
}

export const useAnimatedShapes = () => {
  /**
   * a mapping between shapes (via ids) and the animations currently
   * active/running on those shapes
   */
  const activeAnimations: Map<SchemaId, ActiveAnimation[]> = new Map()

  const animationDurationMs = 4000

  const getTimesRun = (animationDurationMs: number, timeSinceBegun: number) => {
    return timeSinceBegun / animationDurationMs
  }

  const getAnimationProgress = (timeBegun: number) => {
    const timeSinceBegun = Date.now() - timeBegun
    const progress = (timeSinceBegun % animationDurationMs) / animationDurationMs
    return progress
  }

  const validPropsSet: ReadonlySet<keyof Shape> = new Set(shapeProps)

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

        const animationDefs = animationsOnShape.map((a) => ({
          def: getAnimationDefinition(a.definitionId),
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
        const animatedSchema =


        const prog = getAnimationProgress(timeBegun)

        const modifiedSquare = square({
          ...schema,
          // at 0.5 needs to be at schema.size, at 1 needs to be at 0
          size: prog < 0.5
            ? schema.size * (prog * 2)
            : schema.size * (2 * (1 - prog))
        })

        return modifiedSquare[prop]
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
