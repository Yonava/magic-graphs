import type { RectSchema } from '@shape/shapes/rect';
import { RECT_SCHEMA_DEFAULTS } from '.';
import { TEXT_BLOCK_DEFAULTS } from '@shape/defaults/utility';

export const getTextAreaAnchorPoint = (rect: RectSchema) => {
  const { at, width, height, textArea } = { ...RECT_SCHEMA_DEFAULTS, ...rect };

  if (!textArea) throw new Error('no text area provided');

  const { textBlock: text } = textArea;

  const { fontSize } = {
    ...TEXT_BLOCK_DEFAULTS,
    ...text,
  };

  const centerX = at.x + width / 2;
  const centerY = at.y + height / 2;

  return {
    x: centerX - fontSize,
    y: centerY - fontSize,
  };
};
