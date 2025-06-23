
type AnimationKeyframe<T> = {
  /**
   * The value at this point in the animation timeline.
   */
  value: T;

  /**
   * The progress position, ranging from 0 to 1.
   * For example, in a 1-second animation:
   * - 0 represents 0ms (start)
   * - 0.5 represents 500ms (midpoint)
   * - 1 represents 1000ms (end)
   */
  progress: number;
};

export type NumericKeyframe = AnimationKeyframe<number>