import type { DefineTimeline } from "./timeline/define";
import type { SchemaId } from "@shape/types";

export const AUTO_ANIMATE_DURATION_MS = 500;
const AUTO_ANIMATED_PROPERTIES = new Set(['at', 'start', 'end', 'lineWidth', 'radius', 'fillColor'])

export const useAutoAnimate = (
  defineTimeline: DefineTimeline,
  getAnimatedSchema: (schemaId: string) => any,
) => {
  const lastCapturedSchema: Map<
    SchemaId, Partial<Record<string, any>>
  > = new Map();
  const autoAnimatingSchemas: Set<SchemaId> = new Set();
  const activeAnimationStopper: Map<`${SchemaId}-${string}`, () => void> = new Map()

  const isEqual = (val1: any, val2: any) => {
    if (typeof val1 !== typeof val2) return false;
    if (typeof val1 !== 'object' || val1 === null || val2 === null) {
      return val1 === val2;
    }
    return JSON.stringify(val1) === JSON.stringify(val2);
  }

  const clone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj)) as T;

  return {
    captureSchemaState: (schema: any) => {
      if (!schema?.id) return
      lastCapturedSchema.set(schema.id, clone(schema))
    },
    applyAutoAnimation: (schema: any, shapeName: any) => {
      if (!autoAnimatingSchemas.has(schema.id)) return

      const animateProperty = (startVal: any, endVal: any, propName: string) => {
        const stopper = activeAnimationStopper.get(`${schema.id}-${propName}`)
        if (stopper) stopper()

        const { play, stop } = defineTimeline({
          forShapes: [shapeName],
          durationMs: AUTO_ANIMATE_DURATION_MS,
          easing: { [propName]: 'in-out' },
          keyframes: [
            {
              progress: 0,
              properties: { [propName]: clone(startVal) }
            },
            {
              progress: 1,
              properties: { [propName]: clone(endVal) }
            }
          ],
        })

        play({ shapeId: schema.id, runCount: 1 })
        activeAnimationStopper.set(`${schema.id}-${propName}`, () => stop({ shapeId: schema.id }))
      }

      const previousSchema = lastCapturedSchema.get(schema.id)
      if (!previousSchema) return console.warn('no previous schema')

      // if the schema is being animated, we need to intercept where the property
      // is currently at in the animation instead of the last captured state
      const schemaAnimated = getAnimatedSchema(schema.id)

      const initialProperties: Record<string, any> = {}
      for (const [propName, propVal] of Object.entries(previousSchema)) {
        if (!AUTO_ANIMATED_PROPERTIES.has(propName)) continue

        const endVal = schema[propName];
        if (isEqual(propVal, endVal)) continue

        const startVal = schemaAnimated ? schemaAnimated[propName] : propVal;
        animateProperty(startVal, endVal, propName)

        initialProperties[propName] = startVal
      }

      if (Object.keys(initialProperties).length === 0) return

      return {
        ...schema,
        ...initialProperties,
      }
    },
    autoAnimate: {
      start: (id: SchemaId) => {
        autoAnimatingSchemas.add(id)
      },
      stop: (id: SchemaId) => {
        autoAnimatingSchemas.delete(id)
      },
      isActive: (id: SchemaId) => autoAnimatingSchemas.has(id)
    }
  }
}

export type AutoAnimateControls = ReturnType<typeof useAutoAnimate>['autoAnimate']