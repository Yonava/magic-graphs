import type { DeepRequired } from 'ts-essentials';
import { TEXT_DEFAULTS, TEXTAREA_DEFAULTS } from '@shape/types';
import type { Coordinate, TextArea, TextAreaNoLocation } from '@shape/types';
import { rect } from './rect';
import { useTextDimensionOnCanvas } from './useTextDimensionsOnCanvas';
import { useMemoize } from '@vueuse/core';

const { getTextDimensionsOnCanvas } = useTextDimensionOnCanvas();
export const HORIZONTAL_TEXT_PADDING = 20;

export const getTextAreaDimension = (textArea: DeepRequired<TextArea>) => {
  const paddingVertical = HORIZONTAL_TEXT_PADDING;

  const { width, height, ascent, descent } = useMemoize(() =>
    getTextDimensionsOnCanvas(textArea.text),
  )();

  return {
    width: Math.max(
      width + HORIZONTAL_TEXT_PADDING,
      textArea.text.fontSize * 2, // default is square background
    ),
    height: Math.max(
      height + paddingVertical,
      textArea.text.fontSize * 2, // will need to be extended if text wrap
    ),
    ascent,
    descent,
  };
};

export const drawTextMatteWithTextArea = (textArea: DeepRequired<TextArea>) => {
  const { color, at } = textArea;
  const { width, height } = getTextAreaDimension(textArea);
  const matte = rect({
    at,
    width,
    height,
    color,
  });
  return (ctx: CanvasRenderingContext2D) => matte.drawShape(ctx);
};

export const drawTextWithTextArea =
  (textArea: DeepRequired<TextArea>) => (ctx: CanvasRenderingContext2D) => {
    const { at } = textArea;
    const { content, fontSize, fontWeight, color, fontFamily } = textArea.text;

    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const { width, descent, height } = getTextAreaDimension({
      ...textArea,
      at,
    });

    ctx.fillText(content, at.x + width / 2, at.y + height / 2 + descent / 4);
  };

export const getFullTextArea = (
  textAreaInput: TextAreaNoLocation,
  at: Coordinate,
) => {
  const textArea = {
    ...TEXTAREA_DEFAULTS,
    ...textAreaInput,
  };

  const text = {
    ...TEXT_DEFAULTS,
    ...textArea.text,
  };

  const { width } = getTextAreaDimension({
    ...textArea,
    at,
  } as DeepRequired<TextArea>);

  const fullTextArea = {
    ...textArea,
    text,
    at: { x: at.x - width / 2 + text.fontSize, y: at.y },
  };

  return fullTextArea;
};
