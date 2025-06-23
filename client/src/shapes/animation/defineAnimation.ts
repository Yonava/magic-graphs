import { EASING_FUNCTIONS } from "@utils/animate";
import type { AnimationKeyframe, ColorKeyframe, NumericKeyframe } from "./interpolation/types";
import { interpolateNumber } from "./interpolation/number";
import { interpolateColor, isColorString } from "./interpolation/color";
import type { Color } from "@utils/colors";

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
type CustomInput<T> = (propValue: T, schema: any) => T

type FieldInput<T> = T | CustomInput<T>

type KeyframeInput<T> = AnimationKeyframe<FieldInput<T>>

export const numericProps = ['rotation', 'borderRadius', 'lineWidth', 'width'] as const

type NumericProps = {
  [K in typeof numericProps[number]]: KeyframeInput<number>[]
}

export const colorProps = ['fillColor'] as const

type ColorProps = {
  [K in typeof colorProps[number]]: KeyframeInput<Color>[]
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

const defaultStart: KeyframeInput<any> = {
  progress: 0,
  value: (val: any) => val,
}

const defaultEnd: KeyframeInput<any> = {
  progress: 1,
  value: (val: any) => val,
}

export class DefineAnimation<T extends string = string> {
  #propToKeyframeInputs: AnimatedProps = {};

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

  #addKeyframeInput(
    propName: keyof AnimatedProps,
    value: FieldInput<any>,
  ) {
    const entry = {
      value,
      progress: this.#currentProgress,
    }

    const existingKeyframeInputs = this.#propToKeyframeInputs[propName]

    if (!existingKeyframeInputs) {
      this.#propToKeyframeInputs[propName] = this.#currentProgress === 0 ? [entry] : [
        defaultStart,
        entry,
      ]
    } else {
      existingKeyframeInputs.push(entry)
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

  progress(progress: number) {
    this.#currentProgress = progress
    return this
  }

  lineWidth(input: FieldInput<number>) {
    return this.#addKeyframeInput('lineWidth', input)
  }

  width(input: FieldInput<number>) {
    return this.#addKeyframeInput('width', input)
  }

  rotate(input: FieldInput<number>) {
    return this.#addKeyframeInput('rotation', input)
  }

  borderRadius(input: FieldInput<number>) {
    return this.#addKeyframeInput('borderRadius', input)
  }

  fillColor(color: FieldInput<Color>) {
    return this.#addKeyframeInput('fillColor', color)
  }

  // at(coord: Coordinate)

  getDefinition() {
    const props: AnimatedPropFns = {}

    for (const propName of numericProps) {
      const numericPoints = this.#propToKeyframeInputs[propName]
      if (!numericPoints) continue
      props[propName] = (schema, progress) => {
        const nonAnimatedPropValue = schema[propName]

        if (typeof nonAnimatedPropValue !== 'number') {
          throw `😳! prop ${propName} said to be numeric was not at runtime! got ${nonAnimatedPropValue}`
        }

        if (numericPoints.at(-1)?.progress !== 1) {
          numericPoints.push(defaultEnd)
        }

        const keyframes = numericPoints.map((pt): NumericKeyframe => {
          const getPixelValue = () => {
            if (typeof pt.value === 'function') {
              return pt.value(nonAnimatedPropValue, schema)
            }
            return nonAnimatedPropValue + pt.value
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
      const colorPoints = this.#propToKeyframeInputs[propName]
      if (!colorPoints) continue
      props[propName] = (schema, progress) => {
        const nonAnimatedPropValue = schema[propName]

        const isColor = (
          typeof nonAnimatedPropValue === 'string' &&
          isColorString(nonAnimatedPropValue)
        )
        if (!isColor) {
          throw `😳! prop ${propName} said to be a color was not at runtime! got ${nonAnimatedPropValue}`
        }

        if (colorPoints.at(-1)?.progress !== 1) {
          colorPoints.push(defaultEnd)
        }

        const keyframes = colorPoints.map((pt): ColorKeyframe => {
          const getStringColorValue = () => {
            if (typeof pt.value === 'function') {
              return pt.value(nonAnimatedPropValue, schema)
            }
            return pt.value
          }

          return {
            value: getStringColorValue(),
            progress: pt.progress,
          }
        })

        const getInterpolatedValue = interpolateColor(
          keyframes,
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