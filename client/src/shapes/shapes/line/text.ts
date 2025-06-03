import { TEXT_DEFAULTS } from '@shape/types';
import type { Coordinate } from '@shape/types';
import type { LineSchema } from '@shape/shapes/line';
import {
  drawTextWithTextArea,
  drawTextMatteWithTextArea,
  getTextAreaDimension,
  getFullTextArea,
} from '@shape/text';
import { rectHitbox } from '@shape/shapes/rect/hitbox';
import { getAngle } from '@shape/helpers';
import { LINE_SCHEMA_DEFAULTS } from '.';

export const getTextAreaLocationOnLine = (line: LineSchema) => {
  const { textOffsetFromCenter, start, end, textArea } = {
    ...LINE_SCHEMA_DEFAULTS,
    ...line,
  };

  if (!textArea) throw new Error('no text area provided');

  const { text } = textArea;

  const { fontSize } = {
    ...TEXT_DEFAULTS,
    ...text,
  };

  const angle = getAngle(start, end);

  const offsetX = textOffsetFromCenter * Math.cos(angle);
  const offsetY = textOffsetFromCenter * Math.sin(angle);

  const textX = (start.x + end.x) / 2 + offsetX;
  const textY = (start.y + end.y) / 2 + offsetY;

  return {
    x: textX - fontSize,
    y: textY - fontSize,
  };
};

/**
 * @description checks if the point is in the text label of the line
 *
 * @param point - the point to check if it is in the line
 * @returns a function that checks if the point is in the line
 */
export const lineTextHitbox = (line: LineSchema) => {
  if (!line.textArea) return;

  const location = getTextAreaLocationOnLine(line);
  const fullTextArea = getFullTextArea(line.textArea, location);

  const { width, height } = getTextAreaDimension(fullTextArea.text);

  const isInTextHitbox = rectHitbox({
    at: fullTextArea.at,
    width,
    height,
  });

  return (point: Coordinate) => isInTextHitbox(point);
};

export const drawTextAreaMatteOnLine = (line: LineSchema) => {
  if (!line.textArea) return;

  const location = getTextAreaLocationOnLine(line);
  const fullTextArea = getFullTextArea(line.textArea, location);

  const drawMatte = drawTextMatteWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawMatte(ctx);
};

export const drawTextOnLine = (line: LineSchema) => {
  if (!line.textArea) return;

  const location = getTextAreaLocationOnLine(line);
  const fullTextArea = getFullTextArea(line.textArea, location);

  const drawText = drawTextWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawText(ctx);
};

export const drawTextAreaOnLine = (line: LineSchema) => {
  const drawMatte = drawTextAreaMatteOnLine(line);
  const drawText = drawTextOnLine(line);

  if (!drawMatte || !drawText) return;

  return (ctx: CanvasRenderingContext2D) => {
    drawMatte(ctx);
    drawText(ctx);
  };
};
