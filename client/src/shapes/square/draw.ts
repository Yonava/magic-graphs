import type { SquareSchema } from '.';
import { drawRectWithCtx } from '@shape/rect/draw';

export const drawSquareWithCtx = (options: SquareSchema) => {
  const drawRect = drawRectWithCtx({
    width: options.size,
    height: options.size,
    ...options,
  });
  return (ctx: CanvasRenderingContext2D) => drawRect(ctx);
};
