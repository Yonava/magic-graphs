import { toBorderRadiusArray } from '@shape/helpers';
import type { CrossSchemaWithDefaults } from './defaults';
import { drawRectWithCtx } from '@shape/shapes/rect/draw';

export const drawCrossWithCtx = (schema: CrossSchemaWithDefaults) => {
  const {
    at: crossAt,
    size,
    rotation,
    fillColor,
    lineWidth,
    borderRadius,
  } = schema;

  const halfLineWidth = lineWidth / 2;
  const [topLeft, topRight, bottomLeft, bottomRight] =
    toBorderRadiusArray(borderRadius);

  return (ctx: CanvasRenderingContext2D) => {
    ctx.save();

    ctx.translate(crossAt.x, crossAt.y);
    ctx.rotate(rotation);

    // vertical top
    drawRectWithCtx({
      at: { x: -halfLineWidth, y: -size / 2 },
      width: lineWidth,
      height: size / 2 - halfLineWidth,
      fillColor,
      borderRadius: [topLeft, topLeft, 0, 0],
    })(ctx);

    // horizontal
    drawRectWithCtx({
      at: { x: -size / 2, y: -halfLineWidth },
      width: size,
      height: lineWidth,
      fillColor,
      borderRadius: [bottomRight, topRight, topRight, bottomRight],
    })(ctx);

    // vertical bottom
    drawRectWithCtx({
      at: { x: -halfLineWidth, y: halfLineWidth },
      width: lineWidth,
      height: size / 2 - halfLineWidth,
      fillColor,
      borderRadius: [0, 0, bottomLeft, bottomLeft],
    })(ctx);

    ctx.restore();
  };
};
