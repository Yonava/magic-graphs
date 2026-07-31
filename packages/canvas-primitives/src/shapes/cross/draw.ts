import { toBorderRadiusArray } from '../../helpers.ts';
import { rect } from '../../shapes/rect/index.ts';
import type { CrossSchemaWithDefaults } from './defaults.ts';

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

  /*
    the three bars are built here rather than inside the draw below because
    nothing about them varies per call: they sit at fixed offsets from the
    cross's own origin and the transform is what moves them. the background
    pattern stamps a cross a few thousand times a frame, so a rect built per
    draw is a rect built per stamp
  */
  const drawVerticalTop = rect({
    at: { x: -halfLineWidth, y: -size / 2 },
    width: lineWidth,
    height: size / 2 - halfLineWidth,
    fillColor,
    borderRadius: [topLeft, topLeft, 0, 0],
  }).drawShape;

  const drawHorizontal = rect({
    at: { x: -size / 2, y: -halfLineWidth },
    width: size,
    height: lineWidth,
    fillColor,
    borderRadius: [bottomRight, topRight, topRight, bottomRight],
  }).drawShape;

  const drawVerticalBottom = rect({
    at: { x: -halfLineWidth, y: halfLineWidth },
    width: lineWidth,
    height: size / 2 - halfLineWidth,
    fillColor,
    borderRadius: [0, 0, bottomLeft, bottomLeft],
  }).drawShape;

  return (ctx: CanvasRenderingContext2D) => {
    ctx.save();

    ctx.translate(crossAt.x, crossAt.y);
    ctx.rotate(rotation);

    drawVerticalTop(ctx);
    drawHorizontal(ctx);
    drawVerticalBottom(ctx);

    ctx.restore();
  };
};
