import { EASING_FUNCTIONS } from "@utils/animate";
import type { UnionToIntersection } from "ts-essentials";
import type { NumericKeyframe } from "./interpolation/types";
import { interpolateNumber } from "./interpolation/number";

export const numericProps = ['rotation', 'borderRadius', 'lineWidth', 'width'] as const

type NumericInput = {
  scaleTo: number
} | {
  offsetBy: number
}

type NumericPoint = {
  operation: keyof UnionToIntersection<NumericInput>,
} & NumericKeyframe

type NumericProps = {
  [K in typeof numericProps[number]]: NumericPoint[]
}

type AnimatedProps = Partial<NumericProps>

/**
 * @param schemaPropVal the non-animated value of the schema property that
 * is being targeted for animation
 * @param progress value between 0 and 1. See {@link NumericKeyframe.progress}
 */
type GetAnimatedValue = (schemaPropVal: unknown, progress: number) => any

type AnimatedPropFns = {
  [K in keyof AnimatedProps]?: GetAnimatedValue
}

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
      const numericPoints = this.#animatedProps[propName]
      if (!numericPoints) continue
      props[propName] = (schemaValue, progress) => {
        if (typeof schemaValue === 'number') {
          const keyframes = numericPoints.map((pt) => ({
            ...pt,
            // turns all values into offsets before being ingested as keyframes
            value: pt.operation === 'scaleTo' ? schemaValue * pt.value : schemaValue + pt.value
          }))

          const getInterpolatedValue = interpolateNumber(
            keyframes,
            EASING_FUNCTIONS['in-out'],
            schemaValue,
          )

          return getInterpolatedValue(progress)
        }
        return schemaValue
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