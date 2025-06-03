import { drawLineWithCtx } from '@shape/shapes/line/draw';
import { drawTriangleWithCtx } from '@shape/shapes/triangle/draw';
import { ARROW_SCHEMA_DEFAULTS } from '.';
import type { ArrowSchema } from '.';
import type { LineSchema } from '@shape/shapes/line';

export const drawArrowWithCtx = (options: ArrowSchema) => {
  const {
    start,
    end,
    width,
    color,
    dash,
    gradientStops,
    arrowHeadSize,
    arrowHeadShape,
  } = {
    ...ARROW_SCHEMA_DEFAULTS,
    ...options,
  };

  const angle = Math.atan2(end.y - start.y, end.x - start.x);

  const { arrowHeadHeight, perpLineLength } = arrowHeadSize(width);

  const shaftEnd = {
    x: end.x - arrowHeadHeight * Math.cos(angle),
    y: end.y - arrowHeadHeight * Math.sin(angle),
  };

  const shaft: LineSchema = {
    start,
    // Add sines to make solve overlap issue with triangle when drawing (gh issue #24)
    end: {
      x: shaftEnd.x + Math.cos(angle),
      y: shaftEnd.y + Math.sin(angle),
    },
    width,
    color,
    dash,
    gradientStops,
  };

  const drawShaft = drawLineWithCtx(shaft);

  const trianglePtA = end;

  const trianglePtB = {
    x: shaftEnd.x + perpLineLength * Math.cos(angle + Math.PI / 2),
    y: shaftEnd.y + perpLineLength * Math.sin(angle + Math.PI / 2),
  };

  const trianglePtC = {
    x: shaftEnd.x - perpLineLength * Math.cos(angle + Math.PI / 2),
    y: shaftEnd.y - perpLineLength * Math.sin(angle + Math.PI / 2),
  };

  const drawHead = arrowHeadShape
    ? arrowHeadShape(end, arrowHeadHeight, perpLineLength).draw
    : drawTriangleWithCtx({
      pointA: trianglePtA,
      pointB: trianglePtB,
      pointC: trianglePtC,
      color:
        gradientStops && gradientStops.length
          ? gradientStops.at(-1)?.color
          : color,
    });

  return (ctx: CanvasRenderingContext2D) => {
    drawShaft(ctx);
    drawHead(ctx);
  };
};
