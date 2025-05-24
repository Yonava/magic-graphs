import { TEXT_DEFAULTS } from '@shape/types';
import type { Coordinate } from '@shape/types';
import type { SquareSchema } from '@shape/square';
import {
  drawTextWithTextArea,
  drawTextMatteWithTextArea,
  getTextAreaDimension,
  getFullTextArea,
} from '@shape/text';
import { rectHitbox } from '@shape/rect/hitbox';

export const getTextAreaLocationOnSquare = (square: SquareSchema) => {
  const { at, size, textArea } = square;

  if (!textArea) throw new Error('no text area provided');

  const { text } = textArea;

  const { fontSize } = {
    ...TEXT_DEFAULTS,
    ...text,
  };

  const centerX = at.x + size / 2;
  const centerY = at.y + size / 2;

  return {
    x: centerX - fontSize,
    y: centerY - fontSize,
  };
};

/**
 * @description checks if the point is in the text label of the square
 *
 * @param point - the point to check if it is in the square
 * @returns a function that checks if the point is in the square
 */
export const squareTextHitbox = (square: SquareSchema) => {
  if (!square.textArea) return;

  const location = getTextAreaLocationOnSquare(square);
  const fullTextArea = getFullTextArea(square.textArea, location);

  const { width, height } = getTextAreaDimension(fullTextArea);

  const isInTextHitbox = rectHitbox({
    at: fullTextArea.at,
    width,
    height,
  });

  return (point: Coordinate) => isInTextHitbox(point);
};

export const drawTextAreaMatteOnSquare = (square: SquareSchema) => {
  if (!square.textArea) return;

  const location = getTextAreaLocationOnSquare(square);
  const fullTextArea = getFullTextArea(square.textArea, location);

  const drawMatte = drawTextMatteWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawMatte(ctx);
};

export const drawTextOnSquare = (square: SquareSchema) => {
  if (!square.textArea) return;

  const location = getTextAreaLocationOnSquare(square);
  const fullTextArea = getFullTextArea(square.textArea, location);

  const drawText = drawTextWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawText(ctx);
};

export const drawTextAreaOnSquare = (square: SquareSchema) => {
  const drawMatte = drawTextAreaMatteOnSquare(square);
  const drawText = drawTextOnSquare(square);

  if (!drawMatte || !drawText) return;

  return (ctx: CanvasRenderingContext2D) => {
    drawMatte(ctx);
    drawText(ctx);
  };
};
