import type { DeepRequired } from 'ts-essentials';

import type { getTextAreaDimension } from './text.ts';
import type { TextAreaWithAnchorPoint } from './types.ts';

type DrawFn = (ctx: CanvasRenderingContext2D) => void;
type TextAreaDimensions = ReturnType<typeof getTextAreaDimension>;

/**
 * Creates an offscreen canvas that mirrors the main canvas's pixel dimensions
 * and has the same camera transform applied, ready for isolated drawing.
 */
const createOffscreenCanvas = (
  ctx: CanvasRenderingContext2D,
): CanvasRenderingContext2D => {
  const offscreen = document.createElement('canvas');
  offscreen.width = ctx.canvas.width;
  offscreen.height = ctx.canvas.height;

  const offCtx = offscreen.getContext('2d')!;
  offCtx.setTransform(ctx.getTransform());

  return offCtx;
};

/**
 * Punches a transparent rectangle into the offscreen canvas at the text area's position.
 * Uses destination-out compositing so only pixels within the rect are erased.
 */
const punchTextAreaHole = (
  offCtx: CanvasRenderingContext2D,
  textArea: DeepRequired<TextAreaWithAnchorPoint>,
  dimensions: TextAreaDimensions,
) => {
  offCtx.globalCompositeOperation = 'destination-out';
  offCtx.fillRect(
    textArea.at.x,
    textArea.at.y,
    dimensions.width,
    dimensions.height,
  );
  offCtx.globalCompositeOperation = 'source-over';
};

/**
 * Composites the offscreen canvas onto the main canvas.
 * Transform is reset so offscreen pixels map 1:1 to main canvas pixels.
 */
const compositeToMain = (
  ctx: CanvasRenderingContext2D,
  offCtx: CanvasRenderingContext2D,
) => {
  ctx.save();
  ctx.resetTransform();
  ctx.drawImage(offCtx.canvas, 0, 0);
  ctx.restore();
};

/**
 * Draws a shape with a no-matte text area using offscreen canvas compositing.
 *
 * Instead of painting a solid matte behind the text, the shape is rendered to an
 * offscreen canvas where the text area is punched transparent with destination-out
 * compositing. The result is then composited onto the main canvas, leaving whatever
 * was drawn beneath (e.g. background pattern, other shapes) visible through the
 * text area. Text is then drawn directly on the main canvas on top.
 *
 * This keeps all compositing complexity isolated to the shapes layer — callers
 * simply pass `color: 'none'` on the text area schema.
 */
export const drawWithNoMatte = (
  ctx: CanvasRenderingContext2D,
  drawShape: DrawFn,
  textArea: DeepRequired<TextAreaWithAnchorPoint>,
  dimensions: TextAreaDimensions,
  drawText: DrawFn,
) => {
  const offCtx = createOffscreenCanvas(ctx);

  drawShape(offCtx);
  punchTextAreaHole(offCtx, textArea, dimensions);
  compositeToMain(ctx, offCtx);

  drawText(ctx);
};
