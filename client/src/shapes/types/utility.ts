import type { RectSchema } from '@shape/shapes/rect';
import type { AnchorPoint } from './schema';

export type Coordinate = {
  x: number;
  y: number;
};

export type BoundingBox = Pick<RectSchema, 'at' | 'width' | 'height'>;

export type BoundingBoxCorners = {
  topLeft: Coordinate;
  bottomRight: Coordinate;
};

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

/**
 * for defining dashed borders
 */
export type DashPattern = readonly [dashLength: number, gapLength: number];

export type Stroke = {
  color: string;
  lineWidth: number;
  dash?: DashPattern;
};