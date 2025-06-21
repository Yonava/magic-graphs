import { rotatePoint } from '@shape/helpers';
import type { UTurnSchema } from './types';
import { UTURN_SCHEMA_DEFAULTS } from './defaults';

export const getTextAreaAnchorPoint = (uturn: UTurnSchema) => {
  if (!uturn.textArea) return

  const { at, upDistance, rotation, spacing, lineWidth } = {
    ...UTURN_SCHEMA_DEFAULTS,
    ...uturn,
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
    x: endPoint.x + Math.cos(rotation) * 15,
    y: endPoint.y + Math.sin(rotation) * 15,
  };
};