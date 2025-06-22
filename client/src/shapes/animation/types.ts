import type { AnimationDefinition, DefineAnimation } from "./defineAnimation"

export type ActiveAnimation = {
  /**
   * links the active animation to the animation definition
   */
  definitionId: DefineAnimation['id'],
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

export type ActiveAnimationWithDefinition = ActiveAnimation & AnimationDefinition