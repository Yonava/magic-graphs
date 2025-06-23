import { EASING_FUNCTIONS, type EasingFunction } from "@utils/animate";
import type { UnionToIntersection } from "ts-essentials";

export const numericProps = ['rotation', 'borderRadius', 'lineWidth', 'width'] as const

type NumericInput = {
  scaleTo: number
} | {
  offsetBy: number
}

type NumericPoint = {
  value: number,
  progress: number,
  operation: keyof UnionToIntersection<NumericInput>,
};

type NumericProps = {
  [K in typeof numericProps[number]]: NumericPoint[]
}

type AnimatedProps = Partial<NumericProps>

type AnimatedPropFns = {
  [K in keyof AnimatedProps]?: <T>(schemaPropVal: T) => (progress: number) => T
}

export const valueAtProgress = (
  points: NumericPoint[],
  easing: EasingFunction,
  fallbackValue = 1,
) => (progress: number) => {
  if (points.length === 0) return fallbackValue;

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

  return fallbackValue;
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

  #numericProp(key: keyof NumericProps, input: NumericInput) {
    const [[operation, value]] = Object.entries(input) as any

    const entry: NumericPoint = {
      value,
      progress: this.#currentProgress,
      operation,
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

  lineWidth(input: NumericInput) {
    return this.#numericProp('lineWidth', input)
  }

  width(input: NumericInput) {
    return this.#numericProp('width', input)
  }

  rotate(input: NumericInput) {
    return this.#numericProp('rotation', input)
  }

  borderRadius(input: NumericInput) {
    return this.#numericProp('borderRadius', input)
  }

  getDefinition() {
    const props: AnimatedPropFns = {}

    for (const propName of numericProps) {
      const propVal = this.#animatedProps[propName]
      if (propVal) props[propName] = (schemaPropVal) => {
        if (typeof schemaPropVal === 'number') {
          // do the plus or multiple
          return valueAtProgress(propVal, EASING_FUNCTIONS['in-out'])
        }
        return schemaPropVal
      }
    }

    return {
      id: this.id,
      durationMs: this.durationMs,
      props,
    }
  }
}

export type AnimationDefinition = ReturnType<DefineAnimation['getDefinition']>