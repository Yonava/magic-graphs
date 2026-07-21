import { nullThrows } from '@core/utils/assert';
import { jsonClone } from '@core/utils/clone';
import { delta } from '@core/utils/delta/index';
import { DeepPartial } from 'ts-essentials';

import type {
  EverySchemaPropName,
  SchemaId,
  ShapeName,
} from '../../types/index.ts';
import { type GetAnimatedSchema, resolveSchemaWithDefaults } from '../index.ts';
import type { DefineTimeline, Timeline } from '../timeline/define.ts';
import type { LooseSchema, LooseSchemaValue } from '../types.ts';
import { arrowAdd } from './arrow/add.ts';
import { arrowRemove } from './arrow/remove.ts';
import { circleAdd } from './circle/add.ts';
import { circleRemove } from './circle/remove.ts';
import {
  AUTO_ANIMATED_PROPERTIES,
  AUTO_ANIMATE_DURATION_MS,
} from './constants.ts';
import { LooseSchemaWithName } from './types.ts';

/**
 * a shape that was removed from the graph but is still mid-removal-animation.
 * `orderIndex` is this shape's position among everything drawn during the
 * capture's "before" snapshot, so it can be redrawn in the right z-order
 * relative to shapes still being drawn normally.
 */
export type GhostShape = {
  id: SchemaId;
  schema: LooseSchemaWithName;
  orderIndex: number;
};

type CreateTimelineValue = {
  startValue: LooseSchemaValue;
  endValue: LooseSchemaValue;
  schemaPropertyName: EverySchemaPropName;
};

type CaptureState = 'before' | 'after' | undefined;

export const createAutoAnimate = (
  defineTimeline: DefineTimeline,
  getAnimatedSchema: GetAnimatedSchema,
  stopAllAnimations: (shapeId: SchemaId) => void,
) => {
  let capturedSchemas: Map<SchemaId, LooseSchemaWithName> = new Map();
  let captureState: CaptureState;

  const snapshotMap: Map<
    SchemaId,
    Partial<{ before: LooseSchemaWithName; after: LooseSchemaWithName }>
  > = new Map();

  // shapes removed from the graph that are still playing their remove
  // animation. rendering keeps drawing these from their last known schema
  // (with the remove timeline's live values applied) until the remove
  // timeline's own `onComplete` clears them, at `orderIndex`'s position
  // relative to everything else drawn.
  const ghosts: Map<SchemaId, GhostShape> = new Map();

  // position of each shape within the overall draw order captured during the
  // most recent "before" snapshot, used to place ghosts back in the right
  // z-order once they're no longer drawn as part of the normal draw pass.
  let beforeCaptureOrder: Map<SchemaId, number> = new Map();
  let beforeCaptureOrderCounter = 0;

  const createTimeline = (
    shapeName: ShapeName,
    values: CreateTimelineValue[],
  ) => {
    const startingValues: Record<string, LooseSchemaValue> = {};
    const endingValues: Record<string, LooseSchemaValue> = {};

    for (const value of values) {
      startingValues[value.schemaPropertyName] = value.startValue;
      endingValues[value.schemaPropertyName] = value.endValue;
    }

    return {
      forShapes: [shapeName],
      durationMs: AUTO_ANIMATE_DURATION_MS,
      keyframes: [
        {
          progress: 0,
          properties: startingValues,
        },
        {
          progress: 1,
          properties: endingValues,
        },
      ],
    };
  };

  const runAnimation = (
    timeline: Timeline<any>,
    schemaId: string,
    onOver?: () => void,
  ) => {
    // a shape can carry animations auto-animate never started itself (e.g.
    // one played directly via `defineTimeline` outside auto-animate).
    // leaving any prior animation running lets its properties keep blending
    // into `getAnimatedSchema`'s output alongside the sequence starting
    // here, which causes a visible snap/flicker.
    stopAllAnimations(schemaId);

    const { play } = defineTimeline(timeline);
    play({ shapeId: schemaId, runCount: 1, onOver });
  };

  return {
    captureSchemaState: (schema: LooseSchema, shapeName: ShapeName) => {
      if (!captureState) return;
      // we only care about capturing each schema once, the rest of the calls should be ignored
      if (capturedSchemas.has(schema.id)) return;
      const schemaWithDefaults = resolveSchemaWithDefaults(schema, shapeName);
      // if capture state is "before", use the shape's live (currently animating) schema instead, to prevent snap-backs.
      const liveSchema =
        captureState === 'before'
          ? (getAnimatedSchema(schema.id) ?? schemaWithDefaults)
          : schemaWithDefaults;

      const capturedSchema = jsonClone({ ...liveSchema, shapeName });
      capturedSchemas.set(schema.id, capturedSchema);

      if (captureState === 'before') {
        beforeCaptureOrder.set(schema.id, beforeCaptureOrderCounter++);
      }

      // write into snapshotMap immediately (not after flushDraw finishes) so
      // getCaptureOverride sees this shape's entry within the same draw pass,
      // suppressing newly added shapes before they get a chance to flash.
      const shapeSchemaEntry = snapshotMap.get(schema.id) ?? {};
      snapshotMap.set(schema.id, {
        ...shapeSchemaEntry,
        [captureState]: capturedSchema,
      });
    },

    /**
     * While a capture window is open (between captureFrame's before/after snapshots),
     * shape rendering must not jump to live/mutated values or the transition
     * being diffed for animation will visibly pop. This freezes rendering on the
     * pre-mutation schema, or suppresses it entirely for a shape with no "before"
     * (i.e. one newly added during this capture).
     */
    getCaptureOverride: (
      schemaId: SchemaId,
    ): { schema: LooseSchemaWithName } | 'suppress' | undefined => {
      const snapshotMapEntry = snapshotMap.get(schemaId);
      if (!snapshotMapEntry) return undefined;

      const { before: beforeSnapshot } = snapshotMapEntry;
      if (!beforeSnapshot) return 'suppress';

      return { schema: beforeSnapshot };
    },

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
     * const finalize = autoAnimate.captureFrame(() => draw());
     * mutateShapes();
     * finalize(); // triggers animation between captured states
     */
    captureFrame: (flushDraw: () => void) => {
      // clear any stale snapshots left over from previous abandoned frames
      snapshotMap.clear();

      const takeSnapshot = (state: 'before' | 'after') => {
        capturedSchemas = new Map();
        if (state === 'before') {
          beforeCaptureOrder = new Map();
          beforeCaptureOrderCounter = 0;
        }
        captureState = state;
        flushDraw();
        captureState = undefined;
      };

      takeSnapshot('before');

      return () => {
        takeSnapshot('after');

        const schemasCapturedInSnapshots = Array.from(snapshotMap).map(
          ([schemaId, snapshotStates]) => ({
            schemaId,
            beforeSchema: snapshotStates.before,
            afterSchema: snapshotStates.after,
          }),
        );

        for (const snapshot of schemasCapturedInSnapshots) {
          const { beforeSchema, afterSchema } = snapshot;

          // this shape was added
          if (!beforeSchema) {
            const schema = nullThrows(
              afterSchema,
              'after schema must be defined',
            );

            // this id is re-appearing while its remove animation was still
            // playing (e.g. removed then immediately re-added). treat it as
            // a continuation from wherever the ghost currently is instead of
            // a fresh entrance animation, so it doesn't snap straight to its
            // final state
            const ghost = ghosts.get(schema.id);
            if (ghost) {
              // getAnimatedSchema returns a bare LooseSchema (no shapeName);
              // re-attach it so it doesn't register as a spurious diff below
              const ghostLiveSchema: LooseSchemaWithName = {
                ...(getAnimatedSchema(schema.id) ?? ghost.schema),
                shapeName: ghost.schema.shapeName,
              };
              const schemaDifference: DeepPartial<LooseSchemaWithName> | null =
                delta(ghostLiveSchema, schema);

              if (schemaDifference && !schemaDifference.shapeName) {
                const schemaPropNames = Object.keys(
                  schemaDifference,
                ) as EverySchemaPropName[];
                const supportedSchemaProperties = schemaPropNames.filter(
                  (name) => AUTO_ANIMATED_PROPERTIES.has(name),
                );
                const timelineValues = supportedSchemaProperties.map(
                  (name): CreateTimelineValue => ({
                    schemaPropertyName: name,
                    startValue: ghostLiveSchema[name],
                    endValue: schema[name],
                  }),
                );
                const timeline = createTimeline(
                  schema.shapeName,
                  timelineValues,
                );
                // also stops the ghost's remove animation and clears it via
                // its onOver, since this timeline takes over from here
                runAnimation(timeline, schema.id);
              } else {
                // no meaningful difference (or an unsupported shape change):
                // just stop the remove animation and clear the ghost
                stopAllAnimations(schema.id);
              }
              continue;
            }

            if (schema.shapeName === 'circle') {
              runAnimation(circleAdd, schema.id);
            }
            if (schema.shapeName === 'arrow') {
              runAnimation(arrowAdd, schema.id);
            }
            continue;
          }

          // this shape was removed: keep drawing it as a "ghost" from its last
          // known schema, in its original draw-order position, for the
          // duration of the remove animation
          if (!afterSchema) {
            ghosts.set(snapshot.schemaId, {
              id: snapshot.schemaId,
              schema: beforeSchema,
              orderIndex: beforeCaptureOrder.get(snapshot.schemaId) ?? 0,
            });

            const clearGhost = () => ghosts.delete(snapshot.schemaId);
            if (beforeSchema.shapeName === 'circle') {
              runAnimation(circleRemove, snapshot.schemaId, clearGhost);
            }
            if (beforeSchema.shapeName === 'arrow') {
              runAnimation(arrowRemove, snapshot.schemaId, clearGhost);
            }

            continue;
          }

          // if a shapes schema has not changed between snapshots, we dont need to animate it
          const schemaDifference: DeepPartial<LooseSchemaWithName> | null =
            delta(beforeSchema, afterSchema);

          // TODO known issue: only check for properties in the schema difference we care about
          // otherwise we could be starting an animation based on an unknown junk property
          if (!schemaDifference) continue;

          // animation between shapes is not supported
          const { shapeName } = schemaDifference;
          if (shapeName) {
            console.warn(
              `shape with ID ${snapshot.schemaId} transformed from a ${beforeSchema.shapeName} to an ${afterSchema.shapeName}. Animating between shapes is unsupported and breaks the engine, therefore auto-animate has ignored it`,
            );
            continue;
          }

          const schemaPropNames = Object.keys(
            schemaDifference,
          ) as EverySchemaPropName[];

          const supportedSchemaProperties = schemaPropNames.filter((name) =>
            AUTO_ANIMATED_PROPERTIES.has(name),
          );

          const timelineValues = supportedSchemaProperties.map(
            (name): CreateTimelineValue => ({
              schemaPropertyName: name,
              startValue: beforeSchema[name],
              endValue: afterSchema[name],
            }),
          );

          const timeline = createTimeline(
            afterSchema.shapeName,
            timelineValues,
          );

          runAnimation(timeline, afterSchema.id);
        }

        snapshotMap.clear();
      };
    },

    /**
     * shapes removed from the graph that are still playing their remove
     * animation, in their original draw-order position (ascending `orderIndex`).
     */
    getGhosts: (): GhostShape[] =>
      Array.from(ghosts.values()).sort((a, b) => a.orderIndex - b.orderIndex),

    /**
     * whether this schema is currently a ghost (removed from the graph but
     * still mid-removal-animation). must be checked before calling
     * `getAnimatedSchema`, which can synchronously clear the ghost via its
     * `onOver` callback once the remove animation's runCount is exhausted.
     */
    isGhost: (schemaId: SchemaId): boolean => ghosts.has(schemaId),
  };
};
