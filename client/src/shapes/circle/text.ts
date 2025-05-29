import { TEXT_DEFAULTS } from '@shape/types';
import type { Coordinate } from '@shape/types';
import type { CircleSchema } from '@shape/circle';
import {
  drawTextWithTextArea,
  drawTextMatteWithTextArea,
  getTextAreaDimension,
  getFullTextArea,
} from '@shape/text';
import { rectHitbox } from '@shape/rect/hitbox';
import { CIRCLE_SCHEMA_DEFAULTS } from '.';

export const getTextAreaLocationOnCircle = (circle: CircleSchema) => {
  const { at, textArea } = { ...CIRCLE_SCHEMA_DEFAULTS, ...circle };

  if (!textArea) throw new Error('no text area provided');

  const { text } = textArea;

  const { fontSize } = {
    ...TEXT_DEFAULTS,
    ...text,
  };

  return {
    x: at.x - fontSize,
    y: at.y - fontSize,
  };
};

/**
 * @description checks if the point is in the text label of the circle
 *
 * @param point - the point to check if it is in the circle
 * @returns a function that checks if the point is in the circle
 */
export const circleTextHitbox = (circle: CircleSchema) => {
  if (!circle.textArea) return;

  const location = getTextAreaLocationOnCircle(circle);
  const fullTextArea = getFullTextArea(circle.textArea, location);

  const { width, height } = getTextAreaDimension(fullTextArea);

  const isInTextHitbox = rectHitbox({
    at: fullTextArea.at,
    width,
    height,
  });

  return (point: Coordinate) => isInTextHitbox(point);
};

export const drawTextAreaMatteOnCircle = (circle: CircleSchema) => {
  if (!circle.textArea) return;

  const location = getTextAreaLocationOnCircle(circle);
  const fullTextArea = getFullTextArea(circle.textArea, location);

  const drawMatte = drawTextMatteWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawMatte(ctx);
};

export const drawTextOnCircle = (circle: CircleSchema) => {
  if (!circle.textArea) return;

  const location = getTextAreaLocationOnCircle(circle);
  const fullTextArea = getFullTextArea(circle.textArea, location);

  const drawText = drawTextWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawText(ctx);
};

export const drawTextAreaOnCircle = (circle: CircleSchema) => {
  const drawMatte = drawTextAreaMatteOnCircle(circle);
  const drawText = drawTextOnCircle(circle);

  if (!drawMatte || !drawText) return;

  return (ctx: CanvasRenderingContext2D) => {
    drawMatte(ctx);
    drawText(ctx);
  };
};
