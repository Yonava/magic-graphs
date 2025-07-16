import type { ArrowSchemaWithDefaults } from './defaults';
import { line } from '../line';
import { calculateArrowHeadCorners, getArrowHeadSize } from '@shape/helpers';
import { triangle } from '../triangle';

export const drawArrowWithCtx = (schema: ArrowSchemaWithDefaults) => {
  const {
    start,
    end,
    lineWidth,
    fillGradient,
    fillColor,
  } = schema;

  const angle = Math.atan2(end.y - start.y, end.x - start.x);

  const headSchema = calculateArrowHeadCorners({
    start,
    end,
    lineWidth,
  });

  const { arrowHeadHeight } = getArrowHeadSize(lineWidth)

  const shaftEnd = {
    x: end.x - arrowHeadHeight * Math.cos(angle),
    y: end.y - arrowHeadHeight * Math.sin(angle),
  };

  const shaft = line({
    ...schema,
    // add sines to solve overlap issue with triangle when drawing (gh issue #24)
    end: {
      x: shaftEnd.x + Math.cos(angle),
      y: shaftEnd.y + Math.sin(angle),
    },
  });
  const head = triangle({
    ...headSchema,
    fillColor: fillGradient && fillGradient.length ? fillGradient.at(-1)?.color : fillColor,
  })

  return (ctx: CanvasRenderingContext2D) => {
    shaft.drawShape(ctx);
    head.drawShape(ctx);
  };
};
