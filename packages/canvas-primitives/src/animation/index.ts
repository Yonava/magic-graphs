import { nullThrows } from '@core/utils/assert';
import type { UnionToIntersection } from 'ts-essentials';

import { getSchemaWithDefaults } from '../defaults/shapes.ts';
import { drawGroup as drawGroupPure } from '../drawGroup.ts';
import { shapes } from '../index.ts';
import type {
  EverySchemaProp,
  EverySchemaPropName,
  SchemaId,
  Shape,
  ShapeFactory,
  ShapeName,
  WithId,
} from '../types/index.ts';
import { shapeProps } from '../types/index.ts';
import { createAutoAnimate } from './auto-animate/createAutoAnimate.ts';
import { createDefineTimeline } from './timeline/define.ts';
import type { ActiveAnimation, LooseSchema } from './types.ts';
import { getAnimationProgress, getCurrentRunCount } from './utils.ts';

type ActiveAnimationsMap = Map<SchemaId, ActiveAnimation[]>;
export type GetAnimatedSchema = (schemaId: SchemaId) => LooseSchema | undefined;

export const resolveSchemaWithDefaults = (
  schema: LooseSchema,
  shapeName: ShapeName,
) => {
  const defaultResolver = nullThrows(
    (getSchemaWithDefaults as any)?.[shapeName] as
      ((schema: LooseSchema) => LooseSchema) | undefined,
    `cant find defaults for ${shapeName}`,
  );
  return defaultResolver(schema);
};

/**
 * a version of the shape whose properties are all defined but whose draw
 * methods are no-ops, for shapes that must not render anything yet (no
 * "before" state exists to fall back to during an auto-animate capture)
 */
const withoutDrawing = (shape: Shape): Shape => ({
  ...shape,
  draw: () => {},
  drawShape: () => {},
  drawText: () => {},
  drawTextArea: () => {},
  drawTextAreaHole: () => {},
  drawTextAreaMatte: () => {},
});

export const createAnimatedShapes = () => {
  /**
   * a mapping between shapes (via ids) and the animations currently
   * active/running on those shapes
   */
  const activeAnimations: ActiveAnimationsMap = new Map();
  const schemaIdToShapeName: Map<SchemaId, ShapeName> = new Map();

  const { defineTimeline, timelineIdToTimeline } = createDefineTimeline({
    play: ({
      shapeId,
      timelineId,
      synchronize,
      runCount = Infinity,
      onComplete,
      onOver,
    }) => {
      const newAnimation: ActiveAnimation = {
        runCount: synchronize ? Infinity : runCount,
        startedAt: synchronize ? 0 : Date.now(),
        timelineId,
        onComplete,
        onOver,
      };

      const currAnimations = activeAnimations.get(shapeId);
      if (currAnimations) {
        currAnimations.push(newAnimation);
      } else {
        activeAnimations.set(shapeId, [newAnimation]);
      }
    },
    stop: ({ shapeId, timelineId }) => {
      const animations = activeAnimations.get(shapeId);
      if (!animations) return;
      const stopped = animations.filter((a) => a.timelineId === timelineId);
      const stillRunning = animations.filter(
        (a) => a.timelineId !== timelineId,
      );
      if (stillRunning.length === 0) activeAnimations.delete(shapeId);
      else activeAnimations.set(shapeId, stillRunning);
      for (const animation of stopped) animation.onOver?.();
    },
    pause: () => console.warn('not implemented'),
    resume: () => console.warn('not implemented'),
  });

  /**
   * stops every animation currently running on a shape, regardless of which
   * timeline started it or whether auto-animate is the one tracking it.
   */
  const stopAllAnimations = (shapeId: SchemaId) => {
    const animations = activeAnimations.get(shapeId);
    activeAnimations.delete(shapeId);
    for (const animation of animations ?? []) animation.onOver?.();
  };

  /**
   * if schema is actively being animated, returns the live schema with animated props applied.
   */
  const getAnimatedSchema: GetAnimatedSchema = (schemaId) => {
    const animations = activeAnimations.get(schemaId);
    if (!animations || animations.length === 0) return;

    let outputSchema = nullThrows(
      animations[0].schemaWithDefaults,
      'animation set without a schema. this should never happen!',
    );

    const shapeName = nullThrows(
      schemaIdToShapeName.get(schemaId),
      '(Internal Error) Animation set without shape name mapping. this should never happen!',
    );

    const expired: ActiveAnimation[] = [];

    for (const animation of animations) {
      const timeline = nullThrows(
        timelineIdToTimeline.get(animation.timelineId),
        'animation activated without a timeline!',
      );

      const animationWithTimeline = {
        ...timeline,
        ...animation,
      };

      const { validShapes, timelineId } = animationWithTimeline;
      if (!validShapes.has(shapeName)) {
        console.warn(
          `(Internal Error) Attempted to apply inappropriate animation to schema! Animation timeline ${timelineId} only works for shapes ${Array.from(validShapes.keys())} but schema ${schemaId} is of shape ${shapeName}.`,
        );
        continue;
      }

      // cleanup animation if expired
      const currentRunCount = getCurrentRunCount(animationWithTimeline);
      const shouldRemove = currentRunCount >= animationWithTimeline.runCount;
      if (shouldRemove) {
        expired.push(animation);
        animation.onComplete?.();
        animation.onOver?.();
        continue;
      }

      // resolve the properties for the animated shape schema
      const { properties } = animationWithTimeline;
      const progress = getAnimationProgress(animationWithTimeline);

      const infusedProps = Object.entries(properties).reduce((acc, curr) => {
        const [propName, getAnimatedValue] = curr;
        acc[propName as EverySchemaPropName] = getAnimatedValue(
          outputSchema,
          progress,
        );
        return acc;
      }, {} as LooseSchema);

      outputSchema = {
        ...outputSchema,
        ...infusedProps,
      };
    }

    // only drop the animations that actually expired, leaving any others
    // still running on this shape untouched
    if (expired.length > 0) {
      const stillRunning = animations.filter((a) => !expired.includes(a));
      if (stillRunning.length === 0) activeAnimations.delete(schemaId);
      else activeAnimations.set(schemaId, stillRunning);
    }

    return outputSchema;
  };

  const autoAnimate = createAutoAnimate(
    defineTimeline,
    getAnimatedSchema,
    stopAllAnimations,
  );

  function animatedFactory<T extends Omit<LooseSchema, 'id'>>(
    factory: ShapeFactory<T>,
    shapeName: ShapeName,
  ): ShapeFactory<WithId<T>> {
    return (schema) =>
      new Proxy(factory(schema), {
        get: (target, rawProp) => {
          const prop = rawProp as keyof Shape;

          // if not a recognized shape property, return early
          if (!shapeProps.has(prop)) return target[prop];

          // lookup all actively running animations on this shape
          const animations = activeAnimations.get(schema.id);

          // ghosts are a rendering-only artifact of a shape that's already
          // gone from the graph, redrawn every frame purely to finish its
          // remove animation. they must never enter the before/after diffing
          // used to auto-generate animations for real graph elements: since
          // a ghost's schema is constantly changing mid-animation, any other
          // add/remove action's capture pass would see that as a "property
          // changed" and start a second, untracked animation on the same
          // schema id, clobbering the actual remove animation via
          // `stopAllAnimations` before it can finish.
          const isGhost = autoAnimate.isGhost(schema.id);

          if (!isGhost) {
            autoAnimate.captureSchemaState(schema, shapeName);

            // auto-animate may be in the middle of comparing this shape's old and new
            // schema, so keep showing the old state for now instead of the update
            // that just happened, otherwise it'll flash instead of animate
            const captureOverride = autoAnimate.getCaptureOverride(schema.id);

            if (captureOverride) {
              if (captureOverride === 'suppress')
                return withoutDrawing(target)[prop];
              // auto-animate wants this schema rendered instead of the current schema
              const { shapeName: _, ...targetMapSchema } =
                captureOverride.schema;
              return factory(targetMapSchema as WithId<T>)[prop];
            }
          }

          if (!animations || animations.length === 0) return target[prop];

          // lazily capture the baseline schema on the first render after the
          // animation started, since `play()` has no schema to stash it with
          if (!animations[0]?.schemaWithDefaults) {
            animations[0].schemaWithDefaults = resolveSchemaWithDefaults(
              schema,
              shapeName,
            );
          }

          if (prop === 'startTextAreaEdit')
            return console.warn(
              'shapes with active animations cannot spawn text inputs',
            );

          schemaIdToShapeName.set(schema.id, shapeName);

          const animatedSchema = nullThrows(
            getAnimatedSchema(schema.id),
            'animations present but getAnimatedSchema returned nothing. this should never happen!',
          );

          if (!activeAnimations.has(schema.id)) {
            // a ghost with no animation left has finished its remove
            // sequence and no longer has a "real" state to fall back to;
            // draw nothing instead of popping back to its frozen full schema
            if (isGhost) return withoutDrawing(target)[prop];
            return target[prop];
          }

          return factory(animatedSchema as WithId<T>)[prop];
        },
      });
  }

  const animatedShapes = {
    arrow: animatedFactory(shapes.arrow, 'arrow'),
    circle: animatedFactory(shapes.circle, 'circle'),
    cross: animatedFactory(shapes.cross, 'cross'),
    ellipse: animatedFactory(shapes.ellipse, 'ellipse'),
    image: animatedFactory(shapes.image, 'image'),
    line: animatedFactory(shapes.line, 'line'),
    rect: animatedFactory(shapes.rect, 'rect'),
    scribble: animatedFactory(shapes.scribble, 'scribble'),
    square: animatedFactory(shapes.square, 'square'),
    star: animatedFactory(shapes.star, 'star'),
    triangle: animatedFactory(shapes.triangle, 'triangle'),
    uturn: animatedFactory(shapes.uturn, 'uturn'),
  };

  /**
   * shapes removed from the graph don't come back through `animatedShapes`
   * naturally (the caller has no reason to keep asking for a shape it just
   * deleted), so their remove animation would never be visible. this rebuilds
   * a `Shape` for each in-flight ghost from its last known schema, which
   * re-enters the same animated-shape proxy and therefore still resolves the
   * remove timeline's live (in-progress) property values.
   */
  const getGhostShapes = (): {
    id: SchemaId;
    orderIndex: number;
    shape: Shape;
  }[] =>
    autoAnimate.getGhosts().map(({ id, schema, orderIndex }) => {
      const { shapeName, ...rest } = schema;
      return {
        id,
        orderIndex,
        shape: animatedShapes[shapeName](rest as WithId<any>),
      };
    });

  /**
   * a `drawGroup` that transparently keeps drawing recently-removed shapes
   * ("ghosts") for the duration of their remove animation, at the draw
   * position they held right before removal. `drawGroup` is called once per
   * priority group, potentially several times per frame, so ghosts must be
   * placed relative to a running position across the whole frame rather than
   * reset on every call. `beginFrame` marks where that running count starts
   * over; the caller invokes it once, at the single point per frame where it
   * already knows a new draw pass is starting.
   */
  let shapesDrawnThisFrame = 0;
  // ghosts already placed into a group this frame, so a ghost whose captured
  // orderIndex sits right on a group boundary (removing a shape shrinks the
  // total by one, so a ghost that was last overall now has an orderIndex
  // equal to, not less than, every group's new end) is claimed by exactly
  // one group instead of falling through every group's exclusive range
  const ghostsPlacedThisFrame = new Set<SchemaId>();
  const beginFrame = () => {
    shapesDrawnThisFrame = 0;
    ghostsPlacedThisFrame.clear();
  };

  const drawGroup = (ctx: CanvasRenderingContext2D, groupShapes: Shape[]) => {
    const groupStart = shapesDrawnThisFrame;
    const groupEnd = groupStart + groupShapes.length;

    const ghostsInGroup = getGhostShapes().filter(
      ({ id, orderIndex }) =>
        !ghostsPlacedThisFrame.has(id) &&
        orderIndex >= groupStart &&
        orderIndex <= groupEnd,
    );

    const shapesWithGhosts = [...groupShapes];
    for (const ghost of ghostsInGroup) {
      ghostsPlacedThisFrame.add(ghost.id);
      shapesWithGhosts.splice(
        Math.min(ghost.orderIndex - groupStart, shapesWithGhosts.length),
        0,
        ghost.shape,
      );
    }

    shapesDrawnThisFrame = groupEnd;

    drawGroupPure(ctx, shapesWithGhosts);
  };

  /**
   * a ghost whose priority tier has no surviving live elements this frame
   * (e.g. removing the last node in the graph, or the last shape at a given
   * priority) never gets a `drawGroup` call to be spliced into at all, since
   * the caller only invokes `drawGroup` for priority tiers that still have
   * live elements. call this once per frame, after all real `drawGroup`
   * calls, to draw any ghosts that were never claimed by one.
   */
  const endFrame = (ctx: CanvasRenderingContext2D) => {
    const unclaimedGhosts = getGhostShapes().filter(
      ({ id }) => !ghostsPlacedThisFrame.has(id),
    );
    if (unclaimedGhosts.length === 0) return;

    for (const ghost of unclaimedGhosts) ghostsPlacedThisFrame.add(ghost.id);

    drawGroupPure(
      ctx,
      unclaimedGhosts
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .map((ghost) => ghost.shape),
    );
  };

  return {
    shapes: animatedShapes,
    drawGroup,
    beginFrame,
    endFrame,
    defineTimeline,
    autoAnimate: { captureFrame: autoAnimate.captureFrame },
    getAnimatedSchema,
    /**
     * Get the animated value of a schema property currently being animated.
     *
     * Intended for use in imperative timelines where resolving one property's animated value
     * depends on the animated value of another property. In these special cases, `getAnimatedSchema`
     * would cause a circular dependency.
     *
     * WARNING: Calling this on a property that the imperative track itself resolves
     * will crash your app!
     */
    getAnimatedProp: <T extends EverySchemaPropName>(
      schemaId: string,
      inputPropName: T,
    ) => {
      const animations = activeAnimations.get(schemaId);
      if (!animations || animations.length === 0) {
        throw new Error(`Schema with id ${schemaId} has no running animations`);
      }

      const { schemaWithDefaults } = animations[0];

      if (!schemaWithDefaults) {
        throw new Error(
          '(Internal Error) Animation set without a schema. this should never happen!',
        );
      }

      if (!(inputPropName in schemaWithDefaults)) {
        throw new Error(
          `(User Error) Input prop name ${inputPropName} not a property on schema (${Object.keys(schemaWithDefaults)})`,
        );
      }

      const shapeName = schemaIdToShapeName.get(schemaId);
      if (!shapeName) {
        throw new Error(
          '(Internal Error) Animation set without shape name mapping. this should never happen!',
        );
      }

      let propVal = schemaWithDefaults[
        inputPropName
      ] as UnionToIntersection<EverySchemaProp>[T];

      for (const animation of animations) {
        const timeline = timelineIdToTimeline.get(animation.timelineId);
        if (!timeline)
          throw new Error(
            '(Internal Error) Animation activated without a timeline!',
          );

        const animationWithTimeline = {
          ...timeline,
          ...animation,
        };

        const { validShapes, timelineId } = animationWithTimeline;
        if (!validShapes.has(shapeName)) {
          console.warn(
            `(Internal Error) Attempted to apply inappropriate animation to schema! Animation timeline ${timelineId} only works for shapes ${Array.from(validShapes.keys())} but schema ${schemaId} is of shape ${shapeName}.`,
          );
          continue;
        }

        const { properties } = animationWithTimeline;
        const progress = getAnimationProgress(animationWithTimeline);

        const animationFunction = properties[inputPropName as string];
        propVal = animationFunction(schemaWithDefaults, progress);
      }

      return propVal;
    },
    activeAnimations,
  };
};

export type AnimatedShapeControls = ReturnType<typeof createAnimatedShapes>;
