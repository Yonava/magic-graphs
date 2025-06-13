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
    // vertical top
    drawRectWithCtx({
      at: { x: crossAt.x - halfLineWidth, y: crossAt.y - size / 2 },
      width: lineWidth,
      height: size / 2 - halfLineWidth,
      fillColor: color,
      borderRadius: [topLeft, topLeft, 0, 0],
      rotation,
    })(ctx);
    // horizontal
    drawRectWithCtx({
      at: { x: crossAt.x - size / 2, y: crossAt.y - halfLineWidth },
      width: size,
      height: lineWidth,
      fillColor: color,
      borderRadius: [bottomLeft, bottomLeft, topRight, topRight],
      rotation,
    })(ctx);
    // vertical bottom
    drawRectWithCtx({
      at: { x: crossAt.x - halfLineWidth, y: crossAt.y + halfLineWidth },
      width: lineWidth,
      height: size / 2 - halfLineWidth,
      fillColor: color,
      borderRadius: [0, 0, bottomRight, bottomRight],
      rotation,
    })(ctx);
  };
};
