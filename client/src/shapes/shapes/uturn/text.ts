import { rotatePoint } from '@shape/helpers';
import { UTURN_SCHEMA_DEFAULTS } from '.';
import type { UTurnSchema } from '.';
import { TEXT_BLOCK_DEFAULTS } from '@shape/defaults/utility';

export const getTextAreaAnchorPoint = (uturn: UTurnSchema) => {
  const { at, upDistance, rotation, textArea, spacing, lineWidth } = {
    ...UTURN_SCHEMA_DEFAULTS,
    ...uturn,
  };

  if (!textArea) return

  const { textBlock: text } = textArea;

  const { fontSize } = {
    ...TEXT_BLOCK_DEFAULTS,
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