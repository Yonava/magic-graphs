import { ELLIPSE_SCHEMA_DEFAULTS } from "./defaults";
import type { EllipseSchema } from "./types";

export const drawEllipseWithCtx =
  (options: EllipseSchema) => (ctx: CanvasRenderingContext2D) => {
    const { at, radiusX, radiusY, fillColor: color, stroke } = {
      ...ELLIPSE_SCHEMA_DEFAULTS,
      ...options,
    };

    ctx.beginPath();
    ctx.ellipse(at.x, at.y, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

    if (stroke) {
      const { color, lineWidth: width, dash } = stroke;
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.setLineDash(dash || []);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.closePath();
  };
