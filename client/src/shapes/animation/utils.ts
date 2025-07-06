import type { ActiveAnimation } from "./types"
import type { CompiledTimeline } from "./timeline/compile"

/**
 * returns the number of times the animation has completed as a float.
 *
 * @example
 * const runs = getCurrentRunCount(animation)
 * console.log(runs) // 2.5
 * // "animation" is half way through its 3rd run
 */
export const getCurrentRunCount = ({
  durationMs,
  startedAt,
  delayMs
}: Pick<ActiveAnimation & CompiledTimeline, 'startedAt' | 'durationMs' | 'delayMs'>) => {
  const timeElapsed = Date.now() - startedAt
  if (timeElapsed < delayMs) return 0

  const activeTime = timeElapsed - delayMs
  return activeTime / durationMs
}

/**
 * returns the current progress through the active animation cycle, as a value between 0 and 1.
 * Useful for determining how far along the animation is within its current run.
 *
 * @example
 * const progress = getAnimationProgress(animation);
 * console.log(progress) // 0.25
 * // "animation" is 25% through its current cycle
 */
export const getAnimationProgress = ({
  durationMs,
  startedAt,
  delayMs
}: Pick<ActiveAnimation & CompiledTimeline, 'startedAt' | 'durationMs' | 'delayMs'>) => {
  const timeElapsed = Date.now() - startedAt
  if (timeElapsed < delayMs) return 0

  const activeTime = timeElapsed - delayMs
  return (activeTime % durationMs) / durationMs
}