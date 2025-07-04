import type { Coordinate } from "@shape/types/utility";
import type { DefineTimeline } from "./timeline/defineTimeline";
import type { SchemaId } from "@shape/types";

const AUTO_ANIMATE_DUR_MS = 500;

export const useAutoAnimateAnchorPoint = (
  defineTimeline: DefineTimeline,
  getAnimatedSchema: (schemaId: string) => any,
) => {
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

        const activeSchema = getAnimatedSchema(schema.id)
        const startCoords: Coordinate = activeSchema ? activeSchema.at : prevCoords;

        defineTimeline({
          forShapes: [shapeName],
          durationMs: AUTO_ANIMATE_DUR_MS,
          easing: { at: 'in-out' },
          keyframes: [
            {
              progress: 0,
              properties: { at: { ...startCoords } }
            },
            {
              progress: 1,
              properties: { at: { ...currCoords } }
            }
          ]
        }).play({ shapeId: schema.id, runCount: 1 })

        return factory({
          ...schema,
          at: startCoords,
        })[prop]
      }

      const sortOutStartEnd = (
        curr: { start: Coordinate, end: Coordinate },
        prev: { start: Coordinate, end: Coordinate },
      ) => {
        const sameStart = curr.start.x === prev.start.x;
        const sameEnd = curr.end.x === prev.end.x;
        if (sameStart && sameEnd) return

        const activeSchema = getAnimatedSchema(schema.id)
        const start: { start: Coordinate, end: Coordinate } = activeSchema ? { start: activeSchema.start, end: activeSchema.end } : prev;

        defineTimeline({
          forShapes: [shapeName],
          durationMs: AUTO_ANIMATE_DUR_MS,
          easing: { start: 'in-out', end: 'in-out' },
          keyframes: [
            {
              progress: 0,
              properties: { start: { ...start.start }, end: { ...start.end } }
            },
            {
              progress: 1,
              properties: { start: curr.start, end: curr.end }
            }
          ]
        }).play({ shapeId: schema.id, runCount: 1 })

        return factory({
          ...schema,
          start: start.start,
          end: start.end,
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