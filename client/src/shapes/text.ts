import type { DeepRequired } from 'ts-essentials';
import { TEXT_DEFAULTS, TEXTAREA_DEFAULTS } from '@shape/types';
import type { Coordinate, Text, TextArea, TextAreaNoLocation } from '@shape/types';
import { rect } from './shapes/rect';
import { useTextDimensionOnCanvas } from './useTextDimensionsOnCanvas';
import { useMemoize } from '@vueuse/core';

const { getTextDimensionsOnCanvas } = useTextDimensionOnCanvas();
export const HORIZONTAL_TEXT_PADDING = 20;

export const getTextAreaDimension = (text: Required<Text>) => {
  const paddingVertical = HORIZONTAL_TEXT_PADDING;

  const { width, height, ascent, descent } = useMemoize(() =>
    getTextDimensionsOnCanvas(text),
  )();

  return {
    width: Math.max(
      width + HORIZONTAL_TEXT_PADDING,
      text.fontSize * 2, // default is square background
    ),
    height: Math.max(
      height + paddingVertical,
      text.fontSize * 2, // will need to be extended if text wrap
    ),
    ascent,
    descent,
  };
};

export const drawTextMatteWithTextArea = (textArea: DeepRequired<TextArea>) => {
  const { color, at } = textArea;
  const { width, height } = getTextAreaDimension(textArea.text);
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
    const { at, text } = textArea;
    const { content, fontSize, fontWeight, color, fontFamily } = text;

    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const { width, descent, height } = getTextAreaDimension(text);

    ctx.fillText(content, at.x + width / 2, at.y + height / 2 + descent / 4);
  };

export const getFullTextArea = (
  textAreaNoLocation: TextAreaNoLocation,
  at: Coordinate,
): DeepRequired<TextArea> => {
  const textAreaNoLocWithDefaults: Required<TextAreaNoLocation> = {
    ...TEXTAREA_DEFAULTS,
    ...textAreaNoLocation,
  };

  const textWithDefaults: Required<Text> = {
    ...TEXT_DEFAULTS,
    ...textAreaNoLocWithDefaults.text,
  };

  const { width } = getTextAreaDimension(textWithDefaults);

  const fullTextArea = {
    ...textAreaNoLocWithDefaults,
    text: textWithDefaults,
    at: { x: at.x - width / 2 + textWithDefaults.fontSize, y: at.y },
  };

  return fullTextArea;
};
