import type { RectSchema } from '@shape/shapes/rect';

export const getTextAreaAnchorPoint = (rect: RectSchema) => {
  if (!rect.textArea) return

  const { at, width, height } = rect

  const centerX = at.x + width / 2;
  const centerY = at.y + height / 2;

  return {
    x: centerX,
    y: centerY,
  };
};
