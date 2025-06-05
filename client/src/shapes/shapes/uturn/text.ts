import {
  drawTextWithTextArea,
  drawTextMatteWithTextArea,
  getFullTextArea,
  getTextAreaDimension,
} from '@shape/text';
import { rotatePoint } from '@shape/helpers';
import { rectHitbox } from '@shape/shapes/rect/hitbox';
import { UTURN_SCHEMA_DEFAULTS } from '.';
import type { UTurnSchema } from '.';
import { TEXT_DEFAULTS } from '@shape/defaults';
import type { Coordinate } from '@shape/types/utility';

export const getTextAreaLocationOnUTurn = (uturn: UTurnSchema) => {
  const { at, upDistance, rotation, textArea, spacing, lineWidth } = {
    ...UTURN_SCHEMA_DEFAULTS,
    ...uturn,
  };

  if (!textArea) throw new Error('no text area provided');

  const { text } = textArea;

  const { fontSize } = {
    ...TEXT_DEFAULTS,
    ...text,
  };

  const endPoint = rotatePoint(
    {
      x: at.x + upDistance + spacing + lineWidth / 2,
      y: at.y,
    },
    at,
    rotation,
  );

  return {
    x: endPoint.x - fontSize + Math.cos(rotation) * 15,
    y: endPoint.y - fontSize + Math.sin(rotation) * 15,
  };
};

export const uturnTextHitbox = (uturn: UTurnSchema) => {
  if (!uturn.textArea) return;

  const location = getTextAreaLocationOnUTurn(uturn);
  const fullTextArea = getFullTextArea(uturn.textArea, location);

  const { width, height } = getTextAreaDimension(fullTextArea.text);

  const isInTextHitbox = rectHitbox({
    at: fullTextArea.at,
    width,
    height,
  });

  return (point: Coordinate) => isInTextHitbox(point);
};

export const drawTextAreaMatteOnUTurn = (uturn: UTurnSchema) => {
  if (!uturn.textArea) return;

  const location = getTextAreaLocationOnUTurn(uturn);
  const fullTextArea = getFullTextArea(uturn.textArea, location);

  const drawMatte = drawTextMatteWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawMatte(ctx);
};

export const drawTextOnUTurn = (uturn: UTurnSchema) => {
  if (!uturn.textArea) return;

  const location = getTextAreaLocationOnUTurn(uturn);
  const fullTextArea = getFullTextArea(uturn.textArea, location);

  const drawText = drawTextWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawText(ctx);
};

export const drawTextAreaOnUTurn = (uturn: UTurnSchema) => {
  const drawMatte = drawTextAreaMatteOnUTurn(uturn);
  const drawText = drawTextOnUTurn(uturn);

  if (!drawMatte || !drawText) return;

  return (ctx: CanvasRenderingContext2D) => {
    drawMatte(ctx);
    drawText(ctx);
  };
};
