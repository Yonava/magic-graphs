import {
  drawTextWithTextArea,
  drawTextMatteWithTextArea,
  getTextAreaDimension,
  getFullTextArea,
} from '@shape/text';
import { type Coordinate } from '@shape/types';
import { getTextAreaLocationOnLine } from '@shape/line/text';
import { rectHitbox } from '@shape/rect/hitbox';
import type { Arrow } from '.';

export const getTextAreaLocationOnArrow = (arrow: Arrow) => {
  const { textArea } = arrow;

  if (!textArea) throw new Error('no text area provided');

  return getTextAreaLocationOnLine(arrow);
};

export const arrowTextHitbox = (arrow: Arrow) => {
  if (!arrow.textArea) return;

  const location = getTextAreaLocationOnArrow(arrow);
  const fullTextArea = getFullTextArea(arrow.textArea, location);

  const { width, height } = getTextAreaDimension(fullTextArea);

  const isInText = rectHitbox({
    at: fullTextArea.at,
    width,
    height,
  });

  return (point: Coordinate) => isInText(point);
};

export const drawTextAreaMatteOnArrow = (arrow: Arrow) => {
  if (!arrow.textArea) return;

  const location = getTextAreaLocationOnArrow(arrow);
  const fullTextArea = getFullTextArea(arrow.textArea, location);

  const drawMatte = drawTextMatteWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawMatte(ctx);
};

export const drawTextOnArrow = (arrow: Arrow) => {
  if (!arrow.textArea) return;

  const location = getTextAreaLocationOnArrow(arrow);
  const fullTextArea = getFullTextArea(arrow.textArea, location);

  const drawText = drawTextWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawText(ctx);
};

export const drawTextAreaOnArrow = (arrow: Arrow) => {
  const drawMatte = drawTextAreaMatteOnArrow(arrow);
  const drawText = drawTextOnArrow(arrow);

  if (!drawMatte || !drawText) return;

  return (ctx: CanvasRenderingContext2D) => {
    drawMatte(ctx);
    drawText(ctx);
  };
};
