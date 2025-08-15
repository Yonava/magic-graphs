import type { MaybeRef } from 'vue';

/**
 * pulls ctx from a canvas or canvas ref (vue.js), throws if not found
 *
 * @returns {CanvasRenderingContext2D}
 * @example const ctx = getCtx(canvasRef);
 * // ctx is defined and ready to use
 * @throws {Error} if canvas or 2d context not found
 */
export const getCtx = (
  canvasInput: MaybeRef<HTMLCanvasElement | null | undefined>,
) => {
  if (!canvasInput) throw new Error('canvas not found');
  const canvas = 'value' in canvasInput ? canvasInput.value : canvasInput;
  if (!canvas) throw new Error('canvas not found');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2d context not found');
  return ctx;
};
