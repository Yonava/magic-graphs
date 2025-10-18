import { toBorderRadiusArray } from '../../helpers';
import { rect } from '../../shapes/rect';

import type { CrossSchemaWithDefaults } from './defaults';

export const drawCrossWithCtx = (schema: CrossSchemaWithDefaults) => {
  const {
    at: crossAt,
    size,
    rotation,
    fillColor,
    lineWidth,
    borderRadius,
  } = schema;

  const halfLineWidth = lineWidth / 2;
  const [topLeft, topRight, bottomLeft, bottomRight] =
    toBorderRadiusArray(borderRadius);

  return (ctx: CanvasRenderingContext2D) => {
    ctx.save();

    ctx.translate(crossAt.x, crossAt.y);
    ctx.rotate(rotation);

    // vertical top
    rect({
      at: { x: -halfLineWidth, y: -size / 2 },
      width: lineWidth,
      height: size / 2 - halfLineWidth,
      fillColor,
      borderRadius: [topLeft, topLeft, 0, 0],
    }).drawShape(ctx);

    // horizontal
    rect({
      at: { x: -size / 2, y: -halfLineWidth },
      width: size,
      height: lineWidth,
      fillColor,
      borderRadius: [bottomRight, topRight, topRight, bottomRight],
    }).drawShape(ctx);

    // vertical bottom
    rect({
      at: { x: -halfLineWidth, y: halfLineWidth },
      width: lineWidth,
      height: size / 2 - halfLineWidth,
      fillColor,
      borderRadius: [0, 0, bottomLeft, bottomLeft],
    }).drawShape(ctx);

    ctx.restore();
  };
};
