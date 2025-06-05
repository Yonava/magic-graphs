import type { ArrowSchema } from '@shape/shapes/arrow';
import gsap from 'gsap';
import { EASING_FUNCTIONS } from '@utils/animate';
import { DURATION_MS } from '@graph/animationController';
import type { ShapeResolverOptions } from './types';
import { SEQ } from './edgeSeq';
import { getMapper, inRange } from './utils';
import { animateInTextArea, animateOutTextArea } from './edgeTextArea';
import type { WithId } from '@shape/cacher';

const { interpolate, normalize } = gsap.utils;
const EASING = EASING_FUNCTIONS['in-out'];

const animateInArrowBody =
  (progress: number) =>
    (arrowSchema: ArrowSchema): Partial<ArrowSchema> => {
      const mapper = getMapper(...SEQ.IN.BODY);
      const percentage = EASING(mapper(progress));

      const interpolateCoords = interpolate(arrowSchema.start, arrowSchema.end);
      const interpolateWidth = interpolate(0, arrowSchema.lineWidth);

      return {
        end: interpolateCoords(percentage),
        lineWidth: interpolateWidth(percentage),
      };
    };

const animateOutArrowBody =
  (progress: number) =>
    (arrowSchema: ArrowSchema): Partial<ArrowSchema> => {
      const mapper = getMapper(0, 1);
      const percentage = EASING(mapper(progress));

      const interpolateWidth = interpolate(arrowSchema.lineWidth, 0);

      return {
        lineWidth: interpolateWidth(percentage),
      };
    };

const inArrow = (progress: number, shapes: ShapeResolverOptions['shapes']) => (arrowSchema: WithId<ArrowSchema>) => {
  const percent = normalize(0, DURATION_MS, progress);

  if (inRange(SEQ.IN.BODY[0], SEQ.IN.BODY[1], percent)) {
    return shapes.arrow({
      ...arrowSchema,
      ...animateInArrowBody(progress)(arrowSchema),
      textArea: undefined,
    });
  }

  if (inRange(SEQ.IN.TEXT_AREA[0], SEQ.IN.TEXT_AREA[1], percent)) {
    return shapes.arrow({
      ...arrowSchema,
      textArea: animateInTextArea(progress)(arrowSchema.textArea),
    });
  }

  return shapes.arrow(arrowSchema);
};

const outArrow = (progress: number, shapes: ShapeResolverOptions['shapes']) => (arrowSchema: WithId<ArrowSchema>) => {
  return shapes.arrow({
    ...arrowSchema,
    ...animateOutArrowBody(progress)(arrowSchema),
    textArea: animateOutTextArea(progress)(arrowSchema.textArea),
  });
};

export const edgeArrow =
  ({ animationController, shapes }: ShapeResolverOptions) =>
    (arrowSchema: WithId<ArrowSchema>) => {
      const { itemsAnimatingIn, itemsAnimatingOut } = animationController;

      const inProgress = itemsAnimatingIn.get(arrowSchema.id);
      if (inProgress !== undefined) return inArrow(inProgress, shapes)(arrowSchema);

      const outProgress = itemsAnimatingOut.get(arrowSchema.id);
      if (outProgress !== undefined) return outArrow(outProgress, shapes)(arrowSchema);

      return shapes.arrow(arrowSchema);
    };
