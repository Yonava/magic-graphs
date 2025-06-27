import { drawRectWithCtx } from '@shape/shapes/rect/draw';
import { loadImage } from './cache';
import type { ImageSchemaWithDefaults } from './defaults';

/**
 * checkerboard as placeholder for image that fails to load
 *
 * https://commons.wikimedia.org/wiki/File:Missing_texture_checkerboard_pattern.svg
 */
const drawMissingMediaCheckerboard = (
  width: number,
  height: number,
  ctx: CanvasRenderingContext2D
) => {
  const squareSize = 10;
  const startX = -width / 2;
  const startY = -height / 2;
  for (let y = 0; y < Math.ceil(height / squareSize); y++) {
    for (let x = 0; x < Math.ceil(width / squareSize); x++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? '#FF00DC' : '#000000';
      ctx.fillRect(
        startX + x * squareSize,
        startY + y * squareSize,
        squareSize,
        squareSize,
      );
    }
  }
}

export const drawImageWithCtx = (schema: ImageSchemaWithDefaults) => {
  const { src, onLoad, onLoadError, ...rect } = schema;

  const { width, height, at, rotation } = rect;

  return async (ctx: CanvasRenderingContext2D) => {
    const { image, error } = await loadImage(src, {
      onLoad,
      onLoadError,
    });

    drawRectWithCtx(rect)(ctx);

    ctx.save();

    const centerX = at.x + width / 2;
    const centerY = at.y + height / 2;

    ctx.translate(centerX, centerY);

    if (rotation) {
      ctx.rotate(rotation);
    }

    if (error) {
      drawMissingMediaCheckerboard(width, height, ctx)
    }

    if (image) {
      ctx.drawImage(image, -width / 2, -height / 2, width, height);
    }

    ctx.restore();
  };
};
