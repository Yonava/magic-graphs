import type { ArrowSchema } from "@shapes/arrow/types";
import type { LineSchema } from "@shapes/line/types";
import type { RectSchema } from "@shapes/rect/types";
import type { SquareSchema } from "@shapes/square/types";
import { generateId } from "@utils/id";

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

type TimelineKeyframe<T> = {
  progress: number,
  properties: Partial<T>
}

type Timeline<T extends keyof ShapeNameToSchema> = {
  keyframes: TimelineKeyframe<SchemaProps<T>>[],
};

type RectTimeline = Timeline<'rect' | 'square'>

const rtl: RectTimeline = {
  keyframes: [
    {
      progress: 0,
      properties: {

      }
    }
  ]
}

console.log(rtl)

export const useDefineTimeline = ({ play, stop }: UseDefineTimelineOptions) => {
  const timelineIdToTimeline: Map<TimelineId, Timeline> = new Map()

  return {
    timelineIdToTimeline,
    defineTimeline: (timeline: Timeline): TimelineControls => {
      const timelineId = generateId()
      timelineIdToTimeline.set(timelineId, timeline)
      return {
        play: (opts) => play({ ...opts, timelineId }),
        stop: (opts) => stop({ ...opts, timelineId }),
      }
    }
  }
}