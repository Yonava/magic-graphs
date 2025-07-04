import { drawLineWithCtx } from '@shape/shapes/line/draw';
import { drawTriangleWithCtx } from '@shape/shapes/triangle/draw';
import type { LineSchema } from '../line/types';
import type { ArrowSchemaWithDefaults } from './defaults';

export const drawArrowWithCtx = (schema: ArrowSchemaWithDefaults) => {
  const {
    start,
    end,
    lineWidth: width,
    fillColor: color,
    dash,
    fillGradient,
    arrowHeadSize,
    arrowHeadShape,
  } = schema;

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
    lineWidth: width,
    fillColor: color,
    dash,
    fillGradient,
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
      fillColor:
        fillGradient && fillGradient.length
          ? fillGradient.at(-1)?.color
          : color,
    });

  return (ctx: CanvasRenderingContext2D) => {
    drawShaft(ctx);
    drawHead(ctx);
  };
};
