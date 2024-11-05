import { TEXT_DEFAULTS } from "@shape/types";
import type { Coordinate } from "@shape/types";
import {
  drawTextWithTextArea,
  drawTextMatteWithTextArea,
  getFullTextArea,
  getTextAreaDimension
} from "@shape/text";
import { rotatePoint } from "@shape/helpers";
import { rectHitbox } from "@shape/rect/hitbox";
import { UTURN_DEFAULTS } from ".";
import type { UTurn } from ".";

export const getTextAreaLocationOnUTurn = (uturn: UTurn) => {
  const {
    at,
    upDistance,
    rotation,
    textArea,
    spacing,
  } = {
    ...UTURN_DEFAULTS,
    ...uturn
  };

  if (!textArea) throw new Error('no text area provided')

  const { text } = textArea

  const { fontSize } = {
    ...TEXT_DEFAULTS,
    ...text,
  }

  const endPoint = rotatePoint({
    x: at.x + upDistance + spacing,
    y: at.y
  }, at, rotation)

  return {
    x: endPoint.x - fontSize + Math.cos(rotation) * 15,
    y: endPoint.y - fontSize + Math.sin(rotation) * 15
  }
}

export const uturnTextHitbox = (uturn: UTurn) => {
  if (!uturn.textArea) return;

  const location = getTextAreaLocationOnUTurn(uturn);
  const fullTextArea = getFullTextArea(uturn.textArea, location);

  const { width, height } = getTextAreaDimension(fullTextArea);

  const isInTextHitbox = rectHitbox({
    at: fullTextArea.at,
    width,
    height
  })

  return (point: Coordinate) => isInTextHitbox(point);
}

export const drawTextAreaMatteOnUTurn = (uturn: UTurn) => {
  if (!uturn.textArea) return;

  const location = getTextAreaLocationOnUTurn(uturn);
  const fullTextArea = getFullTextArea(uturn.textArea, location);

  const drawMatte = drawTextMatteWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawMatte(ctx);
};


export const drawTextOnUTurn = (uturn: UTurn) => {
  if (!uturn.textArea) return;

  const location = getTextAreaLocationOnUTurn(uturn);
  const fullTextArea = getFullTextArea(uturn.textArea, location);

  const drawText = drawTextWithTextArea(fullTextArea);
  return (ctx: CanvasRenderingContext2D) => drawText(ctx);
}

export const drawTextAreaOnUTurn = (uturn: UTurn) => {
  const drawMatte = drawTextAreaMatteOnUTurn(uturn);
  const drawText = drawTextOnUTurn(uturn);

  if (!drawMatte || !drawText) return;

  return (ctx: CanvasRenderingContext2D) => {
    drawMatte(ctx);
    drawText(ctx);
  }
}