import type {
  Coordinate,
  GradientStop,
  Stroke as StrokeDefinition,
  TextArea as TextAreaDefinition,
} from "./utility";

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

export type Stroke = {
  /**
   * the border around the shape
   */
  stroke?: StrokeDefinition
}

export type TextArea = {
  /**
   * the text of the shape
   */
  textArea?: TextAreaDefinition
}

export type BackgroundColor = {
  /**
   * the background color of the shape
   */
  color?: string;
}

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