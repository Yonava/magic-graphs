import type { Coordinate } from "@shape/types/utility";
import type { DefineTimeline } from "./timeline/defineTimeline";
import type { SchemaId } from "@shape/types";

export const useAutoAnimateAnchorPoint = (defineTimeline: DefineTimeline) => {
  const lastPropValue: Map<
    SchemaId, { at: Coordinate } | { start: Coordinate, end: Coordinate }
  > = new Map();
  const isAutoAnimating: Set<SchemaId> = new Set();

  return {
    captureChanges: (schema: any) => {
      if (!schema?.id) return
      if (schema?.at) lastPropValue.set(schema.id, { at: { ...schema.at } })
      if (schema?.start && schema?.end) lastPropValue.set(schema.id, {
        start: { ...schema.start },
        end: { ...schema.end },
      })
    },
    applyAutoAnimate: (schema: any, prop: any, factory: any, shapeName: any) => {
      if (!isAutoAnimating.has(schema.id)) return

      const sortOutAt = (currCoords: Coordinate, prevCoords: Coordinate) => {
        if (currCoords.x === prevCoords.x && currCoords.y === prevCoords.y) return

        defineTimeline({
          forShapes: [shapeName],
          durationMs: 250,
          easing: { at: 'in-out' },
          keyframes: [
            {
              progress: 0,
              properties: { at: prevCoords }
            },
            {
              progress: 1,
              properties: { at: currCoords }
            }
          ]
        }).play({ shapeId: schema.id, runCount: 1 })

        return factory({
          ...schema,
          at: prevCoords,
        })[prop]
      }

      const sortOutStartEnd = (
        curr: { start: Coordinate, end: Coordinate },
        prev: { start: Coordinate, end: Coordinate },
      ) => {
        const sameStart = curr.start.x === prev.start.x;
        const sameEnd = curr.end.x === prev.end.x;
        if (sameStart && sameEnd) return

        defineTimeline({
          forShapes: [shapeName],
          durationMs: 250,
          easing: { start: 'in-out', end: 'in-out' },
          keyframes: [
            {
              progress: 0,
              properties: { start: prev.start, end: prev.end }
            },
            {
              progress: 1,
              properties: { start: curr.start, end: curr.end }
            }
          ]
        }).play({ shapeId: schema.id, runCount: 1 })

        return factory({
          ...schema,
          start: prev.start,
          end: prev.end,
        })[prop]
      }

      const lastData = lastPropValue.get(schema.id)
      if (!lastData) return console.warn('no last data')

      if (schema?.at && ('at' in lastData)) {
        return sortOutAt(schema.at, lastData.at)
      }

      if (schema?.start && schema?.end && ('start' in lastData)) {
        return sortOutStartEnd(schema, lastData)
      }
    },
    autoAnimate: {
      start: (id: SchemaId) => {
        isAutoAnimating.add(id)
      },
      stop: (id: SchemaId) => {
        isAutoAnimating.delete(id)
      },
      isActive: (id: SchemaId) => isAutoAnimating.has(id)
    }
  }
}

export type AutoAnimateControls = ReturnType<typeof useAutoAnimateAnchorPoint>['autoAnimate']