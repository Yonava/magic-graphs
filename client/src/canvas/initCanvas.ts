import { getCtx } from "@utils/ctx";

export const initCanvas = (canvas: HTMLCanvasElement) => {
  const ctx = getCtx(canvas);

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.scale(dpr, dpr);
}