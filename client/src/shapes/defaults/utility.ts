import type { TextArea, TextBlock } from "@shape/types/utility";

export const TEXTAREA_DEFAULTS = {
  color: 'white',
  // TODO - make default active color depend on the color of the text area
  activeColor: 'white',
} as const satisfies Omit<TextArea, 'textBlock'>

export const TEXT_BLOCK_DEFAULTS = {
  fontSize: 12,
  fontWeight: 'normal',
  color: 'black',
  fontFamily: 'Arial',
} as const satisfies Omit<TextBlock, 'content'>;