import type { TextArea, TextBlock } from "@shape/types/utility";
import type { DeepRequired } from "ts-essentials";

export const TEXTAREA_DEFAULTS = {
  color: 'white',
  activeColor: 'white',
} as const satisfies Omit<TextArea, 'textBlock'>

export const TEXT_BLOCK_DEFAULTS = {
  fontSize: 12,
  fontWeight: 'normal',
  color: 'black',
  fontFamily: 'Arial',
} as const satisfies Omit<TextBlock, 'content'>;

export const getTextAreaWithDefaults = (textArea: TextArea): DeepRequired<TextArea> => {
  const textBlockWithDefaults: Required<TextBlock> = {
    ...TEXT_BLOCK_DEFAULTS,
    ...textArea.textBlock,
  }

  const textAreaWithDefaults: DeepRequired<TextArea> = {
    textBlock: textBlockWithDefaults,
    color: textArea.color ?? TEXTAREA_DEFAULTS.color,
    activeColor: textArea.activeColor ?? TEXTAREA_DEFAULTS.activeColor,
  }

  return textAreaWithDefaults
}