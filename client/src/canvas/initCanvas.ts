import { getCtx } from "@utils/ctx";

export const getDevicePixelRatio = () => window.devicePixelRatio || 1

export const initCanvas = (canvas: HTMLCanvasElement) => {
  const ctx = getCtx(canvas);

  const dpr = getDevicePixelRatio()
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.scale(dpr, dpr);
}