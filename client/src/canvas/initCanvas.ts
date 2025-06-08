import { getDevicePixelRatio } from "./camera/utils";

export const initCanvas = (canvas: HTMLCanvasElement) => {
  const dpr = getDevicePixelRatio()
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
}