import { normalizeBoundingBox } from '@shape/helpers';
import { RECT_SCHEMA_DEFAULTS } from '.';
import type { RectSchema } from '.';

export const drawRectWithCtx =
  (options: RectSchema) => (ctx: CanvasRenderingContext2D) => {
    const { at, width, height, color, borderRadius, rotation, stroke } = {
      ...RECT_SCHEMA_DEFAULTS,
      ...options,
    };

    const {
      at: normalizedAt,
      width: normalizedWidth,
      height: normalizedHeight,
    } = normalizeBoundingBox({ at, width, height });

    ctx.save();

    const centerX = normalizedAt.x + normalizedWidth / 2;
    const centerY = normalizedAt.y + normalizedHeight / 2;
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);

    // Handle border radius - support both single number and array
    const getBorderRadii = (borderRadius: number | number[]) => {
      if (typeof borderRadius === 'number') {
        return borderRadius === 0
          ? [0, 0, 0, 0]
          : [borderRadius, borderRadius, borderRadius, borderRadius];
      }

      // For arrays, pad with 0s if too short, truncate if too long
      const radii = [0, 0, 0, 0];
      for (let i = 0; i < Math.min(4, borderRadius.length); i++) {
        radii[i] = borderRadius[i];
      }
      return radii;
    };

    const [topLeft, topRight, bottomRight, bottomLeft] =
      getBorderRadii(borderRadius);

    // Check if any border radius is applied
    if (
      topLeft === 0 &&
      topRight === 0 &&
      bottomRight === 0 &&
      bottomLeft === 0
    ) {
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
      // Constrain each radius to not exceed half the width or height
      const maxRadius = Math.min(normalizedWidth / 2, normalizedHeight / 2);
      const constrainedTopLeft = Math.min(topLeft, maxRadius);
      const constrainedTopRight = Math.min(topRight, maxRadius);
      const constrainedBottomRight = Math.min(bottomRight, maxRadius);
      const constrainedBottomLeft = Math.min(bottomLeft, maxRadius);

      ctx.beginPath();

      // Start from top-left corner, moving clockwise
      ctx.moveTo(
        -normalizedWidth / 2 + constrainedTopLeft,
        -normalizedHeight / 2,
      );

      // Top edge and top-right corner
      ctx.lineTo(
        normalizedWidth / 2 - constrainedTopRight,
        -normalizedHeight / 2,
      );
      if (constrainedTopRight > 0) {
        ctx.arcTo(
          normalizedWidth / 2,
          -normalizedHeight / 2,
          normalizedWidth / 2,
          -normalizedHeight / 2 + constrainedTopRight,
          constrainedTopRight,
        );
      }

      // Right edge and bottom-right corner
      ctx.lineTo(
        normalizedWidth / 2,
        normalizedHeight / 2 - constrainedBottomRight,
      );
      if (constrainedBottomRight > 0) {
        ctx.arcTo(
          normalizedWidth / 2,
          normalizedHeight / 2,
          normalizedWidth / 2 - constrainedBottomRight,
          normalizedHeight / 2,
          constrainedBottomRight,
        );
      }

      // Bottom edge and bottom-left corner
      ctx.lineTo(
        -normalizedWidth / 2 + constrainedBottomLeft,
        normalizedHeight / 2,
      );
      if (constrainedBottomLeft > 0) {
        ctx.arcTo(
          -normalizedWidth / 2,
          normalizedHeight / 2,
          -normalizedWidth / 2,
          normalizedHeight / 2 - constrainedBottomLeft,
          constrainedBottomLeft,
        );
      }

      // Left edge and top-left corner
      ctx.lineTo(
        -normalizedWidth / 2,
        -normalizedHeight / 2 + constrainedTopLeft,
      );
      if (constrainedTopLeft > 0) {
        ctx.arcTo(
          -normalizedWidth / 2,
          -normalizedHeight / 2,
          -normalizedWidth / 2 + constrainedTopLeft,
          -normalizedHeight / 2,
          constrainedTopLeft,
        );
      }

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
