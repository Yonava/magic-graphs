import { CROSS_SCHEMA_DEFAULTS } from '.';
import type { CrossSchema } from '.';
import { drawRectWithCtx } from '@shape/rect/draw';

export const drawCrossWithCtx = (options: CrossSchema) => {
  const {
    at: crossAt,
    size,
    rotation,
    color,
    lineWidth,
    borderRadius,
  } = {
    ...CROSS_SCHEMA_DEFAULTS,
    ...options,
  };

  const halfLineWidth = lineWidth / 2;

  return (ctx: CanvasRenderingContext2D) => {
    drawRectWithCtx({
      at: { x: crossAt.x - halfLineWidth, y: crossAt.y - size / 2 },
      width: lineWidth,
      height: size,
      color,
      borderRadius,
      rotation,
    })(ctx);
    drawRectWithCtx({
      at: { x: crossAt.x - size / 2, y: crossAt.y - halfLineWidth },
      width: size,
      height: lineWidth,
      color,
      borderRadius,
      rotation,
    })(ctx);
  };
};
