import { delta } from "@utils/deepDelta";
import type { DefineTimeline } from "./timeline/define";
import type { EverySchemaPropName, SchemaId, ShapeName } from "@shape/types";
import type { LooseSchema, LooseSchemaValue } from "./types";
import type { GetAnimatedSchema } from ".";

export const AUTO_ANIMATE_DURATION_MS = 500;
const AUTO_ANIMATED_PROPERTIES = new Set(['at', 'start', 'end', 'lineWidth', 'radius', 'fillColor'])

type LooseSchemaWithName = LooseSchema & { shapeName: ShapeName }
type StopperKey = `${SchemaId}-${string}`

const clone = <T>(obj: T) => JSON.parse(JSON.stringify(obj)) as T;

export const useAutoAnimate = (defineTimeline: DefineTimeline, getAnimatedSchema: GetAnimatedSchema) => {
  let capturedSchemas: LooseSchemaWithName[] = []
  let activelyCapturingSchemas = false;

  const snapshotMap: Map<SchemaId, LooseSchema> = new Map()
  const animationStopper: Map<StopperKey, () => void> = new Map()

  const applyAnimation = (
    startVal: LooseSchemaValue,
    endVal: LooseSchemaValue,
    propName: EverySchemaPropName,
    id: SchemaId,
    shapeName: ShapeName
  ) => {
    const stopKey: StopperKey = `${id}-${propName}`
    const stopper = animationStopper.get(stopKey)
    if (stopper) stopper()

    const { play, stop } = defineTimeline({
      forShapes: [shapeName],
      durationMs: AUTO_ANIMATE_DURATION_MS,
      easing: { [propName]: 'in-out' },
      keyframes: [
        {
          progress: 0,
          properties: { [propName]: startVal }
        },
        {
          progress: 1,
          properties: { [propName]: endVal }
        }
      ],
    })

    play({ shapeId: id, runCount: 1 })
    animationStopper.set(stopKey, () => stop({ shapeId: id }))
  }

  return {
    captureSchemaState: (schema: LooseSchema, shapeName: ShapeName) => {
      if (!activelyCapturingSchemas) return
      capturedSchemas.push(clone({ ...schema, shapeName }))
    },
    snapshotMap,

    /**
     * Captures a pair of "before" and "after" snapshots of the given shapes' schemas
     * by invoking the provided `flushDraw` function twice.
     *
     * This enables automatic animations to be generated by diffing the two states.
     *
     * @param ids - The IDs of shapes to track during this animation frame.
     * @param flushDraw - A function that triggers a draw cycle. This is called:
     *   - once immediately to capture the "before" state, and
     *   - again inside the returned `finalize()` function to capture the "after" state.
     *
     * @returns A function that, when called, finalizes the capture and triggers animation.
     *
     * @example
     * const finalize = autoAnimate.captureFrame(ids, () => draw());
     * mutateShapes();
     * finalize(); // triggers animation between captured states
     */
    captureFrame: (flushDraw: () => void) => {
      const takeSnapshot = () => {
        capturedSchemas = [];
        activelyCapturingSchemas = true;
        flushDraw();
        activelyCapturingSchemas = false;
        return capturedSchemas;
      }

      const before = takeSnapshot()

      for (const schema of before) {
        const liveSchema = getAnimatedSchema(schema.id)
        snapshotMap.set(schema.id, clone(liveSchema ?? schema))
      }

      return () => {
        const after = takeSnapshot();

        if (before.length !== after.length) throw new Error('tracked shape mismatch when capturing animation frame')

        for (let i = 0; i < after.length; i++) {
          const beforeSchema = before[i]
          const afterSchema = after[i]

          const diff = delta(beforeSchema, afterSchema)
          if (!diff) continue

          if (diff['id']) throw new Error('id mismatch in before and after schema!')
          if (diff['shapeName']) throw new Error('shape name mismatch in before and after schema!')

          const schemaPropNames = Object.keys(diff) as EverySchemaPropName[]
          for (const propName of schemaPropNames) {
            const propSupported = AUTO_ANIMATED_PROPERTIES.has(propName)
            if (!propSupported) continue

            const liveShape = snapshotMap.get(afterSchema.id)
            if (!liveShape || liveShape?.[propName] === undefined) {
              throw new Error(`live shape in target map missing required prop ${propName}!`)
            }

            applyAnimation(liveShape[propName], afterSchema[propName], propName, afterSchema.id, afterSchema.shapeName)
          }
        }

        snapshotMap.clear()
      }
    }
  }
}