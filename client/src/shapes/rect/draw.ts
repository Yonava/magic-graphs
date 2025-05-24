import { RECT_SCHEMA_DEFAULTS } from '.';
import type { RectSchema } from '.';

export const drawRectWithCtx =
  (options: RectSchema) => (ctx: CanvasRenderingContext2D) => {
    const { at, width, height, color, borderRadius, rotation, stroke } = {
      ...RECT_SCHEMA_DEFAULTS,
      ...options,
    };

    ctx.save();

    const centerX = at.x + width / 2;
    const centerY = at.y + height / 2;
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);

    if (borderRadius === 0) {
      ctx.beginPath();
      ctx.rect(-width / 2, -height / 2, width, height);
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      const radius = Math.min(borderRadius, width / 2, height / 2);
      ctx.beginPath();
      ctx.moveTo(-width / 2 + radius, -height / 2);
      ctx.lineTo(width / 2 - radius, -height / 2);
      ctx.arcTo(
        width / 2,
        -height / 2,
        width / 2,
        -height / 2 + radius,
        radius,
      );
      ctx.lineTo(width / 2, height / 2 - radius);
      ctx.arcTo(width / 2, height / 2, width / 2 - radius, height / 2, radius);
      ctx.lineTo(-width / 2 + radius, height / 2);
      ctx.arcTo(
        -width / 2,
        height / 2,
        -width / 2,
        height / 2 - radius,
        radius,
      );
      ctx.lineTo(-width / 2, -height / 2 + radius);
      ctx.arcTo(
        -width / 2,
        -height / 2,
        -width / 2 + radius,
        -height / 2,
        radius,
      );
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.fill();
    }

    if (stroke) {
      const { color, width, dash } = stroke;
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.setLineDash(dash || []);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.restore();
  };
