import { drawStrokeOntoShape } from '../../helpers';
import type { TriangleSchemaWithDefaults } from './defaults';

export const drawTriangleWithCtx =
  (schema: TriangleSchemaWithDefaults) => (ctx: CanvasRenderingContext2D) => {
    const { pointA, pointB, pointC, fillColor, stroke, fillGradient } = schema;

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
      ctx.fillStyle = fillColor;
    }

    ctx.fill();
    ctx.closePath();

    if (stroke) drawStrokeOntoShape(ctx, stroke)
  };
