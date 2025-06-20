import { TRIANGLE_SCHEMA_DEFAULTS } from "./defaults";
import type { TriangleSchema } from "./types";

export const drawTriangleWithCtx =
  (options: TriangleSchema) => (ctx: CanvasRenderingContext2D) => {
    const { pointA, pointB, pointC, fillColor: color, stroke, fillGradient } = {
      ...TRIANGLE_SCHEMA_DEFAULTS,
      ...options,
    };

    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.lineTo(pointC.x, pointC.y);

    if (fillGradient && fillGradient.length >= 2) {
      const baseMidpoint = {
        x: (pointB.x + pointC.x) / 2,
        y: (pointB.y + pointC.y) / 2,
      };
      const gradient = ctx.createLinearGradient(
        baseMidpoint.x,
        baseMidpoint.y,
        pointA.x,
        pointA.y,
      );
      fillGradient.forEach(({ offset, color }) => {
        gradient.addColorStop(offset, color);
      });
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = color;
    }

    ctx.fill();
    ctx.closePath();

    if (!stroke) return

    ctx.lineWidth = stroke.lineWidth;
    ctx.strokeStyle = stroke.color;
    ctx.setLineDash(stroke.dash ?? []);
    ctx.stroke();

    ctx.setLineDash([]);
  };
