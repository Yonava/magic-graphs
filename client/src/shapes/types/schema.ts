import type { Coordinate, GradientStop } from "./utility";

export type AnchorPoint = {
  /**
   * the point on a 2d canvas this item is placed
   */
  at: Coordinate
}

export type LineWidth = {
  /**
   * the visual thickness of the shape (in pixels)
   */
  lineWidth?: number
}

export type BackgroundColor = {
  /**
   * the background color of the shape
   */
  color?: string;
}

export type DashPattern = {
  /**
   * for dashed border: [dashLength, gapLength]
   */
  dash?: readonly [number, number];
}

export type Stroke = DashPattern & {
  color: string;
  lineWidth: number;
};

export type Rotation = {
  /**
   * the rotation of the shape (in radians)
   */
  rotation?: number
};

export type BorderRadius = {
  /**
   * the roundness of the shape's corners (in pixels)
   */
  borderRadius?: number;
}

export type BackgroundGradient = {
  /**
   * defines a fixed-position color gradient for the background
   * using a sequence of color stops
   */
  backgroundGradient?: readonly GradientStop[]
}