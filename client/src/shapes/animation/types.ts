import type { EverySchemaPropName } from "@shape/types"
import type { TimelineId } from "./timeline/define"

/**
 * a looser version of a shape schema when fully type safe schemas becomes a nuisance
 */
export type LooseSchema = Partial<Record<EverySchemaPropName, any>>

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
  schema?: LooseSchema,
}