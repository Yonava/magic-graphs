import { EASING_FUNCTIONS, type EasingFunction } from "@utils/animate";

type ScalarPoint = {
  scalar: number;
  at: number
};

export type AnimatedProps = Partial<{
  lineWidth: ScalarPoint[],
  width: ScalarPoint[],
}>

type AnimatedPropFns = Partial<{
  /**
   * function that takes progress (0, 1) and returns the scalar
   */
  width: (progress: number) => number
}>

export const getScalarAt = (
  points: ScalarPoint[],
  easing: EasingFunction
) => (at: number) => {
  if (points.length === 0) return 1; // default fallback

  if (at <= points[0].at) return points[0].scalar;
  if (at >= points[points.length - 1].at) return points[points.length - 1].scalar;

  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];

    if (at >= p1.at && at <= p2.at) {
      const t = (at - p1.at) / (p2.at - p1.at);
      return p1.scalar + easing(t) * (p2.scalar - p1.scalar);
    }
  }

  return 1; // fallback, should not be reached
};


export type AnimationDefinitionId = string

export class DefineAnimation {
  #animatedProps: AnimatedProps = {};

  #currentProgress = 0;

  /**
   * a unique identifier for this definition
   */
  id: AnimationDefinitionId
  /**
   * the duration of this animation (in milliseconds)
   */
  durationMs: number

  constructor(id: string, durationMs: number) {
    this.id = id
    this.durationMs = durationMs
  }

  from() {
    this.#currentProgress = 0
    return this
  }

  to() {
    this.#currentProgress = 1
    return this
  }

  at(progress: number) {
    this.#currentProgress = progress
    return this
  }

  lineWidth(scalar: number) {
    const entry = {
      scalar,
      at: this.#currentProgress
    }

    const lineWidthProp = this.#animatedProps['lineWidth']

    if (!lineWidthProp) {
      this.#animatedProps['lineWidth'] = [entry]
    } else {
      lineWidthProp.push(entry)
    }

    return this
  }

  width(scalar: number) {
    const entry = {
      scalar,
      at: this.#currentProgress
    }

    const widthProp = this.#animatedProps['width']

    if (!widthProp) {
      this.#animatedProps['width'] = [entry]
    } else {
      widthProp.push(entry)
    }

    return this
  }

  getDefinition() {
    const props: AnimatedPropFns = {}

    const widthProp = this.#animatedProps['width']
    if (widthProp) {
      props['width'] = getScalarAt(widthProp, EASING_FUNCTIONS.linear)
    }

    return {
      id: this.id,
      durationMs: this.durationMs,
      props,
    }
  }
}

export type AnimationDefinition = ReturnType<DefineAnimation['getDefinition']>