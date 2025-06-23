import { EASING_FUNCTIONS } from "@utils/animate";
import type { ColorKeyframe, NumericKeyframe } from "./interpolation/types";
import { interpolateNumber } from "./interpolation/number";
import { interpolateColor, isColorString } from "./interpolation/color";
import type { Color } from "@utils/colors";

export const numericProps = ['rotation', 'borderRadius', 'lineWidth', 'width'] as const

type NumericInput = {
  scaleTo: number
} | {
  offsetBy: number
} | {
  /**
   * define a custom value to animate
   *
   * @param propValue the value of the non-animated property you are animating.
   * ie if being passed in as lineWidth, and the schemas lineWidth is 10
   * before animations, then propValue will be 10
   * @param schema the full schema that you are trying to animate. ie schema[lineWidth] -> 10
   * @returns the value you want the property you are animating to have at the point
   * defined in your timeline
   */
  custom: <T>(propValue: number, schema: T) => number
}

type NumericPoint = ({
  operation: 'scaleTo'
  value: number,
} | {
  operation: 'offsetBy',
  value: number,
} | {
  operation: 'custom',
  value: <T>(prop: number, schema: T) => number
}) & Pick<NumericKeyframe, 'progress'>

type NumericProps = {
  [K in typeof numericProps[number]]: NumericPoint[]
}

export const colorProps = ['fillColor'] as const

type ColorProps = {
  [K in typeof colorProps[number]]: ColorKeyframe[]
}

type AnimatedProps = Partial<NumericProps & ColorProps>

/**
 * @param schema the non-altered schema of the shape being animated
 * @param progress value between 0 and 1. See {@link NumericKeyframe.progress}
 */
type GetAnimatedValue = (schema: any, progress: number) => any

type AnimatedPropFns = {
  [K in keyof AnimatedProps]?: GetAnimatedValue
}

export type AnimationDefinitionId = string

const startingNumericPoint: NumericPoint = {
  progress: 0,
  value: 1,
  operation: 'scaleTo',
}

const endingNumericPoint: NumericPoint = {
  progress: 1,
  value: 1,
  operation: 'scaleTo',
}

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
      this.#animatedProps[key] = this.#currentProgress === 0 ? [entry] : [
        startingNumericPoint,
        entry,
      ]
    } else {
      numericProp.push(entry)
    }

    return this
  }

  #colorProp(key: keyof ColorProps, input: Color) {
    const entry: ColorKeyframe = {
      value: input,
      progress: this.#currentProgress,
    }

    const colorProp = this.#animatedProps[key]

    if (!colorProp) {
      this.#animatedProps[key] = [entry]
    } else {
      colorProp.push(entry)
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

  fillColor(color: Color) {
    return this.#colorProp('fillColor', color)
  }

  getDefinition() {
    const props: AnimatedPropFns = {}

    for (const propName of numericProps) {
      const numericPoints = this.#animatedProps[propName]
      if (!numericPoints) continue
      props[propName] = (schema, progress) => {
        const nonAnimatedPropValue = schema[propName]
        if (typeof schema !== 'number') throw '😳! prop said to be numeric was not at runtime!'

        if (numericPoints.at(-1)?.progress !== 1) {
          numericPoints.push(endingNumericPoint)
        }

        const keyframes = numericPoints.map((pt): NumericKeyframe => {
          const getPixelValue = () => {
            if (pt.operation === 'offsetBy') {
              return nonAnimatedPropValue + pt.value
            } else if (pt.operation === 'scaleTo') {
              return nonAnimatedPropValue * pt.value
            } else {
              return pt.value(nonAnimatedPropValue, schema)
            }
          }

          return {
            value: getPixelValue(),
            progress: pt.progress,
          }
        })

        const getInterpolatedValue = interpolateNumber(
          keyframes,
          EASING_FUNCTIONS['in-out'],
          nonAnimatedPropValue,
        )

        return getInterpolatedValue(progress)
      }
    }

    for (const propName of colorProps) {
      const colorKeyframes = this.#animatedProps[propName]
      if (!colorKeyframes) continue
      props[propName] = (schema, progress) => {
        const nonAnimatedPropValue = schema[propName]

        const isColor = (
          typeof nonAnimatedPropValue === 'string' &&
          isColorString(nonAnimatedPropValue)
        )
        if (!isColor) {
          throw '😳! prop said to be a color was not at runtime!'
        }

        const getInterpolatedValue = interpolateColor(
          colorKeyframes,
          EASING_FUNCTIONS['in-out'],
          nonAnimatedPropValue,
        )

        return getInterpolatedValue(progress)
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