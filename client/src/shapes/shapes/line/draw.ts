import { LINE_SCHEMA_DEFAULTS } from "./defaults";
import type { LineSchema } from "./types";

export const drawLineWithCtx =
  (line: LineSchema) => (ctx: CanvasRenderingContext2D) => {
    const { start, end, lineWidth: width, fillColor: color, dash, fillGradient } = {
      ...LINE_SCHEMA_DEFAULTS,
      ...line,
    };

    if (width === 0) return;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;

    if (fillGradient && fillGradient.length >= 2) {
      const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
      fillGradient.forEach(({ offset, color }) => {
        gradient.addColorStop(offset, color);
      });
      ctx.strokeStyle = gradient;
    }

    ctx.setLineDash(dash ?? []);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  };
