import type { Coordinate } from "./utility";

export type Location = {
  /**
   * the point on a 2d canvas this item is placed
   */
  at: Coordinate
}

/**
 * a box that wraps some text without {@link Location}
 */
export type TextArea = {
  /**
   * the text areas inner text
   */
  text: Text;
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

export type TextAreaWithLocation = TextArea & Location

export type Stroke = {
  color: string;
  width: number;
  /**
   * for dashed border: [dashLength, gapLength]
   */
  dash?: [number, number];
};

export type GradientStop = {
  /**
   * between [0, 1) denoting the color of shape at that point
   * (ei color: green offset: 0.5 makes shape green at midpoint)
   */
  offset: number;
  /**
   * parsed by the tinycolor library
   */
  color: string;
};
