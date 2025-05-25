import { drawRectWithCtx } from '@shape/rect/draw';
import { IMAGE_SCHEMA_DEFAULTS, type ImageSchema } from '.';
import { getOrLoadImage } from './cache';

export const drawImageWithCtx = (options: ImageSchema) => {
  const { src, onLoad, onLoadError, ...rectOptions } = {
    ...IMAGE_SCHEMA_DEFAULTS,
    ...options,
  };
  const { width, height, at, rotation } = rectOptions;

  return (ctx: CanvasRenderingContext2D) => {
    const { image, loading, error } = getOrLoadImage(src, {
      onLoad,
      onLoadError,
    });

    drawRectWithCtx(rectOptions)(ctx);

    ctx.save();
    // Translate to the center of the image for rotation and content
    const centerX = at.x + width / 2;
    const centerY = at.y + height / 2;
    ctx.translate(centerX, centerY);
    if (rotation) {
      ctx.rotate(rotation);
    }
    if (loading) {
      ctx.fillStyle = '#888888';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Loading...', 0, 0);
    } else if (error) {
      // Missing image checkerboard pattern
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
    } else if (image) {
      ctx.drawImage(image, -width / 2, -height / 2, width, height);
    }
    ctx.restore();
  };
};
