import type { DeepRequired } from 'ts-essentials';
import { TEXT_BLOCK_DEFAULTS, TEXTAREA_DEFAULTS } from '@shape/defaults/utility';
import { getTextDimensions } from './getTextDimensions';
import type { Coordinate, TextArea, TextAreaWithAnchorPoint, TextBlock } from '@shape/types/utility';
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

  const dimensions = getTextAreaDimension(textBlockWithDefaults);

  const textAreaWithDefaults: DeepRequired<TextAreaWithAnchorPoint> = {
    at: {
      x: at.x - dimensions.width / 2,
      y: at.y - dimensions.height / 2
    },
    textBlock: textBlockWithDefaults,
    color: textArea.color ?? TEXTAREA_DEFAULTS.color,
    activeColor: textArea.activeColor ?? TEXTAREA_DEFAULTS.activeColor,
  }

  const textAreaMatte = rect({
    at: textAreaWithDefaults.at,
    width: dimensions.width,
    height: dimensions.height,
    fillColor: textAreaWithDefaults.color,
  });

  const drawText = drawTextWithTextArea(textAreaWithDefaults, dimensions)

  const drawTextArea = (ctx: CanvasRenderingContext2D) => {
    textAreaMatte.draw(ctx)
    drawText(ctx)
  }

  const activateTextArea = (
    ctx: CanvasRenderingContext2D,
    handler: (str: string) => void,
  ) => {
    engageTextarea(ctx, textAreaWithDefaults, handler);
  };

  return {
    textHitbox: textAreaMatte.hitbox,
    drawTextAreaMatte: textAreaMatte.draw,
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

export const drawTextWithTextArea = (
  textArea: DeepRequired<TextAreaWithAnchorPoint>,
  textAreaDimensions: ReturnType<typeof getTextAreaDimension>
) => (ctx: CanvasRenderingContext2D) => {
  const { at, textBlock } = textArea;
  const { content, fontSize, fontWeight, color, fontFamily } = textBlock;

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const { width, descent, height } = textAreaDimensions

  ctx.fillText(content, at.x + width / 2, at.y + height / 2 + descent / 4);
};
