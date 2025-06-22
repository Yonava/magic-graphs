import { EASING_FUNCTIONS, type EasingFunction } from "@utils/animate";

export const scalarProps = ['lineWidth', 'width'] as const
export const offsetProps = ['rotation'] as const
export const numericProps = [...scalarProps, ...offsetProps] as const

export const combine = {
  scalar: (val1: number, val2: number) => val1 * val2,
  offset: (val1: number, val2: number) => val1 + val2,
} as const

type NumericPoint = {
  value: number,
  progress: number,
};

type NumericProps = {
  [K in typeof numericProps[number]]: NumericPoint[]
}

type AnimatedProps = Partial<NumericProps>

type AnimatedPropFns = {
  [K in keyof AnimatedProps]?: (progress: number) => number
}

export const valueAtProgress = (
  points: NumericPoint[],
  easing: EasingFunction
) => (progress: number) => {
  if (points.length === 0) return 1; // default fallback

  if (progress <= points[0].progress) return points[0].value;
  if (progress >= points[points.length - 1].progress) return points[points.length - 1].value;

  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];

    if (progress >= p1.progress && progress <= p2.progress) {
      const t = (progress - p1.progress) / (p2.progress - p1.progress);
      return p1.value + easing(t) * (p2.value - p1.value);
    }
  }

  return 1; // fallback, should not be reached
};

export type AnimationDefinitionId = string

export class DefineAnimation<T extends string = string> {
  #animatedProps: AnimatedProps = {};

  #currentProgress = 0;

  /**
   * a unique identifier for this definition
   */
  id: AnimationDefinitionId
  /**
   * the duration of this animation (in milliseconds)
   * @default 1000
   */
  durationMs = 1000

  constructor(id: T) {
    this.id = id
  }

  #numericProp(key: keyof NumericProps, value: number) {
    const entry: NumericPoint = {
      value,
      progress: this.#currentProgress
    }

    const numericProp = this.#animatedProps[key]

    if (!numericProp) {
      this.#animatedProps[key] = [entry]
    } else {
      numericProp.push(entry)
    }

    return this
  }

  duration({ ms }: { ms: number }) {
    this.durationMs = ms;
    return this
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
    return this.#numericProp('lineWidth', scalar)
  }

  width(scalar: number) {
    return this.#numericProp('width', scalar)
  }

  rotation(radians: number) {
    return this.#numericProp('rotation', radians)
  }

  getDefinition() {
    const props: AnimatedPropFns = {}

    for (const propName of numericProps) {
      const propVal = this.#animatedProps[propName]
      if (propVal) props[propName] = valueAtProgress(propVal, EASING_FUNCTIONS.linear)
    }

    return {
      id: this.id,
      durationMs: this.durationMs,
      props,
    }
  }
}

export type AnimationDefinition = ReturnType<DefineAnimation['getDefinition']>