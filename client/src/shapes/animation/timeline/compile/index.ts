import type { AnimationKeyframe } from "@shape/animation/interpolation/types";
import type { Timeline, TimelinePlaybackDuration } from "../defineTimeline";
import { compileNumericProp } from "./number";
import { compileColorProp } from "./color";

/**
 * @param schema the non-altered schema of the shape being animated
 * @param progress value between 0 and 1. See {@link NumberKeyframe.progress}
 */
type AnimationFunction = (schema: any, progress: number) => any

export type CompiledTimeline = {
  // maps schema properties to their animation functions
  properties: Record<string, AnimationFunction>
} & TimelinePlaybackDuration;

/**
 * raw keyframe = keyframe in the pre-compiled timeline, which could
 * mean a getter function or raw value
 */
type PropToRawKeyframe = Record<string, AnimationKeyframe<any>[]>

const numberProps = ['rotation', 'borderRadius', 'lineWidth', 'width'] as const
const colorProps = ['fillColor'] as const
const coordProps = ['at', 'start', 'end'] as const
const textAreaProps = ['textArea'] as const

export type CompileProp = (
  prop: string,
  propToRawKeyframes: PropToRawKeyframe
) => AnimationFunction;

export const compileTimeline = (timeline: Timeline<any>): CompiledTimeline => {
  const tl: CompiledTimeline = {
    durationMs: timeline.durationMs,
    properties: {},
  }

  const propsInTimeline = [
    ...new Set(timeline.keyframes.map((kf) => Object.keys(kf.properties)).flat())
  ]

  const propToRawKeyframes = propsInTimeline.reduce((acc, prop) => {
    const propInTimeline = timeline.keyframes.map((kf) => ({
      progress: kf.progress,
      value: kf.properties[prop]
    })).filter(({ value }) => value !== undefined)

    acc[prop] = propInTimeline
    return acc
  }, {} as PropToRawKeyframe)

  const numberPropsInTimeline = numberProps.filter((p) => propsInTimeline.includes(p))
  for (const prop of numberPropsInTimeline) {
    tl.properties[prop] = compileNumericProp(prop, propToRawKeyframes);
  }

  const colorPropsInTimeline = colorProps.filter((p) => propsInTimeline.includes(p))
  for (const prop of colorPropsInTimeline) {
    tl.properties[prop] = compileColorProp(prop, propToRawKeyframes);
  }

  console.log(tl)
  return tl
}