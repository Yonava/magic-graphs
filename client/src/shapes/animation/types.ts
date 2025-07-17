import type { TimelineId } from "./timeline/define"

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

  /**
   * the schema at the point the animation started
   */
  schema?: any,
}