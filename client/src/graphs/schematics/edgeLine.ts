import { line } from '@shapes';
import gsap from 'gsap';
import { EASING_FUNCTIONS } from '@utils/animate';
import { DURATION_MS } from '@graph/animationController';
import type { ShapeResolverOptions } from './types';
import { SEQ } from './edgeSeq';
import { getMapper, inRange } from './utils';
import { animateInTextArea, animateOutTextArea } from './edgeTextArea';
import type { LineSchema } from '@shape/line';
import type { WithId } from '@shape/cacher';

const { interpolate, normalize } = gsap.utils;
const EASING = EASING_FUNCTIONS['in-out'];

const animateInLineBody =
  (progress: number) =>
    (lineSchema: LineSchema): Partial<LineSchema> => {
      const mapper = getMapper(...SEQ.IN.BODY);
      const percentage = EASING(mapper(progress));

      const interpolateWidth = interpolate(0, lineSchema.width);

      return {
        width: interpolateWidth(percentage),
      };
    };

const animateOutLineBody =
  (progress: number) =>
    (lineSchema: LineSchema): Partial<LineSchema> => {
      const mapper = getMapper(0, 1);
      const percentage = EASING(mapper(progress));

      const interpolateWidth = interpolate(lineSchema.width, 0);

      return {
        width: interpolateWidth(percentage),
      };
    };

const inLine = (progress: number, shapes: ShapeResolverOptions['shapes']) => (lineSchema: WithId<LineSchema>) => {
  const percent = normalize(0, DURATION_MS, progress);

  if (inRange(SEQ.IN.BODY[0], SEQ.IN.BODY[1], percent)) {
    return shapes.line({
      ...lineSchema,
      ...animateInLineBody(progress)(lineSchema),
      textArea: undefined,
    });
  }

  if (inRange(SEQ.IN.TEXT_AREA[0], SEQ.IN.TEXT_AREA[1], percent)) {
    return shapes.line({
      ...lineSchema,
      textArea: animateInTextArea(progress)(lineSchema.textArea),
    });
  }

  return shapes.line(lineSchema);
};

const outLine = (progress: number, shapes: ShapeResolverOptions['shapes']) => (lineSchema: WithId<LineSchema>) => {
  return shapes.line({
    ...lineSchema,
    ...animateOutLineBody(progress)(lineSchema),
    textArea: animateOutTextArea(progress)(lineSchema.textArea),
  });
};

export const edgeLine =
  ({ animationController, shapes }: ShapeResolverOptions) =>
    (lineSchema: WithId<LineSchema>) => {
      const { itemsAnimatingIn, itemsAnimatingOut } = animationController;

      const inProgress = itemsAnimatingIn.get(lineSchema.id);
      if (inProgress !== undefined) return inLine(inProgress)(lineSchema);

      const outProgress = itemsAnimatingOut.get(lineSchema.id);
      if (outProgress !== undefined) return outLine(outProgress)(lineSchema);

      return shapes.line(lineSchema);
    };
