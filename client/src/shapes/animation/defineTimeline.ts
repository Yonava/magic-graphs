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

type Timeline = any;

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