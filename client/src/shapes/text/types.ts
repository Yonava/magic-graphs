import type { AnchorPoint } from "@shape/types/schema";

/**
 * all font weights supported by html canvas
 */
export type FontWeight = 'lighter' | 'normal' | 'bold' | 'bolder';

/**
 * the text content for {@link TextArea}
 */
export type TextBlock = {
  content: string;
  fontSize?: number;
  fontWeight?: FontWeight;
  color?: string;
  fontFamily?: string;
};

/**
 * a box that wraps some text without an {@link AnchorPoint}
 */
export type TextArea = {
  /**
   * the text areas inner text
   */
  textBlock: TextBlock;
  /**
   * the color of the text area
   */
  color?: string;
  /**
   * the color of the text area when it is engaged
   * IE is converted to a textarea html element for user interaction
   */
  activeColor?: string;
};

export type TextAreaWithAnchorPoint = TextArea & AnchorPoint