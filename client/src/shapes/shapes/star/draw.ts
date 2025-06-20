import { STAR_SCHEMA_DEFAULTS } from './defaults';
import type { StarSchema } from './types';

export const drawStarWithCtx = (options: StarSchema) => {
  const { at, fillColor: color, innerRadius, outerRadius, rotation, points } = {
    ...STAR_SCHEMA_DEFAULTS,
    ...options,
  };

  if (points < 3) {
    throw new Error('star must have at least 3 points');
  }
  if (innerRadius >= outerRadius) {
    throw new Error('inner radius must be less than outer radius');
  }
  if (innerRadius < 0 || outerRadius < 0) {
    throw new Error('radius values must be positive');
  }

  return (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.beginPath();
    ctx.translate(at.x, at.y);
    ctx.rotate(rotation);

    // Draw the star shape
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  };
};
