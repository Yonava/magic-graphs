import type { DeepRequired } from 'ts-essentials';
import { TEXT_BLOCK_DEFAULTS, TEXTAREA_DEFAULTS } from '@shape/defaults/utility';
import { getTextDimensions } from './getTextDimensions';
import type { Coordinate, TextArea, TextAreaWithAnchorPoint, TextBlock } from '@shape/types/utility';
import { rectHitbox } from '@shape/shapes/rect/hitbox';
import type { ShapeTextProps } from '@shape/types';
import { engageTextarea } from './textarea';
import { rect } from '@shape/shapes/rect';

export const HORIZONTAL_TEXT_PADDING = 20;

/**
 * if a text area is provided, will return ShapeTextProps, otherwise undefined
 */
type ShapeTextPropsGetter = (at?: Coordinate, textArea?: TextArea) => ShapeTextProps | undefined

export const getShapeTextProps: ShapeTextPropsGetter = (at, textArea) => {
  if (!at || !textArea) return

  const textBlockWithDefaults: Required<TextBlock> = {
    ...TEXT_BLOCK_DEFAULTS,
    ...textArea.textBlock,
  }

  const textAreaWithDefaults: DeepRequired<TextAreaWithAnchorPoint> = {
    at,
    textBlock: textBlockWithDefaults,
    color: textArea.color ?? TEXTAREA_DEFAULTS.color,
    activeColor: textArea.activeColor ?? TEXTAREA_DEFAULTS.activeColor,
  }

  const { width, height } = getTextAreaDimension(textBlockWithDefaults);

  const textHitbox = rectHitbox({
    at,
    width,
    height,
  });

  const drawTextAreaMatte = drawTextMatteWithTextArea(textAreaWithDefaults);
  const drawText = drawTextWithTextArea(textAreaWithDefaults)

  const drawTextArea = (ctx: CanvasRenderingContext2D) => {
    drawTextAreaMatte(ctx)
    drawText(ctx)
  }

  const activateTextArea = (
    ctx: CanvasRenderingContext2D,
    handler: (str: string) => void,
  ) => {
    engageTextarea(ctx, textAreaWithDefaults, handler);
  };

  return {
    textHitbox,
    drawTextAreaMatte,
    drawText,
    drawTextArea,
    activateTextArea,
  }
}

export const getTextAreaDimension = (text: Required<TextBlock>) => {
  const paddingVertical = HORIZONTAL_TEXT_PADDING;

  const { width, height, ascent, descent } = getTextDimensions(text)

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
