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

export const useAnimatedShapes = () => {
  /**
   * maps schema id to unix timestamp the animation begun
   */
  const runningAnimations: Map<SchemaId, { animationId: string, timeBegun: number }[]> = new Map()

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
    // if they call square.draw(ctx) then get runs with (square, 'draw') -> square.draw
    return new Proxy(square(schema), {
      get: (target, rawProp) => {
        const prop = rawProp as keyof Shape

        if (!validPropsSet.has(prop)) {
          console.warn('invalid prop passed to animated shape')
          return target[prop]
        }

        const timeBegun = runningAnimations.get(schema.id)
        if (timeBegun === undefined) return target[prop]

        const timesRun = getTimesRun(animationDurationMs, Date.now() - timeBegun)
        const shouldRemove = timesRun >= 0.5
        if (shouldRemove) {
          runningAnimations.delete(schema.id)
        }

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
        runningAnimations.set(id, Date.now())
      },
      stop: (id: SchemaId) => {
        runningAnimations.delete(id)
      }
    },
  }
}
