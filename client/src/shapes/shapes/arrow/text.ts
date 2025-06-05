import {
  drawTextWithTextArea,
  drawTextMatteWithTextArea,
  getTextAreaDimension,
  getFullTextArea,
} from '@shape/text';
import type { Coordinate } from '@shape/types/utility';
import { getTextAreaLocationOnLine } from '@shape/shapes/line/text';
import { rectHitbox } from '@shape/shapes/rect/hitbox';
import type { ArrowSchema } from '.';

export const getTextAreaLocationOnArrow = (arrow: ArrowSchema) => {
  const { textArea } = arrow;

  if (!textArea) throw new Error('no text area provided');

  return getTextAreaLocationOnLine(arrow);
};

export const arrowTextHitbox = (arrow: ArrowSchema) => {
  if (!arrow.textArea) return;

  const location = getTextAreaLocationOnArrow(arrow);
  const fullTextArea = getFullTextArea(arrow.textArea, location);

  const { width, height } = getTextAreaDimension(fullTextArea.text);

  const isInText = rectHitbox({
    at: fullTextArea.at,
    width,
    height,
  });

  return (point: Coordinate) => isInText(point);
};

export const drawTextAreaMatteOnArrow = (arrow: ArrowSchema) => {
  if (!arrow.textArea) return;

  const location = getTextAreaLocationOnArrow(arrow);
  const fullTextArea = getFullTextArea(arrow.textArea, location);

  const drawMatte = drawTextMatteWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawMatte(ctx);
};

export const drawTextOnArrow = (arrow: ArrowSchema) => {
  if (!arrow.textArea) return;

  const location = getTextAreaLocationOnArrow(arrow);
  const fullTextArea = getFullTextArea(arrow.textArea, location);

  const drawText = drawTextWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawText(ctx);
};

export const drawTextAreaOnArrow = (arrow: ArrowSchema) => {
  const drawMatte = drawTextAreaMatteOnArrow(arrow);
  const drawText = drawTextOnArrow(arrow);

  if (!drawMatte || !drawText) return;

  return (ctx: CanvasRenderingContext2D) => {
    drawMatte(ctx);
    drawText(ctx);
  };
};
