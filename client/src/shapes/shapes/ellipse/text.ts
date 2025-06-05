import {
  drawTextWithTextArea,
  drawTextMatteWithTextArea,
  getTextAreaDimension,
  getFullTextArea,
} from '@shape/text';
import { rectHitbox } from '@shape/shapes/rect/hitbox';
import { ELLIPSE_SCHEMA_DEFAULTS, type EllipseSchema } from '.';
import { TEXT_DEFAULTS } from '@shape/defaults';
import type { Coordinate } from '@shape/types/utility';

export const getTextAreaLocationOnEllipse = (ellipse: EllipseSchema) => {
  const { at, textArea } = { ...ELLIPSE_SCHEMA_DEFAULTS, ...ellipse };

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
 * if the point is in the text label of the ellipse
 *
 * @param point - the point to check if it is in the ellipse
 * @returns a function that checks if the point is in the ellipse
 */
export const ellipseTextHitbox = (ellipse: EllipseSchema) => {
  if (!ellipse.textArea) return;

  const location = getTextAreaLocationOnEllipse(ellipse);
  const fullTextArea = getFullTextArea(ellipse.textArea, location);

  const { width, height } = getTextAreaDimension(fullTextArea.text);

  const isInTextHitbox = rectHitbox({
    at: fullTextArea.at,
    width,
    height,
  });

  return (point: Coordinate) => isInTextHitbox(point);
};

export const drawTextAreaMatteOnEllipse = (ellipse: EllipseSchema) => {
  if (!ellipse.textArea) return;

  const location = getTextAreaLocationOnEllipse(ellipse);
  const fullTextArea = getFullTextArea(ellipse.textArea, location);

  const drawMatte = drawTextMatteWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawMatte(ctx);
};

export const drawTextOnEllipse = (ellipse: EllipseSchema) => {
  if (!ellipse.textArea) return;

  const location = getTextAreaLocationOnEllipse(ellipse);
  const fullTextArea = getFullTextArea(ellipse.textArea, location);

  const drawText = drawTextWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawText(ctx);
};

export const drawTextAreaOnEllipse = (ellipse: EllipseSchema) => {
  const drawMatte = drawTextAreaMatteOnEllipse(ellipse);
  const drawText = drawTextOnEllipse(ellipse);

  if (!drawMatte || !drawText) return;

  return (ctx: CanvasRenderingContext2D) => {
    drawMatte(ctx);
    drawText(ctx);
  };
};
