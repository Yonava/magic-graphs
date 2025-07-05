import type { Coordinate } from "@shape/types/utility";
import type { DefineTimeline } from "./timeline/defineTimeline";
import type { SchemaId } from "@shape/types";

const AUTO_ANIMATE_DUR_MS = 500;

export const useAutoAnimate = (
  defineTimeline: DefineTimeline,
  getAnimatedSchema: (schemaId: string) => any,
) => {
  const lastPropValue: Map<
    SchemaId, { at: Coordinate } | { start: Coordinate } | { end: Coordinate }
  > = new Map();
  const isAutoAnimating: Set<SchemaId> = new Set();
  const stopRunningTimeline: Map<`${SchemaId}-${string}`, () => void> = new Map()

  return {
    captureChanges: (schema: any) => {
      if (!schema?.id) return
      if (schema?.at) lastPropValue.set(schema.id, { at: { ...schema.at } })
      if (schema?.start) lastPropValue.set(schema.id, { start: { ...schema.start } })
      if (schema?.end) lastPropValue.set(schema.id, { end: { ...schema.end } })
    },
    applyAutoAnimate: (schema: any, prop: any, factory: any, shapeName: any) => {
      if (!isAutoAnimating.has(schema.id)) return

      const sortOutCoord = (currCoords: Coordinate, prevCoords: Coordinate, propName: string) => {
        if (currCoords.x === prevCoords.x && currCoords.y === prevCoords.y) return

        const activeSchema = getAnimatedSchema(schema.id)
        const startCoords: Coordinate = activeSchema ? activeSchema[propName] : prevCoords;

        const stopper = stopRunningTimeline.get(`${schema.id}-${propName}`)
        if (stopper) stopper()

        const { play, stop } = defineTimeline({
          forShapes: [shapeName],
          durationMs: AUTO_ANIMATE_DUR_MS,
          easing: { [propName]: 'in-out' },
          keyframes: [
            {
              progress: 0,
              properties: { [propName]: { ...startCoords } }
            },
            {
              progress: 1,
              properties: { [propName]: { ...currCoords } }
            }
          ],
        })

        play({ shapeId: schema.id, runCount: 1 })
        stopRunningTimeline.set(`${schema.id}-${propName}`, () => stop({ shapeId: schema.id }))

        return factory({
          ...schema,
          [propName]: startCoords,
        })[prop]
      }

      const lastData = lastPropValue.get(schema.id)
      if (!lastData) return console.warn('no last data')

      if (lastData) {
        const [[propName, coord]] = Object.entries(lastData)
        return sortOutCoord(schema[propName], coord, propName)
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

export type AutoAnimateControls = ReturnType<typeof useAutoAnimate>['autoAnimate']