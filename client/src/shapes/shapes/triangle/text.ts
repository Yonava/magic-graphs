import type { TriangleSchema } from '@shape/shapes/triangle';
import { TRIANGLE_SCHEMA_DEFAULTS } from '.';
import { TEXT_BLOCK_DEFAULTS } from '@shape/defaults/utility';

export const getTextAreaAnchorPoint = (triangle: TriangleSchema) => {
  const { pointA, pointB, pointC, textArea } = {
    ...TRIANGLE_SCHEMA_DEFAULTS,
    ...triangle,
  };

  if (!textArea) return

  const { textBlock: text } = textArea;

  const { fontSize } = {
    ...TEXT_BLOCK_DEFAULTS,
    ...text,
  };

  const centerX = (pointA.x + pointB.x + pointC.x) / 3;
  const centerY = (pointA.y + pointB.y + pointC.y) / 3;

  return {
    x: centerX - fontSize,
    y: centerY - fontSize,
  };
};