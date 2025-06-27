import { toBorderRadiusArray, normalizeBoundingBox } from '@shape/helpers';
import type { RectSchemaWithDefaults } from './defaults';

export const drawRectWithCtx = (
  schema: RectSchemaWithDefaults
) => (ctx: CanvasRenderingContext2D) => {
  const {
    at,
    width,
    height,
    fillColor,
    borderRadius,
    rotation,
    stroke
  } = schema;

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

  const [topLeft, topRight, bottomRight, bottomLeft] =
    toBorderRadiusArray(borderRadius);

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
    ctx.fillStyle = fillColor;
    ctx.fill();
  } else {
    const maxRadius = Math.min(normalizedWidth / 2, normalizedHeight / 2);
    const constrainedTopLeft = Math.min(topLeft, maxRadius);
    const constrainedTopRight = Math.min(topRight, maxRadius);
    const constrainedBottomRight = Math.min(bottomRight, maxRadius);
    const constrainedBottomLeft = Math.min(bottomLeft, maxRadius);

    ctx.beginPath();

    ctx.moveTo(
      -normalizedWidth / 2 + constrainedTopLeft,
      -normalizedHeight / 2,
    );

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
    ctx.fillStyle = fillColor;
    ctx.fill();
  }

  if (stroke) {
    const { color, lineWidth, dash = [] } = stroke;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    // setLineDash does not support passing readonly arrays in ts!
    // safe assertion since setLineDash does not perform mutations
    ctx.setLineDash(dash as number[]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  ctx.restore();
};
