import { LINE_SCHEMA_DEFAULTS } from '.';
import type { LineSchema } from '.';

export const drawLineWithCtx =
  (line: LineSchema) => (ctx: CanvasRenderingContext2D) => {
    const { start, end, width, color, dash, gradientStops } = {
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

    if (gradientStops && gradientStops.length >= 2) {
      const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
      gradientStops.forEach(({ offset, color }) => {
        gradient.addColorStop(offset, color);
      });
      ctx.strokeStyle = gradient;
    }

    ctx.setLineDash(dash);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  };
