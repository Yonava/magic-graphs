import { ELLIPSE_SCHEMA_DEFAULTS, type EllipseSchema } from '.';
import { TEXT_BLOCK_DEFAULTS } from '@shape/defaults/utility';

export const getTextAreaAnchorPoint = (ellipse: EllipseSchema) => {
  const { at, textArea } = { ...ELLIPSE_SCHEMA_DEFAULTS, ...ellipse };

  if (!textArea) return

  const { textBlock: text } = textArea;

  const { fontSize } = {
    ...TEXT_BLOCK_DEFAULTS,
    ...text,
  };

  return {
    x: at.x - fontSize,
    y: at.y - fontSize,
  };
};