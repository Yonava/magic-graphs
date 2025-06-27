import { rotatePoint } from '@shape/helpers';
import type { UTurnSchemaWithDefaults } from './defaults';

export const getTextAreaAnchorPoint = (uturn: UTurnSchemaWithDefaults) => {
  if (!uturn.textArea) return

  const { at, upDistance, rotation, spacing, lineWidth } = uturn;

  const endPoint = rotatePoint(
    {
      x: at.x + upDistance + spacing + lineWidth / 2,
      y: at.y,
    },
    at,
    rotation,
  );

  return {
    x: endPoint.x + Math.cos(rotation) * 15,
    y: endPoint.y + Math.sin(rotation) * 15,
  };
};