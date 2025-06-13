import { normalizeBorderRadius } from '@shape/helpers';
import { CROSS_SCHEMA_DEFAULTS } from '.';
import type { CrossSchema } from '.';
import { drawRectWithCtx } from '@shape/shapes/rect/draw';

export const drawCrossWithCtx = (options: CrossSchema) => {
  const {
    at: crossAt,
    size,
    rotation,
    fillColor: color,
    lineWidth,
    borderRadius,
  } = {
    ...CROSS_SCHEMA_DEFAULTS,
    ...options,
  };
  const halfLineWidth = lineWidth / 2;
  const [topLeft, topRight, bottomLeft, bottomRight] =
    normalizeBorderRadius(borderRadius);

  return (ctx: CanvasRenderingContext2D) => {
    ctx.save();

    ctx.translate(crossAt.x, crossAt.y);
    ctx.rotate(rotation);

    // vertical top
    drawRectWithCtx({
      at: { x: -halfLineWidth, y: -size / 2 },
      width: lineWidth,
      height: size / 2 - halfLineWidth,
      fillColor: color,
      borderRadius: [topLeft, topLeft, 0, 0],
    })(ctx);

    // horizontal
    drawRectWithCtx({
      at: { x: -size / 2, y: -halfLineWidth },
      width: size,
      height: lineWidth,
      fillColor: color,
      borderRadius: [bottomRight, topRight, topRight, bottomRight],
    })(ctx);

    // vertical bottom
    drawRectWithCtx({
      at: { x: -halfLineWidth, y: halfLineWidth },
      width: lineWidth,
      height: size / 2 - halfLineWidth,
      fillColor: color,
      borderRadius: [0, 0, bottomLeft, bottomLeft],
    })(ctx);

    ctx.restore();
  };
};
