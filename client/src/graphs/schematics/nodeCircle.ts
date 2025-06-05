import gsap from 'gsap';
import type { CircleSchema } from '@shape/shapes/circle';
import type { ShapeResolverOptions } from './types';
import { getMapper } from './utils';
import { EASING_FUNCTIONS } from '@utils/animate';
import type { WithId } from '@shape/cacher';

const { interpolate } = gsap.utils;
const EASING = EASING_FUNCTIONS['in-out'];

const animateInCircleBody =
  (progress: number) =>
    (circleSchema: CircleSchema): Partial<CircleSchema> => {
      const mapper = getMapper(0, 1);
      const percentage = EASING(mapper(progress));

      const interpolateRadius = interpolate(0, circleSchema.radius);

      return {
        radius: interpolateRadius(percentage),
      };
    };

const animateOutCircleBody =
  (progress: number) =>
    (circleSchema: CircleSchema): Partial<CircleSchema> => {
      const mapper = getMapper(0, 1);
      const percentage = EASING(mapper(progress));

      const interpolateRadius = interpolate(circleSchema.radius, 0);

      return {
        radius: interpolateRadius(percentage),
      };
    };

const animateInCircleText =
  (progress: number) =>
    (circleSchema: CircleSchema): Partial<CircleSchema> => {
      if (circleSchema.textArea === undefined) return circleSchema;
      const mapper = getMapper(0, 1);
      const percentage = EASING(mapper(progress));

      const interpolateFontSize = interpolate(
        0,
        circleSchema.textArea.textBlock.fontSize,
      );

      return {
        ...circleSchema,
        textArea: {
          ...circleSchema.textArea,
          textBlock: {
            ...circleSchema.textArea.textBlock,
            fontSize: interpolateFontSize(percentage),
          },
        },
      };
    };

const animateOutCircleText =
  (progress: number) =>
    (circleSchema: CircleSchema): Partial<CircleSchema> => {
      if (circleSchema.textArea === undefined) return circleSchema;
      const mapper = getMapper(0, 1);
      const percentage = EASING(mapper(progress));

      const interpolateFontSize = interpolate(
        circleSchema.textArea.textBlock.fontSize,
        0,
      );

      return {
        ...circleSchema,
        textArea: {
          ...circleSchema.textArea,
          textBlock: {
            ...circleSchema.textArea.textBlock,
            fontSize: interpolateFontSize(percentage),
          },
        },
      };
    };

const inCircle = (progress: number, { circle }: ShapeResolverOptions['shapes']) => (circleSchema: WithId<CircleSchema>) => {
  return circle({
    ...circleSchema,
    ...animateInCircleText(progress)(circleSchema),
    ...animateInCircleBody(progress)(circleSchema),
  });
};

const outCircle = (progress: number, { circle }: ShapeResolverOptions['shapes']) => (circleSchema: WithId<CircleSchema>) => {
  return circle({
    ...circleSchema,
    ...animateOutCircleText(progress)(circleSchema),
    ...animateOutCircleBody(progress)(circleSchema),
  });
};

export const nodeCircle =
  ({ animationController, shapes }: ShapeResolverOptions) =>
    (circleSchema: WithId<CircleSchema>) => {
      const { itemsAnimatingIn, itemsAnimatingOut } = animationController;

      const inProgress = itemsAnimatingIn.get(circleSchema.id);
      if (inProgress !== undefined) return inCircle(inProgress, shapes)(circleSchema);

      const outProgress = itemsAnimatingOut.get(circleSchema.id);
      if (outProgress !== undefined) return outCircle(outProgress, shapes)(circleSchema);

      return shapes.circle(circleSchema);
    };
