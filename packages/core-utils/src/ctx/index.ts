import type { MaybeRef } from 'vue';

/**
 * gets `ctx` from a `<canvas />` or canvas ref (vue.js)
 *
 * @returns {CanvasRenderingContext2D}
 * @example const ctx = getCtx(canvasRef);
 * // ctx is defined and ready to use
 * @throws {Error} if canvas element isn't in the DOM or `canvas.getContext` returns `null`
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
