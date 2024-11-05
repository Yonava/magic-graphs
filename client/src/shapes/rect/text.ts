import { TEXT_DEFAULTS } from "@shape/types";
import type { Coordinate } from "@shape/types";
import type { Rect } from "@shape/rect";
import {
  drawTextWithTextArea,
  drawTextMatteWithTextArea,
  getTextAreaDimension,
  getFullTextArea,
} from "@shape/text";
import { rectHitbox } from "@shape/rect/hitbox";
import { RECT_DEFAULTS } from ".";
import { rotatePoint } from "@shape/helpers";

export const getTextAreaLocationOnRect = (rect: Rect) => {
  const {
    at,
    width,
    height,
    textArea    
  } = { ...RECT_DEFAULTS, ...rect };

  if (!textArea) throw new Error("no text area provided");

  const { text } = textArea;

  const { fontSize } = {
    ...TEXT_DEFAULTS,
    ...text,
  };

  const centerX = at.x + width / 2;
  const centerY = at.y + height / 2;



  return {
    x: centerX - fontSize,
    y: centerY - fontSize,
  };
};

/**
 * @description checks if the point is in the text label of the rect
 *
 * @param point - the point to check if it is in the rect
 * @returns a function that checks if the point is in the rect
 */
export const rectTextHitbox = (rect: Rect) => {
  if (!rect.textArea) return;

  const location = getTextAreaLocationOnRect(rect);
  const fullTextArea = getFullTextArea(rect.textArea, location);

  const { width, height } = getTextAreaDimension(fullTextArea);

  const isInTextHitbox = rectHitbox({
    at: fullTextArea.at,
    width,
    height,
  });

  return (point: Coordinate) => isInTextHitbox(point);
};

export const drawTextAreaMatteOnRect = (rect: Rect) => {
  if (!rect.textArea) return;

  const location = getTextAreaLocationOnRect(rect);
  const fullTextArea = getFullTextArea(rect.textArea, location);

  const drawMatte = drawTextMatteWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawMatte(ctx);
};

export const drawTextOnRect = (rect: Rect) => {
  if (!rect.textArea) return;

  const location = getTextAreaLocationOnRect(rect);
  const fullTextArea = getFullTextArea(rect.textArea, location);

  const drawText = drawTextWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawText(ctx);
};

export const drawTextAreaOnRect = (rect: Rect) => {
  const drawMatte = drawTextAreaMatteOnRect(rect);
  const drawText = drawTextOnRect(rect);

  if (!drawMatte || !drawText) return;

  return (ctx: CanvasRenderingContext2D) => {
    drawMatte(ctx);
    drawText(ctx);
  };
};
