import type { RectSchema } from '@shape/shapes/rect';
import {
  drawTextWithTextArea,
  drawTextMatteWithTextArea,
  getTextAreaDimension,
  getFullTextArea,
} from '@shape/text';
import { rectHitbox } from '@shape/shapes/rect/hitbox';
import { RECT_SCHEMA_DEFAULTS } from '.';
import { TEXT_BLOCK_DEFAULTS } from '@shape/defaults/utility';
import type { Coordinate } from '@shape/types/utility';

export const getTextAreaLocationOnRect = (rect: RectSchema) => {
  const { at, width, height, textArea } = { ...RECT_SCHEMA_DEFAULTS, ...rect };

  if (!textArea) throw new Error('no text area provided');

  const { textBlock: text } = textArea;

  const { fontSize } = {
    ...TEXT_BLOCK_DEFAULTS,
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
export const rectTextHitbox = (rect: RectSchema) => {
  if (!rect.textArea) return;

  const location = getTextAreaLocationOnRect(rect);
  const fullTextArea = getFullTextArea(rect.textArea, location);

  const { width, height } = getTextAreaDimension(fullTextArea.text);

  const isInTextHitbox = rectHitbox({
    at: fullTextArea.at,
    width,
    height,
  });

  return (point: Coordinate) => isInTextHitbox(point);
};

export const drawTextAreaMatteOnRect = (rect: RectSchema) => {
  if (!rect.textArea) return;

  const location = getTextAreaLocationOnRect(rect);
  const fullTextArea = getFullTextArea(rect.textArea, location);

  const drawMatte = drawTextMatteWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawMatte(ctx);
};

export const drawTextOnRect = (rect: RectSchema) => {
  if (!rect.textArea) return;

  const location = getTextAreaLocationOnRect(rect);
  const fullTextArea = getFullTextArea(rect.textArea, location);

  const drawText = drawTextWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawText(ctx);
};

export const drawTextAreaOnRect = (rect: RectSchema) => {
  const drawMatte = drawTextAreaMatteOnRect(rect);
  const drawText = drawTextOnRect(rect);

  if (!drawMatte || !drawText) return;

  return (ctx: CanvasRenderingContext2D) => {
    drawMatte(ctx);
    drawText(ctx);
  };
};
