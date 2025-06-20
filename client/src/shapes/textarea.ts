import type { DeepRequired } from 'ts-essentials';
import { rectHitbox } from './shapes/rect/hitbox';
import { HORIZONTAL_TEXT_PADDING } from './text';
import type { TextAreaWithAnchorPoint } from './types/utility';
import { getClientCoordinates } from '@canvas/coordinates';
import type { RectSchema } from './shapes/rect';
import { getTextDimensionsOnCanvas } from './useTextDimensionsOnCanvas';

export const engageTextarea = (
  ctx: CanvasRenderingContext2D,
  textArea: DeepRequired<TextAreaWithAnchorPoint>,
  handler: (str: string) => void,
) => {
  const { at, textBlock, activeColor: bgColor } = textArea;

  const { width, descent } = getTextDimensionsOnCanvas(textBlock);

  const { clientX, clientY, zoom } = getClientCoordinates(at, ctx)

  const { color: textColor, content, fontSize, fontWeight } = textBlock;

  const inputWidth = Math.round(
    Math.max(fontSize * 2, width + HORIZONTAL_TEXT_PADDING) * zoom,
  );
  const inputHeight = Math.round(fontSize * 2 * zoom);

  const input = document.createElement('textarea');

  input.style.position = 'absolute';
  input.style.left = `${clientX}px`;
  input.style.top = `${clientY}px`;
  input.style.width = `${Math.round(inputWidth)}px`;
  input.style.height = `${Math.round(inputHeight)}px`;
  input.style.zIndex = '1000';

  input.style.resize = 'none';

  input.style.overflow = 'hidden';
  input.style.border = 'none';

  input.style.padding = '0';
  input.style.margin = '0';

  input.style.paddingTop = `${Math.round(descent * zoom)}px`;

  input.style.fontSize = `${fontSize * zoom}px`;
  input.style.color = textColor;
  input.style.backgroundColor = bgColor;
  input.style.fontFamily = 'Arial';
  input.style.textAlign = 'center';
  input.style.fontWeight = fontWeight;
  input.style.outline = 'none';
  input.style.boxSizing = 'border-box';

  // no text wrapping
  input.style.whiteSpace = 'nowrap';

  input.value = content;

  const adjustSize = () => {
    const currentWidth = parseFloat(input.style.width);
    const newWidth = Math.max(input.scrollWidth, fontSize * 2);

    const deltaWidth = newWidth - currentWidth;
    input.style.left = `${parseFloat(input.style.left) - deltaWidth / 2}px`;

    input.style.width = `${newWidth}px`;
  };

  input.oninput = adjustSize;

  const isClickOutsideInput = (input: HTMLElement, event: MouseEvent) => {
    const { x, y, width, height } = input.getBoundingClientRect();

    const rect: RectSchema = {
      at: { x, y },
      width,
      height,
    };

    const { clientX, clientY } = event;
    return !rectHitbox(rect)({ x: clientX, y: clientY });
  };

  const removeInput = () => {
    input.onblur = null;
    handler(input.value);
    document.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('wheel', removeInput);

    setTimeout(() => {
      // setTimeout to allow canvas time to update
      input.remove();
    }, 50);
  };

  input.onblur = removeInput;

  input.onkeydown = (ev) => {
    ev.stopPropagation();
    if (ev.key === 'Enter') {
      ev.preventDefault();
      removeInput();
    }
  };

  const handleMouseDown = (event: MouseEvent) => {
    if (isClickOutsideInput(input, event)) removeInput();
  };

  document.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('wheel', removeInput, { passive: true });

  document.body.appendChild(input);
  setTimeout(() => {
    input.focus();
    input.setSelectionRange(0, input.value.length);
  }, 5);
};
