import {
  UTURN_ARROW_DEFAULTS,
  TEXT_DEFAULTS
} from "@shape/types";
import type { UTurnArrow } from "@shape/types";
import { rotatePoint } from "@shape/helpers";
import { drawTextArea } from './text';
import { drawLineWithCtx } from "./line";
import { drawTriangleWithCtx } from "./triangle";

export const drawUTurnArrowWithCtx = (ctx: CanvasRenderingContext2D) => (options: UTurnArrow) => {
  const {
    spacing,
    center,
    upDistance,
    downDistance,
    angle,
    lineWidth,
    color
  } = {
    ...UTURN_ARROW_DEFAULTS,
    ...options
  }

  const arrowHeadHeight = lineWidth * 1.4;
  const pLineLength = arrowHeadHeight;

  const longLegFrom = rotatePoint({ 
    x: center.x, 
    y: center.y - spacing 
  }, center, angle);

  const longLegTo = rotatePoint({ 
    x: center.x + upDistance, 
    y: center.y - spacing
  }, center, angle);

  const shortLegFrom = rotatePoint({ 
    x: center.x + upDistance, 
    y: center.y + spacing 
  }, center, angle);
  const shortLegTo = rotatePoint({ 
    x: center.x + upDistance - downDistance + arrowHeadHeight, 
    y: center.y + spacing 
  }, center, angle);

  const arcCenter = rotatePoint({ 
    x: center.x + upDistance, 
    y: center.y 
  }, center, angle);

  const epiCenter = {
    x: shortLegTo.x + pLineLength * Math.cos(angle),
    y: shortLegTo.y + pLineLength * Math.sin(angle),
  }

  const trianglePt1 = rotatePoint({ 
    x: center.x + upDistance - downDistance, 
    y: center.y + spacing 
  }, center, angle
  );

  const trianglePt2 = {
    x: epiCenter.x + pLineLength * Math.cos(angle + Math.PI / 2),
    y: epiCenter.y + pLineLength * Math.sin(angle + Math.PI / 2),
  }

  const trianglePt3 = {
    x: epiCenter.x - pLineLength * Math.cos(angle + Math.PI / 2),
    y: epiCenter.y - pLineLength * Math.sin(angle + Math.PI / 2),
  }

  const drawLine = drawLineWithCtx(ctx);
  const drawTriangle = drawTriangleWithCtx(ctx);

  drawTriangle({
    point1: trianglePt1,
    point2: trianglePt2,
    point3: trianglePt3,
    color
  })

  drawLine({
    start: longLegFrom,
    end: longLegTo,
    width: lineWidth,
    color
  })

  drawLine({
    start: shortLegFrom,
    end: shortLegTo,
    width: lineWidth,
    color
  })

  // draw the part that uturns
  ctx.beginPath();
  ctx.arc(arcCenter.x, arcCenter.y, spacing, Math.PI / 2 + angle + 0.05, -Math.PI / 2 + angle - 0.05, true);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.closePath();

  if (options.textArea) drawTextArea(ctx).uTurn(options);
}

export const getTextAreaLocationOnUTurnArrow = (uturn: UTurnArrow) => {

  const {
    center,
    upDistance,
    angle,
    textArea,
    spacing,
  } = {
    ...UTURN_ARROW_DEFAULTS,
    ...uturn
  };

  if (!textArea) return { x: 0, y: 0 }

  const { text } = textArea

  const { fontSize } = {
    ...TEXT_DEFAULTS,
    ...text,
  }

  const endPoint = rotatePoint({ x: center.x + upDistance + spacing , y: center.y }, center, angle)

  return {
    x: endPoint.x - fontSize,
    y: endPoint.y - fontSize
  }
}