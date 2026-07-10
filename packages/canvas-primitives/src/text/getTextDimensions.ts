import { getCtx } from '@core/utils/ctx/index';

import type { TextBlock } from './types.ts';

export const getTextDimensions = (text: Required<TextBlock>) => {
  const { content, fontSize, fontWeight, fontFamily } = text;

  const canvas = document.createElement('canvas');
  const ctx = getCtx(canvas);

  canvas.width = 1;
  canvas.height = 1;

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

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
