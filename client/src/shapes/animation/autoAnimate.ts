import type { Coordinate } from "@shape/types/utility";
import type { DefineTimeline } from "./timeline/defineTimeline";
import type { SchemaId } from "@shape/types";

export const useAutoAnimateAnchorPoint = (defineTimeline: DefineTimeline) => {
  const lastAnchorPointValue: Map<SchemaId, Coordinate> = new Map()
  const isAutoAnimating: Set<SchemaId> = new Set()

  return {
    captureChanges: (schema: any) => {
      if (!schema?.id || !schema?.at) return
      if (!isAutoAnimating.has(schema.id)) return
      lastAnchorPointValue.set(schema.id, { ...schema.at })
    },
    applyAutoAnimate: (schema: any, prop: any, factory: any) => {
      if (!isAutoAnimating.has(schema.id)) return
      const currCoords = schema.at as Coordinate;
      const prevCoords = lastAnchorPointValue.get(schema.id) ?? currCoords;

      if (currCoords.x !== prevCoords.x || currCoords.y !== prevCoords.y) {
        defineTimeline({
          forShapes: ['circle'],
          durationMs: 1000,
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
    },
    autoAnimate: {
      start: (id: SchemaId) => {
        isAutoAnimating.add(id)
      },
      stop: (id: SchemaId) => {
        lastAnchorPointValue.delete(id)
        isAutoAnimating.delete(id)
      },
      isActive: (id: SchemaId) => isAutoAnimating.has(id)
    }
  }
}