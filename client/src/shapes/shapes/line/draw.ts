import type { LineSchemaWithDefaults } from "./defaults";

export const drawLineWithCtx = (
  schema: LineSchemaWithDefaults
) => (ctx: CanvasRenderingContext2D) => {
  const {
    start,
    end,
    lineWidth: width,
    fillColor: color,
    dash = [],
    fillGradient
  } = schema;

  if (width === 0) return;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.lineWidth = width;
  ctx.strokeStyle = color;

  if (fillGradient && fillGradient.length >= 2) {
    const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
    fillGradient.forEach(({ offset, color }) => {
      gradient.addColorStop(offset, color);
    });
    ctx.strokeStyle = gradient;
  }
  // setLineDash does not support passing readonly arrays in ts!
  // safe assertion since setLineDash does not perform mutations
  ctx.setLineDash(dash as number[]);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
};
