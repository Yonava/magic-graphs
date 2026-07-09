import type { Shape } from './types/index.ts';

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
 * Draws a group of shapes with their text areas cleanly layered on top,
 * using a single shared offscreen canvas to handle compositing correctly
 * even when shapes cross each other's text areas.
 *
 * ## Why this is necessary
 *
 * When shapes are drawn independently, each shape's text area matte covers
 * whatever was drawn before it — including lines from other shapes crossing
 * through that text area. For straight edges on a graph this is especially
 * visible: a crossing edge gets cut off at the text label boundary.
 *
 * ## How it works
 *
 * 1. All shapes are drawn to a single offscreen canvas.
 * 2. Every text area is punched transparent using `destination-out` compositing.
 *    Because all shapes share the same offscreen canvas, a crossing edge's
 *    line is already present when the hole is punched — it gets erased along
 *    with the label's own edge, leaving clean transparency.
 * 3. The offscreen canvas is composited onto the main canvas. Whatever was
 *    drawn beneath (background pattern, shapes outside the group) shows through
 *    the transparent holes naturally.
 * 4. Text labels are drawn directly on the main canvas on top of everything.
 *
 * @param ctx - The main canvas rendering context
 * @param shapes - Shapes to draw as a group (e.g. all edges on a graph)
 */
export const drawGroup = (ctx: CanvasRenderingContext2D, shapes: Shape[]) => {
  if (shapes.length === 0) return;

  const offCtx = createOffscreenCanvas(ctx);

  for (const shape of shapes) {
    shape.drawShape(offCtx);
  }

  offCtx.globalCompositeOperation = 'destination-out';
  for (const shape of shapes) {
    shape.drawTextAreaHole?.(offCtx);
  }

  compositeToMain(ctx, offCtx);

  for (const shape of shapes) {
    if (shape.drawTextAreaHole) {
      shape.drawText?.(ctx);
    } else {
      shape.drawTextArea?.(ctx);
    }
  }
};
