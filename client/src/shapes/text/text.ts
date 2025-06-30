import type { DeepRequired } from 'ts-essentials';
import { getTextDimensions } from './getTextDimensions';
import type { Coordinate } from '@shape/types/utility';
import type { ShapeTextProps } from '@shape/types';
import { createTextarea } from './createTextarea';
import { rect } from '@shape/shapes/rect';
import type { StartTextAreaEdit, TextAreaWithAnchorPoint, TextBlock } from './types';
import type { TextAreaWithDefaults } from './defaults';

export const HORIZONTAL_TEXT_PADDING = 20;

/**
 * if a text area is provided, will return ShapeTextProps, otherwise undefined
 */
type ShapeTextPropsGetter = (
  at?: Coordinate,
  textArea?: TextAreaWithDefaults,
) => ShapeTextProps | undefined;

export const getShapeTextProps: ShapeTextPropsGetter = (at, textArea) => {
  if (!at || !textArea) return

  const dimensions = getTextAreaDimension(textArea.textBlock);

  const placedTextArea = {
    ...textArea,
    at: {
      x: at.x - dimensions.width / 2,
      y: at.y - dimensions.height / 2
    }
  } as const satisfies TextAreaWithAnchorPoint

  const textAreaMatte = rect({
    at: placedTextArea.at,
    width: dimensions.width,
    height: dimensions.height,
    fillColor: placedTextArea.color,
  });

  const drawText = drawTextWithTextArea(placedTextArea, dimensions)

  const drawTextArea = (ctx: CanvasRenderingContext2D) => {
    textAreaMatte.draw(ctx)
    drawText(ctx)
  }

  const startTextAreaEdit: StartTextAreaEdit = (ctx, onTextAreaBlur) => {
    createTextarea(ctx, onTextAreaBlur, placedTextArea);
  };

  return {
    textHitbox: textAreaMatte.hitbox,
    drawTextAreaMatte: textAreaMatte.draw,
    drawText,
    drawTextArea,
    startTextAreaEdit,
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
