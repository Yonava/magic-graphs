import { EASING_FUNCTIONS } from "@utils/animate";
import type { AnimationKeyframe, ColorKeyframe, CoordinateKeyframe, NumberKeyframe } from "./interpolation/types";
import { interpolateNumber } from "./interpolation/number";
import { interpolateColor, isColorString } from "./interpolation/color";
import type { Color } from "@utils/colors";
import type { Coordinate } from "@shape/types/utility";
import { interpolateCoordinate } from "./interpolation/coordinate";

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

const numberProps = ['rotation', 'borderRadius', 'lineWidth', 'width'] as const
const colorProps = ['fillColor'] as const
const coordProps = ['at', 'start', 'end'] as const

type NumberProps = {
  [K in typeof numberProps[number]]: KeyframeInput<number>[]
}

type ColorProps = {
  [K in typeof colorProps[number]]: KeyframeInput<Color>[]
}

type CoordinateProps = {
  [K in typeof coordProps[number]]: KeyframeInput<Coordinate>[]
}

type PropToKeyframeInputs = Partial<
  NumberProps &
  ColorProps &
  CoordinateProps
>

/**
 * @param schema the non-altered schema of the shape being animated
 * @param progress value between 0 and 1. See {@link NumberKeyframe.progress}
 */
type AnimationFunction = (schema: any, progress: number) => any

type PropToAnimationFunction = {
  [K in keyof PropToKeyframeInputs]?: AnimationFunction
}

export type AnimationDefinitionId = string

const DEFAULT_START: KeyframeInput<any> = {
  progress: 0,
  value: (val: any) => val,
}

const DEFAULT_END: KeyframeInput<any> = {
  progress: 1,
  value: (val: any) => val,
}

export class DefineAnimation<T extends string = string> {
  #propToKeyframeInputs: PropToKeyframeInputs = {};
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
    propName: keyof PropToKeyframeInputs,
    value: FieldInput<any>,
  ) {
    const entry = {
      value,
      progress: this.#currentProgress,
    }

    const existingKeyframeInputs = this.#propToKeyframeInputs[propName]

    if (!existingKeyframeInputs) {
      this.#propToKeyframeInputs[propName] = this.#currentProgress === 0 ? [entry] : [
        DEFAULT_START,
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

  fillColor(input: FieldInput<Color>) {
    return this.#addKeyframeInput('fillColor', input)
  }

  at(input: FieldInput<Coordinate>) {
    return this.#addKeyframeInput('at', input)
  }

  getDefinition() {
    const props: PropToAnimationFunction = {}

    for (const propName of numberProps) {
      const numberKeyframeInputs = this.#propToKeyframeInputs[propName]
      if (!numberKeyframeInputs) continue

      props[propName] = (schema, progress) => {
        const nonAnimatedPropValue = schema[propName]

        if (typeof nonAnimatedPropValue !== 'number') {
          throw `😳! prop ${propName} said to be a number was not at runtime! got ${nonAnimatedPropValue}`
        }

        if (numberKeyframeInputs.at(-1)?.progress !== 1) {
          numberKeyframeInputs.push(DEFAULT_END)
        }

        const keyframes = numberKeyframeInputs.map((pt): NumberKeyframe => {
          const getValue = () => {
            if (typeof pt.value === 'function') {
              return pt.value(nonAnimatedPropValue, schema)
            }
            return nonAnimatedPropValue + pt.value
          }

          return {
            value: getValue(),
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
      const colorKeyframeInputs = this.#propToKeyframeInputs[propName]
      if (!colorKeyframeInputs) continue

      props[propName] = (schema, progress) => {
        const nonAnimatedPropValue = schema[propName]

        const isColor = (
          typeof nonAnimatedPropValue === 'string' &&
          isColorString(nonAnimatedPropValue)
        )
        if (!isColor) {
          throw `😳! prop ${propName} said to be a color was not at runtime! got ${nonAnimatedPropValue}`
        }

        if (colorKeyframeInputs.at(-1)?.progress !== 1) {
          colorKeyframeInputs.push(DEFAULT_END)
        }

        const keyframes = colorKeyframeInputs.map((pt): ColorKeyframe => {
          const getValue = () => {
            if (typeof pt.value === 'function') {
              return pt.value(nonAnimatedPropValue, schema)
            }
            return pt.value
          }

          return {
            value: getValue(),
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

    for (const propName of coordProps) {
      const coordKeyframeInputs = this.#propToKeyframeInputs[propName]
      if (!coordKeyframeInputs) continue

      props[propName] = (schema, progress) => {
        const nonAnimatedPropValue = schema[propName] as Coordinate

        if (
          typeof nonAnimatedPropValue !== 'object' ||
          typeof nonAnimatedPropValue['x'] !== 'number' ||
          typeof nonAnimatedPropValue['y'] !== 'number'
        ) {
          throw `😳! prop ${propName} said to be a coordinate was not at runtime! got ${nonAnimatedPropValue}`
        }

        if (coordKeyframeInputs.at(-1)?.progress !== 1) {
          coordKeyframeInputs.push(DEFAULT_END)
        }

        const keyframes = coordKeyframeInputs.map((pt): CoordinateKeyframe => {
          const getValue = () => {
            if (typeof pt.value === 'function') {
              return pt.value(nonAnimatedPropValue, schema)
            }
            return {
              x: pt.value.x + nonAnimatedPropValue.x,
              y: pt.value.y + nonAnimatedPropValue.y,
            }
          }

          return {
            value: getValue(),
            progress: pt.progress,
          }
        })

        const getInterpolatedValue = interpolateCoordinate(
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