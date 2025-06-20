import type { DeepRequired } from 'ts-essentials';
import { TEXT_BLOCK_DEFAULTS, TEXTAREA_DEFAULTS } from '@shape/defaults/utility';
import { rect } from './shapes/rect';
import type { Coordinate, TextArea, TextAreaWithAnchorPoint, TextBlock } from './types/utility';
import { getTextDimensionsOnCanvas } from './useTextDimensionsOnCanvas';

export const HORIZONTAL_TEXT_PADDING = 20;

export const getTextAreaDimension = (text: Required<TextBlock>) => {
  const paddingVertical = HORIZONTAL_TEXT_PADDING;

  const { width, height, ascent, descent } = getTextDimensionsOnCanvas(text)

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

export const drawTextMatteWithTextArea = (textArea: DeepRequired<TextAreaWithAnchorPoint>) => {
  const { color, at } = textArea;
  const { width, height } = getTextAreaDimension(textArea.textBlock);
  const matte = rect({
    at,
    width,
    height,
    fillColor: color,
  });
  return (ctx: CanvasRenderingContext2D) => matte.drawShape(ctx);
};

export const drawTextWithTextArea =
  (textArea: DeepRequired<TextAreaWithAnchorPoint>) => (ctx: CanvasRenderingContext2D) => {
    const { at, textBlock } = textArea;
    const { content, fontSize, fontWeight, color, fontFamily } = textBlock;

    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const { width, descent, height } = getTextAreaDimension(textBlock);

    ctx.fillText(content, at.x + width / 2, at.y + height / 2 + descent / 4);
  };

export const getFullTextArea = (
  unplacedTextArea: TextArea,
  at: Coordinate,
): DeepRequired<TextAreaWithAnchorPoint> => {
  const textAreaNoLocWithDefaults: Required<TextArea> = {
    ...TEXTAREA_DEFAULTS,
    ...unplacedTextArea,
  };

  const textWithDefaults: Required<TextBlock> = {
    ...TEXT_BLOCK_DEFAULTS,
    ...textAreaNoLocWithDefaults.textBlock,
  };

  const { width } = getTextAreaDimension(textWithDefaults);

  const fullTextArea: DeepRequired<TextAreaWithAnchorPoint> = {
    ...textAreaNoLocWithDefaults,
    textBlock: textWithDefaults,
    at: { x: at.x - width / 2 + textWithDefaults.fontSize, y: at.y },
  };

  return fullTextArea;
};
