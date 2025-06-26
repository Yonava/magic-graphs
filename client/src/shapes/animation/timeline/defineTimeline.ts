import type { TextArea } from "@shape/types/utility";
import type { ArrowSchema } from "@shapes/arrow/types";
import type { LineSchema } from "@shapes/line/types";
import type { RectSchema } from "@shapes/rect/types";
import type { SquareSchema } from "@shapes/square/types";
import { generateId } from "@utils/id";
import type { DeepPartial, DeepRequired } from "ts-essentials";
import type { DeepReadonly } from "vue";
import { compileTimeline, type CompiledTimeline } from "./compile";
import type { EasingOption } from "../easing";
import type { UTurnSchema } from "@shapes/uturn/types";
import type { CircleSchema } from "@shapes/circle/types";

type TimelinePlayOptions = { shapeId: string, runCount: number }
type TimelineStopOptions = { shapeId: string }

export type TimelineId = string
type TimelineIdField = { timelineId: TimelineId }

export type UseDefineTimelineOptions = {
  /**
   * play animation handler
   */
  play: (options: TimelinePlayOptions & TimelineIdField) => void;
  /**
   * stop animation handler
   */
  stop: (options: TimelineStopOptions & TimelineIdField) => void;
}

type TimelineControls = {
  /**
   * start the animation
   */
  play: (options: TimelinePlayOptions) => void,
  /**
   * stop and reset the animation
   */
  stop: (options: TimelineStopOptions) => void,
  /**
   * cleanup the timeline if no longer needed
   *
   * NOTE: cleanup is handled automatically by {@link FinalizationRegistry}
   * however it is best practice to ensure cleanup manually
   * when making repeated single-use calls to `defineTimeline`
   */
  dispose: () => void,
}

type ShapeNameToSchema = {
  rect: RectSchema,
  square: SquareSchema,
  line: LineSchema,
  arrow: ArrowSchema,
  uturn: UTurnSchema,
  circle: CircleSchema,
}

type EverySchemaProp = RectSchema | SquareSchema | LineSchema | ArrowSchema

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

export const useDefineTimeline = ({ play, stop }: UseDefineTimelineOptions) => {
  const timelineIdToTimeline: Map<TimelineId, CompiledTimeline> = new Map()

  const registry = new FinalizationRegistry<TimelineId>((timelineId) => {
    timelineIdToTimeline.delete(timelineId)
  })

  const defineTimeline = <T extends keyof ShapeNameToSchema>(
    timeline: Timeline<T>
  ): TimelineControls => {
    const timelineId = generateId()

    const compiledTimeline = compileTimeline(timeline as Timeline<any>)
    timelineIdToTimeline.set(timelineId, compiledTimeline)

    const unregisterToken = {}

    const controls: TimelineControls = {
      play: (opts) => play({ ...opts, timelineId }),
      stop: (opts) => stop({ ...opts, timelineId }),
      dispose: () => {
        timelineIdToTimeline.delete(timelineId)
        registry.unregister(unregisterToken)
      }
    }

    registry.register(controls, timelineId, unregisterToken)

    return controls
  }

  return {
    timelineIdToTimeline,
    defineTimeline,
  }
}

export type DefineTimeline = ReturnType<typeof useDefineTimeline>['defineTimeline']