import { TEXT_BLOCK_DEFAULTS } from '@shape/defaults/utility';
import type { TextBlock } from '@shape/types/utility';
import { getCtx } from '@utils/ctx';

const canvas = document.createElement('canvas');
const ctx = getCtx(canvas);

canvas.width = 1;
canvas.height = 1;

ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

export const getTextDimensionsOnCanvas = (text: TextBlock) => {
  const { content, fontSize, fontWeight, fontFamily } = {
    ...TEXT_BLOCK_DEFAULTS,
    ...text,
  };

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const metrics = ctx.measureText(content);

  const ascent = metrics.actualBoundingBoxAscent;
  const descent = metrics.actualBoundingBoxDescent;
  const height = ascent + descent;

  return {
    width: metrics.width,
    height,
    ascent,
    descent,
  };
};
