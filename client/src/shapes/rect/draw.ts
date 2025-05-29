import { RECT_SCHEMA_DEFAULTS } from '.';
import type { RectSchema } from '.';

export const drawRectWithCtx =
  (options: RectSchema) => (ctx: CanvasRenderingContext2D) => {
    const { at, width, height, color, borderRadius, rotation, stroke } = {
      ...RECT_SCHEMA_DEFAULTS,
      ...options,
    };

    const normalizedWidth = Math.abs(width);
    const normalizedHeight = Math.abs(height);

    ctx.save();

    const adjustedX = width < 0 ? at.x + width : at.x;
    const adjustedY = height < 0 ? at.y + height : at.y;
    const centerX = adjustedX + normalizedWidth / 2;
    const centerY = adjustedY + normalizedHeight / 2;

    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);

    if (borderRadius === 0) {
      ctx.beginPath();
      ctx.rect(
        -normalizedWidth / 2,
        -normalizedHeight / 2,
        normalizedWidth,
        normalizedHeight,
      );
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      const radius = Math.min(
        borderRadius,
        normalizedWidth / 2,
        normalizedHeight / 2,
      );
      ctx.beginPath();
      ctx.moveTo(-normalizedWidth / 2 + radius, -normalizedHeight / 2);
      ctx.lineTo(normalizedWidth / 2 - radius, -normalizedHeight / 2);
      ctx.arcTo(
        normalizedWidth / 2,
        -normalizedHeight / 2,
        normalizedWidth / 2,
        -normalizedHeight / 2 + radius,
        radius,
      );
      ctx.lineTo(normalizedWidth / 2, normalizedHeight / 2 - radius);
      ctx.arcTo(
        normalizedWidth / 2,
        normalizedHeight / 2,
        normalizedWidth / 2 - radius,
        normalizedHeight / 2,
        radius,
      );
      ctx.lineTo(-normalizedWidth / 2 + radius, normalizedHeight / 2);
      ctx.arcTo(
        -normalizedWidth / 2,
        normalizedHeight / 2,
        -normalizedWidth / 2,
        normalizedHeight / 2 - radius,
        radius,
      );
      ctx.lineTo(-normalizedWidth / 2, -normalizedHeight / 2 + radius);
      ctx.arcTo(
        -normalizedWidth / 2,
        -normalizedHeight / 2,
        -normalizedWidth / 2 + radius,
        -normalizedHeight / 2,
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
