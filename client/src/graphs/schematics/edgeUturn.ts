import type { UTurnSchema } from '@shape/uturn';
import gsap from 'gsap';
import { EASING_FUNCTIONS } from '@utils/animate';
import { DURATION_MS } from '@graph/animationController';
import type { ShapeResolverOptions } from './types';
import { SEQ } from './uturnSeq';
import { getMapper, inRange } from './utils';
import { animateInTextArea, animateOutTextArea } from './edgeTextArea';
import type { WithId } from '@shape/cacher';

const { interpolate, normalize } = gsap.utils;
const EASING = EASING_FUNCTIONS['in-out'];

const animateInUTurnBody =
  (progress: number) =>
    (uturnSchema: UTurnSchema): Partial<UTurnSchema> => {
      const mapper = getMapper(...SEQ.IN.BODY);
      const percentage = EASING(mapper(progress));

      const interpolateWidth = interpolate(0.00001, uturnSchema.lineWidth);

      return {
        lineWidth: interpolateWidth(percentage),
      };
    };

const animateOutUTurnBody =
  (progress: number) =>
    (uturnSchema: UTurnSchema): Partial<UTurnSchema> => {
      const mapper = getMapper(0, 1);
      const percentage = EASING(mapper(progress));

      const interpolateWidth = interpolate(uturnSchema.lineWidth, 0.00001);

      return {
        lineWidth: interpolateWidth(percentage),
      };
    };

const inUTurn = (progress: number, shapes: ShapeResolverOptions['shapes']) => (uturnSchema: WithId<UTurnSchema>) => {
  const percent = normalize(0, DURATION_MS, progress);

  if (inRange(SEQ.IN.BODY[0], SEQ.IN.BODY[1], percent)) {
    return shapes.uturn({
      ...uturnSchema,
      ...animateInUTurnBody(progress)(uturnSchema),
      textArea: undefined,
    });
  }

  if (inRange(SEQ.IN.TEXT_AREA[0], SEQ.IN.TEXT_AREA[1], percent)) {
    return shapes.uturn({
      ...uturnSchema,
      textArea: animateInTextArea(progress)(uturnSchema.textArea),
    });
  }

  return shapes.uturn(uturnSchema);
};

const outUTurn = (progress: number, shapes: ShapeResolverOptions['shapes']) => (uturnSchema: WithId<UTurnSchema>) => {
  return shapes.uturn({
    ...uturnSchema,
    ...animateOutUTurnBody(progress)(uturnSchema),
    textArea: animateOutTextArea(progress)(uturnSchema.textArea),
  });
};

export const edgeUTurn =
  ({ animationController, shapes }: ShapeResolverOptions) =>
    (uturnSchema: WithId<UTurnSchema>) => {
      const { itemsAnimatingIn, itemsAnimatingOut } = animationController;

      const inProgress = itemsAnimatingIn.get(uturnSchema.id);
      if (inProgress !== undefined) return inUTurn(inProgress, shapes)(uturnSchema);

      const outProgress = itemsAnimatingOut.get(uturnSchema.id);
      if (outProgress !== undefined) return outUTurn(outProgress, shapes)(uturnSchema);

      return shapes.uturn(uturnSchema);
    };
