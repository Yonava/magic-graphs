
import { generateId } from "@utils/id";
import type { DeepPartial, DeepRequired } from "ts-essentials";
import type { DeepReadonly } from "vue";
import { compileTimeline, type CompiledTimeline } from "./compile";
import type { EasingOption } from "../easing";
// @typescript-eslint/no-unused-vars reports unused even if referenced in jsdoc
// eslint-disable-next-line
import type { EverySchemaProp, ShapeNameToSchema, WithId } from "@shape/types";
import type { TextArea } from "@shape/text/types";

type ShapeTarget = {
  /**
   * the {@link WithId | id} of the shape to target
   */
  shapeId: string
}

export type TimelineId = string

type IdField = {
  timelineId: TimelineId
}

type TimelinePlayOptions = ShapeTarget & {
  /**
   * number of times this animation should run
   *
   * TIP: pass `Infinity` to run animation indefinitely
   */
  runCount: number
}

export type UseDefineTimelineOptions = {
  play: (options: TimelinePlayOptions & IdField) => void;
  pause: (options: ShapeTarget & IdField) => void;
  resume: (options: ShapeTarget & IdField) => void;
  stop: (options: ShapeTarget & IdField) => void;
}

type TimelineControls = {
  /**
   * start the animation
   */
  play: (options: TimelinePlayOptions) => void,
  /**
   * stop the animation until `resume` is invoked
   */
  pause: (options: ShapeTarget) => void,
  /**
   * starts animations that have been paused
   */
  resume: (options: ShapeTarget) => void,
  /**
   * stop and reset the animation
   */
  stop: (options: ShapeTarget) => void,
  /**
   * cleanup the timeline if no longer needed
   *
   * NOTE: important when making a large number of calls to `defineTimeline`
   * in order to reclaim memory
   */
  dispose: () => void,
}

type SharedSchemaProps<T extends keyof ShapeNameToSchema> = keyof ShapeNameToSchema[T] & {
  [K in keyof ShapeNameToSchema[T]]:
  T extends any
  ? K extends keyof ShapeNameToSchema[T] ? unknown : never
  : never
}[keyof ShapeNameToSchema[T]]

type SchemaProps<T extends keyof ShapeNameToSchema> = Pick<
  ShapeNameToSchema[T],
  SharedSchemaProps<T>
>;

type InterceptedSchemaProps = {
  textArea: DeepPartial<TextArea>
};

type CustomOption<TProp, TSchema> = (propValue: DeepRequired<TProp>, schema: TSchema) => TProp;

type WithCustomOption<T> = {
  [K in keyof T]: NonNullable<T[K]> | CustomOption<NonNullable<T[K]>, DeepRequired<T>>
}

type TimelineProps<T> = {
  [K in keyof T]: K extends keyof InterceptedSchemaProps ? InterceptedSchemaProps[K] : T[K]
}

type TimelinePropsWithCustomOption<T> = WithCustomOption<TimelineProps<T>>

type TimelineKeyframe<T extends Partial<EverySchemaProp>> = {
  progress: number,
  properties: Partial<TimelinePropsWithCustomOption<T>>
}

export type TimelinePlaybackDuration = {
  durationMs: number,
}

export type Timeline<T extends keyof ShapeNameToSchema> = DeepReadonly<{
  forShapes: T[]
  keyframes: TimelineKeyframe<SchemaProps<NoInfer<T>>>[],
  easing?: Partial<Record<keyof SchemaProps<NoInfer<T>>, EasingOption>>,
} & TimelinePlaybackDuration>

export const useDefineTimeline = (controls: UseDefineTimelineOptions) => {
  const timelineIdToTimeline: Map<TimelineId, CompiledTimeline> = new Map()

  const defineTimeline = <T extends keyof ShapeNameToSchema>(
    timeline: Timeline<T>
  ): TimelineControls => {
    const timelineId = generateId()

    const compiledTimeline = compileTimeline(timeline as Timeline<any>)
    timelineIdToTimeline.set(timelineId, compiledTimeline)

    return {
      play: (opts) => controls.play({ ...opts, timelineId }),
      pause: (opts) => controls.pause({ ...opts, timelineId }),
      resume: (opts) => controls.resume({ ...opts, timelineId }),
      stop: (opts) => controls.stop({ ...opts, timelineId }),
      dispose: () => timelineIdToTimeline.delete(timelineId),
    }
  }

  return {
    timelineIdToTimeline,
    defineTimeline,
  }
}

export type DefineTimeline = ReturnType<typeof useDefineTimeline>['defineTimeline']