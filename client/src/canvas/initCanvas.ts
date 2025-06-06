import { getCtx } from "@utils/ctx";

export const initCanvas = (canvas: HTMLCanvasElement) => {
  const ctx = getCtx(canvas);

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;

  ctx.scale(dpr, dpr);
}