import { shapeProps, type Shape } from "@shape/types"
import type { ActiveAnimationWithDefinition } from "./types"

/**
 * returns the number of times the animation has completed as a float.
 *
 * @example
 * const runs = getCurrentRunCount(animation) // 2.5
 * // "animation" is half way through its 3rd run
 */
export const getCurrentRunCount = ({
  durationMs,
  startedAt,
}: Pick<ActiveAnimationWithDefinition, 'startedAt' | 'durationMs'>) => {
  const timeElapsed = Date.now() - startedAt
  return timeElapsed / durationMs
}

/**
 * returns the current progress through the active animation cycle, as a value between 0 and 1.
 * Useful for determining how far along the animation is within its current run.
 *
 * @example
 * const progress = getAnimationProgress(animation); // 0.25
 * // "animation" is 25% through its current cycle
 */
export const getAnimationProgress = ({
  durationMs,
  startedAt
}: Pick<ActiveAnimationWithDefinition, 'startedAt' | 'durationMs'>) => {
  const timeElapsed = Date.now() - startedAt
  return (timeElapsed % durationMs) / durationMs
}

export const validPropsSet: ReadonlySet<keyof Shape> = new Set(shapeProps)