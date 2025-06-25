import type { TextArea } from "@shape/types/utility";
import type { ArrowSchema } from "@shapes/arrow/types";
import type { LineSchema } from "@shapes/line/types";
import type { RectSchema } from "@shapes/rect/types";
import type { SquareSchema } from "@shapes/square/types";
import { generateId } from "@utils/id";
import type { DeepPartial } from "ts-essentials";
import type { DeepReadonly } from "vue";

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
  play: (options: TimelinePlayOptions) => void,
  stop: (options: TimelineStopOptions) => void,
}

type ShapeNameToSchema = {
  rect: RectSchema,
  square: SquareSchema,
  line: LineSchema,
  arrow: ArrowSchema,
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

type CustomOption<TProp, TSchema> = (propValue: TProp, schema: TSchema) => TProp

type WithCustomOption<T> = {
  [K in keyof T]: T[K] | CustomOption<T[K], T>
}

type TimelineProps<T> = {
  [K in keyof T]: K extends keyof InterceptedSchemaProps ? InterceptedSchemaProps[K] : T[K]
}

type TimelinePropsWithCustomOption<T> = WithCustomOption<TimelineProps<T>>

type TimelineKeyframe<T extends Partial<EverySchemaProp>> = {
  progress: number,
  properties: Partial<TimelinePropsWithCustomOption<T>>
}

type Timeline<T extends keyof ShapeNameToSchema> = DeepReadonly<{
  forShapes: T[]
  keyframes: TimelineKeyframe<SchemaProps<NoInfer<T>>>[],
}>

export const useDefineTimeline = ({ play, stop }: UseDefineTimelineOptions) => {
  const timelineIdToTimeline: Map<TimelineId, Timeline<any>> = new Map()

  const defineTimeline = <T extends keyof ShapeNameToSchema>(
    timeline: Timeline<T>
  ): TimelineControls => {
    const timelineId = generateId()
    timelineIdToTimeline.set(timelineId, timeline)
    return {
      play: (opts) => play({ ...opts, timelineId }),
      stop: (opts) => stop({ ...opts, timelineId }),
    }
  }

  return {
    timelineIdToTimeline,
    defineTimeline,
  }
}