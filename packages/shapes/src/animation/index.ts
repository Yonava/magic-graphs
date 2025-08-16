import type { UnionToIntersection } from 'ts-essentials';
import { getSchemaWithDefaults } from '../defaults/shapes';
import type {
  EverySchemaProp,
  EverySchemaPropName,
  SchemaId,
  Shape,
  ShapeFactory,
  ShapeName,
  WithId,
} from '../types';
import { shapeProps } from '../types';

import { shapes } from '..';
import { useAutoAnimate } from './autoAnimate';
import { useDefineTimeline } from './timeline/define';
import type { ActiveAnimation, LooseSchema } from './types';
import { getAnimationProgress, getCurrentRunCount } from './utils';

type ActiveAnimationsMap = Map<SchemaId, ActiveAnimation[]>;
export type GetAnimatedSchema = (schemaId: SchemaId) => LooseSchema | undefined;

export const useAnimatedShapes = () => {
  /**
   * a mapping between shapes (via ids) and the animations currently
   * active/running on those shapes
   */
  const activeAnimations: ActiveAnimationsMap = new Map();
  const schemaIdToShapeName: Map<SchemaId, ShapeName> = new Map();

  const { defineTimeline, timelineIdToTimeline } = useDefineTimeline({
    play: ({ shapeId, timelineId, synchronize, runCount = Infinity }) => {
      const newAnimation: ActiveAnimation = {
        runCount: synchronize ? Infinity : runCount,
        startedAt: synchronize ? 0 : Date.now(),
        timelineId,
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
      const stillRunning = animations.filter(
        (a) => a.timelineId !== timelineId,
      );
      if (stillRunning.length === 0) return activeAnimations.delete(shapeId);
      activeAnimations.set(shapeId, stillRunning);
    },
    pause: () => console.warn('not implemented'),
    resume: () => console.warn('not implemented'),
  });

  /**
   * if schema is actively being animated, returns the live schema with animated props applied.
   */
  const getAnimatedSchema: GetAnimatedSchema = (schemaId) => {
    const animations = activeAnimations.get(schemaId);
    if (!animations || animations.length === 0) return;

    let outputSchema = animations[0].schemaWithDefaults;

    if (!outputSchema) {
      console.warn('animation set without a schema. this should never happen!');
      return;
    }

    const shapeName = schemaIdToShapeName.get(schemaId);
    if (!shapeName) {
      throw new Error('(Internal Error) Animation set without shape name mapping. this should never happen!');
    }

    for (const animation of animations) {
      const timeline = timelineIdToTimeline.get(animation.timelineId);
      if (!timeline) throw new Error('animation activated without a timeline!');

      const animationWithTimeline = {
        ...timeline,
        ...animation,
      };

      const { validShapes, timelineId } = animationWithTimeline
      if (!validShapes.has(shapeName)) {
        throw new Error(`(Internal Error) Attempted to apply inappropriate animation to schema! Animation timeline ${timelineId} only works for shapes ${Array.from(validShapes.keys())} but schema ${schemaId} is of shape ${shapeName}.`);
      }

      // cleanup animation if expired
      const currentRunCount = getCurrentRunCount(animationWithTimeline);
      const shouldRemove = currentRunCount >= animationWithTimeline.runCount;
      if (shouldRemove) {
        activeAnimations.delete(schemaId);
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

    return outputSchema;
  };

  const autoAnimate = useAutoAnimate(defineTimeline, getAnimatedSchema);

  const animatedFactory =
    <T extends Omit<LooseSchema, 'id'>>(
      factory: ShapeFactory<T>,
      shapeName: ShapeName,
    ): ShapeFactory<WithId<T>> =>
      (schema) =>
        new Proxy(factory(schema), {
          get: (target, rawProp) => {
            const prop = rawProp as keyof Shape;
            if (!shapeProps.has(prop)) return target[prop];

            const animations = activeAnimations.get(schema.id);

            const defaultResolver:
              | ((schema: LooseSchema) => LooseSchema)
              | undefined = (getSchemaWithDefaults as any)?.[shapeName];
            if (!defaultResolver)
              throw new Error(`cant find defaults for ${shapeName}`);
            const schemaWithDefaults = defaultResolver(schema);

            autoAnimate.captureSchemaState(schemaWithDefaults, shapeName);

            const targetMapSchema = autoAnimate.snapshotMap.get(schema.id);
            if (targetMapSchema)
              return factory(targetMapSchema as WithId<T>)[prop];

            if (!animations || animations.length === 0) return target[prop];
            if (!animations[0]?.schemaWithDefaults) animations[0].schemaWithDefaults = schemaWithDefaults;

            if (prop === 'startTextAreaEdit')
              return console.warn(
                'shapes with active animations cannot spawn text inputs',
              );

            const hasShapeName = schemaIdToShapeName.get(schema.id);
            if (!hasShapeName) schemaIdToShapeName.set(schema.id, shapeName);

            const animatedSchema = getAnimatedSchema(schema.id);
            if (!animatedSchema) return target[prop];

            return factory(animatedSchema as WithId<T>)[prop];
          },
        });

  return {
    shapes: {
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
    },
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
    getAnimatedProp: <T extends EverySchemaPropName>(schemaId: string, inputPropName: T) => {
      const animations = activeAnimations.get(schemaId);
      if (!animations || animations.length === 0) {
        throw new Error(`Schema with id ${schemaId} has no running animations`)
      };

      const { schemaWithDefaults } = animations[0]

      if (!schemaWithDefaults) {
        throw new Error('(Internal Error) Animation set without a schema. this should never happen!');
      }

      if (!(inputPropName in schemaWithDefaults)) {
        throw new Error(`(User Error) Input prop name ${inputPropName} not a property on schema (${Object.keys(schemaWithDefaults)})`)
      }

      const shapeName = schemaIdToShapeName.get(schemaId);
      if (!shapeName) {
        throw new Error('(Internal Error) Animation set without shape name mapping. this should never happen!');
      }

      let propVal = schemaWithDefaults[inputPropName] as UnionToIntersection<EverySchemaProp>[T]

      for (const animation of animations) {
        const timeline = timelineIdToTimeline.get(animation.timelineId);
        if (!timeline) throw new Error('(Internal Error) Animation activated without a timeline!');

        const animationWithTimeline = {
          ...timeline,
          ...animation,
        };

        const { validShapes, timelineId } = animationWithTimeline
        if (!validShapes.has(shapeName)) {
          throw new Error(`(Internal Error) Attempted to apply inappropriate animation to schema! Animation timeline ${timelineId} only works for shapes ${Array.from(validShapes.keys())} but schema ${schemaId} is of shape ${shapeName}.`);
        }

        const { properties } = animationWithTimeline;
        const progress = getAnimationProgress(animationWithTimeline);

        const fn = properties[inputPropName as string]
        propVal = fn(schemaWithDefaults, progress)
      }

      return propVal;
    },
    activeAnimations,
  };
};

export type AnimatedShapeControls = ReturnType<typeof useAnimatedShapes>;
