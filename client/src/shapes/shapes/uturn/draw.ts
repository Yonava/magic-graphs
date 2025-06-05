import { rotatePoint } from '@shape/helpers';
import { drawLineWithCtx } from '@shape/shapes/line/draw';
import { UTURN_SCHEMA_DEFAULTS } from '.';
import type { UTurnSchema } from '.';
import { drawArrowWithCtx } from '@shape/shapes/arrow/draw';
import { getColorAtPercentage } from '@shape/helpers';
import type { GradientStop } from '@shape/types/utility';

export const drawUTurnWithCtx = (options: UTurnSchema) => {
  const {
    spacing,
    at,
    upDistance,
    downDistance,
    rotation,
    lineWidth,
    color,
    arrowHeadShape,
    arrowHeadSize,
    gradientStops,
  } = {
    ...UTURN_SCHEMA_DEFAULTS,
    ...options,
  };

  const longLegFrom = rotatePoint(
    {
      x: at.x,
      y: at.y - spacing,
    },
    at,
    rotation,
  );

  const longLegTo = rotatePoint(
    {
      x: at.x + upDistance,
      y: at.y - spacing,
    },
    at,
    rotation,
  );

  const shortLegFrom = rotatePoint(
    {
      x: at.x + upDistance,
      y: at.y + spacing,
    },
    at,
    rotation,
  );

  const shortLegTo = rotatePoint(
    {
      x: at.x + upDistance - downDistance,
      y: at.y + spacing,
    },
    at,
    rotation,
  );

  const arcAt = rotatePoint(
    {
      x: at.x + upDistance,
      y: at.y,
    },
    at,
    rotation,
  );

  let lineGradient: GradientStop[] = [];
  let circleGradient: GradientStop[] = [];
  let arrowGradient: GradientStop[] = [];

  if (gradientStops.length >= 2) {
    const totalLength = upDistance + downDistance + Math.PI * spacing;

    const gradientColorAtCircleStart = getColorAtPercentage(
      gradientStops,
      upDistance / totalLength,
    );
    const gradientColorAtCircleEnd = getColorAtPercentage(
      gradientStops,
      (totalLength - downDistance) / totalLength,
    );

    lineGradient = [
      ...gradientStops.filter(
        (stop) => stop.offset <= upDistance / totalLength,
      ),
      { offset: 1, color: gradientColorAtCircleStart },
    ];

    circleGradient = [
      { offset: 0, color: gradientColorAtCircleStart },
      ...gradientStops
        .filter(
          (stop) =>
            stop.offset >= upDistance / totalLength &&
            stop.offset <= (totalLength - downDistance) / totalLength,
        )
        .map((stop) => ({
          offset:
            (stop.offset - upDistance / totalLength) /
            ((Math.PI * spacing) / totalLength),
          color: stop.color,
        })),
      { offset: 1.0, color: gradientColorAtCircleEnd },
    ];

    arrowGradient = [
      { offset: 0, color: gradientColorAtCircleEnd },
      ...gradientStops
        .filter(
          (stop) => stop.offset >= (totalLength - downDistance) / totalLength,
        )
        .map((stop) => ({
          offset:
            (stop.offset - (totalLength - downDistance) / totalLength) /
            (downDistance / totalLength),
          color: stop.color,
        })),
    ];
  }

  const drawLongShaft = drawLineWithCtx({
    start: longLegFrom,
    end: longLegTo,
    lineWidth: lineWidth,
    color,
    gradientStops: lineGradient,
  });

  const drawArrow = drawArrowWithCtx({
    start: shortLegFrom,
    end: shortLegTo,
    lineWidth: lineWidth,
    color,
    arrowHeadSize,
    arrowHeadShape,
    gradientStops: arrowGradient,
  });

  return (ctx: CanvasRenderingContext2D) => {
    drawLongShaft(ctx);
    drawArrow(ctx);

    // draw the part that uturns
    ctx.beginPath();
    ctx.strokeStyle = color;

    if (circleGradient.length >= 2) {
      const startAngle = Math.PI / 2 + rotation + 0.01;
      const endAngle = -Math.PI / 2 + rotation - 0.01;

      const endX = arcAt.x + Math.cos(startAngle) * spacing;
      const endY = arcAt.y + Math.sin(startAngle) * spacing;
      const startX = arcAt.x + Math.cos(endAngle) * spacing;
      const startY = arcAt.y + Math.sin(endAngle) * spacing;
      const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
      for (const stop of circleGradient) {
        gradient.addColorStop(stop.offset, stop.color);
      }
      ctx.strokeStyle = gradient;
    }

    // +0.01, -0.01 to overlap
    ctx.arc(
      arcAt.x,
      arcAt.y,
      spacing,
      Math.PI / 2 + rotation + 0.01,
      -Math.PI / 2 + rotation - 0.01,
      true,
    );
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  };
};
