import type { AnimationDefinition } from "./defineAnimation"
import type { TimelineId } from "./timeline/defineTimeline"

export type ActiveAnimation = {
  /**
   * links the active animation to the animation definition
   */
  timelineId: TimelineId,
  /**
   * number of times this animation will run before automatically stopping (can be fractional).
   * set to `Infinity` to run animation indefinitely
   */
  runCount: number,

  /**
   * unix timestamp when the animation started
   */
  startedAt: number,
}

export type ActiveAnimationWithDefinition = ActiveAnimation & AnimationDefinition