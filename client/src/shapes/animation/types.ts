
export type AnimationDefinitionId = string

export type AnimationDefinition = {
  /**
   * a unique identifier for this definition
   */
  id: AnimationDefinitionId,
  /**
   * the duration of this animation (in milliseconds)
   */
  durationMs: number,
}

export type ActiveAnimation = {
  /**
   * links the active animation to the animation definition
   */
  definitionId: AnimationDefinitionId,
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