import { getAngle } from '@shape/helpers';
import { LINE_SCHEMA_DEFAULTS } from './defaults';
import type { LineSchema } from './types';

export const getTextAreaAnchorPoint = (line: LineSchema) => {
  if (!line.textArea) return

  const { textOffsetFromCenter, start, end } = {
    ...LINE_SCHEMA_DEFAULTS,
    ...line,
  };

  const angle = getAngle(start, end);

  const offsetX = textOffsetFromCenter * Math.cos(angle);
  const offsetY = textOffsetFromCenter * Math.sin(angle);

  const textX = (start.x + end.x) / 2 + offsetX;
  const textY = (start.y + end.y) / 2 + offsetY;

  return {
    x: textX,
    y: textY,
  };
};