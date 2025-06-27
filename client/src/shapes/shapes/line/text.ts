import { getAngle } from '@shape/helpers';
import type { LineSchemaWithDefaults } from './defaults';

export const getTextAreaAnchorPoint = (line: LineSchemaWithDefaults) => {
  if (!line.textArea) return

  const { textOffsetFromCenter, start, end } = line;

  const angle = getAngle(start, end);

  const offsetX = textOffsetFromCenter * Math.cos(angle);
  const offsetY = textOffsetFromCenter * Math.sin(angle);

  const x = (start.x + end.x) / 2 + offsetX;
  const y = (start.y + end.y) / 2 + offsetY;

  return { x, y };
};