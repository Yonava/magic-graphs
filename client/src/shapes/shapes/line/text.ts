import type { LineSchema } from '@shape/shapes/line';
import { getAngle } from '@shape/helpers';
import { LINE_SCHEMA_DEFAULTS } from '.';
import { TEXT_BLOCK_DEFAULTS } from '@shape/defaults/utility';

export const getTextAreaAnchorPoint = (line: LineSchema) => {
  const { textOffsetFromCenter, start, end, textArea } = {
    ...LINE_SCHEMA_DEFAULTS,
    ...line,
  };

  if (!textArea) return

  const { textBlock: text } = textArea;

  const { fontSize } = {
    ...TEXT_BLOCK_DEFAULTS,
    ...text,
  };

  const angle = getAngle(start, end);

  const offsetX = textOffsetFromCenter * Math.cos(angle);
  const offsetY = textOffsetFromCenter * Math.sin(angle);

  const textX = (start.x + end.x) / 2 + offsetX;
  const textY = (start.y + end.y) / 2 + offsetY;

  return {
    x: textX - fontSize,
    y: textY - fontSize,
  };
};