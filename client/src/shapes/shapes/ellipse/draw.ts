import type { EllipseSchemaWithDefaults } from "./defaults";

export const drawEllipseWithCtx = (
  schema: EllipseSchemaWithDefaults
) => (ctx: CanvasRenderingContext2D) => {
  const {
    at,
    radiusX,
    radiusY,
    fillColor: color,
    stroke
  } = schema;

  ctx.beginPath();
  ctx.ellipse(at.x, at.y, radiusX, radiusY, 0, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();

  if (stroke) {
    const { color, lineWidth: width, dash = [] } = stroke;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    // setLineDash does not support passing readonly arrays in ts!
    // safe assertion since setLineDash does not perform mutations
    ctx.setLineDash(dash as number[]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  ctx.closePath();
};
