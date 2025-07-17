import type { AnimationKeyframe } from "@shape/animation/interpolation/types";
import type { Timeline, TimelinePlaybackDelay, TimelinePlaybackDuration } from "../defineTimeline";
import { easingOptionToFunction, type EasingFunction, type EasingOption } from "@shape/animation/easing";
import type { ShapeName } from "@shape/types";
import { isPlainObject } from "@utils/deepMerge";
import { interpolateNumber } from "@shape/animation/interpolation/number";

/**
 * @param schema the non-altered schema of the shape being animated
 * @param progress value between 0 and 1. See {@link NumberKeyframe.progress}
 */
type AnimationFunction = (schema: any, progress: number) => any

export type CompiledTimeline = {
  /**
   * maps schema properties to their animation functions
   */
  properties: Record<string, AnimationFunction>,
  /**
   * the shapes that this animated timeline is valid for
   */
  validShapes: Set<ShapeName>,
} & TimelinePlaybackDuration & Required<TimelinePlaybackDelay>;

/**
 * property name on schema (radius, rotation, lineWidth etc) to
 * keyframes of either a custom getter function or the value itself
 */
type PropToAnimationKeyframe = Record<string, AnimationKeyframe<any>[]>

const textAreaProps = ['textArea'] as const
const coordProps = ['at', 'start', 'end'] as const

export type CompileProp = (
  prop: string,
  propToAnimationKeyframes: PropToAnimationKeyframe,
  easing: EasingFunction,
) => AnimationFunction;

const DEFAULT_START = {
  progress: 0,
  value: (val: any) => val,
} as const

const DEFAULT_END = {
  progress: 1,
  value: (val: any) => val,
} as const

const DEFAULT_EASING: EasingOption = 'linear'

const isCustomInputObject = (obj: unknown) => {
  const isObj = isPlainObject(obj)
  if (!isObj) return false
  const hasValueProp = 'value' in obj
  const hasEasingProp = 'easing' in obj
  const numOfProps = Object.keys(obj).length
  return hasValueProp && numOfProps === (hasEasingProp ? 2 : 1)
}

export const compileTimeline = (timeline: Timeline<any>): CompiledTimeline => {
  const tl: CompiledTimeline = {
    durationMs: timeline.durationMs,
    delayMs: timeline?.delayMs ?? 0,
    properties: {},
    validShapes: new Set(timeline.forShapes),
  }

  const propsInTimeline = [
    ...new Set(timeline.keyframes.map((kf) => Object.keys(kf.properties)).flat())
  ]

  const propToAnimationKeyframes = propsInTimeline.reduce((acc, prop) => {
    const propInTimeline = timeline.keyframes.map((kf): AnimationKeyframe<any> => {
      const propVal = kf.properties[prop]
      const isObj = isCustomInputObject(propVal)
      const value = isObj ? propVal.value : propVal
      const easing = isObj ? propVal?.easing : undefined
      return {
        progress: kf.progress,
        value,
        easing: easing !== undefined ? easingOptionToFunction(easing) : easing,
      }
    }).filter(({ value }) => value !== undefined)

    if (propInTimeline[0].progress !== 0) {
      propInTimeline.unshift(DEFAULT_START)
    }

    if (propInTimeline.at(-1)?.progress !== 1) {
      propInTimeline.push(DEFAULT_END)
    }

    acc[prop] = propInTimeline
    return acc
  }, {} as PropToAnimationKeyframe)

  const getDefaultEasing = (prop: string) => {
    const defaultEasingOption = timeline.easing?.[prop] ?? DEFAULT_EASING
    return easingOptionToFunction(defaultEasingOption)
  }

  const interpolationFns = [
    {
      predicate: (propVal: unknown) => typeof propVal === 'number',
      fn: interpolateNumber,
    },
    // {
    //   predicate: (propVal) => typeof propVal
    // }
  ] as const

  for (const propName of propsInTimeline) {
    tl.properties[propName] = (schemaWithDefaults, progress) => {
      const rawPropVal = schemaWithDefaults[propName]
      const interpolation = interpolationFns.find(({ predicate }) => predicate(rawPropVal))
      if (!interpolation) throw `cannot interpolate value: ${JSON.stringify(rawPropVal)}`
      const keyframes = propToAnimationKeyframes[propName].map((kf) => {
        const getValue = () => {
          if (typeof kf.value === 'function') {
            return kf.value(rawPropVal, schemaWithDefaults)
          }
          return kf.value
        }

        return {
          ...kf,
          value: getValue(),
        }
      })

      return interpolation.fn(keyframes, getDefaultEasing(propName), rawPropVal)(progress)
    }
  }

  const { customInterpolations } = timeline;
  if (customInterpolations) {
    const allCustomInterpolations = Object.entries(customInterpolations)
    for (const [propName, interpolationOptions] of allCustomInterpolations) {
      if (!interpolationOptions) throw 'custom path received with no options. this should never happen!'
      const { easing: easingRaw, value } = interpolationOptions
      const easing = easingRaw ?? getDefaultEasing(propName)
      tl.properties[propName] = (_, progress) => value(easingOptionToFunction(easing)(progress))
    }
  }

  return tl
}