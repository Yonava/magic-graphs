import { uturn } from '@shapes';
import type { UTurnSchema } from '@shape/uturn';
import gsap from 'gsap';
import { EASING_FUNCTIONS } from '@utils/animate';
import { DURATION_MS } from '@graph/animationController';
import type { ShapeResolverOptions } from './types';
import { SEQ } from './uturnSeq';
import { getMapper, inRange } from './utils';
import { animateInTextArea, animateOutTextArea } from './edgeTextArea';

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

const inUTurn = (progress: number) => (uturnSchema: UTurnSchema) => {
  const percent = normalize(0, DURATION_MS, progress);

  if (inRange(SEQ.IN.BODY[0], SEQ.IN.BODY[1], percent)) {
    return uturn({
      ...uturnSchema,
      ...animateInUTurnBody(progress)(uturnSchema),
      textArea: undefined,
    });
  }

  if (inRange(SEQ.IN.TEXT_AREA[0], SEQ.IN.TEXT_AREA[1], percent)) {
    return uturn({
      ...uturnSchema,
      textArea: animateInTextArea(progress)(uturnSchema.textArea),
    });
  }

  return uturn(uturnSchema);
};

const outUTurn = (progress: number) => (uturnSchema: UTurnSchema) => {
  return uturn({
    ...uturnSchema,
    ...animateOutUTurnBody(progress)(uturnSchema),
    textArea: animateOutTextArea(progress)(uturnSchema.textArea),
  });
};

export const edgeUTurn =
  ({ controller, id }: ShapeResolverOptions) =>
    (uturnSchema: UTurnSchema) => {
      const { itemsAnimatingIn, itemsAnimatingOut } = controller;

      const inProgress = itemsAnimatingIn.get(id);
      if (inProgress !== undefined) return inUTurn(inProgress)(uturnSchema);

      const outProgress = itemsAnimatingOut.get(id);
      if (outProgress !== undefined) return outUTurn(outProgress)(uturnSchema);

      return uturn(uturnSchema);
    };
