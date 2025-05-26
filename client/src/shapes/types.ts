import type { RectSchema } from '@shape/rect';

export type BoundingBox = Pick<RectSchema, 'at' | 'width' | 'height'>;

export type BoundingBoxCorners = {
  topLeft: Coordinate;
  bottomRight: Coordinate;
};

export type ShapeName =
  | 'circle'
  | 'line'
  | 'square'
  | 'rect'
  | 'triangle'
  | 'arrow'
  | 'uturn'
  | 'cross'
  | 'scribble'
  | 'ellipse'
  | 'star'
  | 'image';

export type Shape = {
  /**
   * a unique identifier for the shape
   */
  id: string;

  /**
   * the name of the shape type, ie 'circle', 'line', etc
   */
  name: ShapeName;

  /**
   * draws the entire shape including text.
   * this is the default use case
   */
  draw: (ctx: CanvasRenderingContext2D) => void;

  /**
   * draws just the shape ignoring all text properties
   */
  drawShape: (ctx: CanvasRenderingContext2D) => void;

  /**
   * draws the text area of the shape (ie both matte and text)
   */
  drawTextArea?: (ctx: CanvasRenderingContext2D) => void;

  /**
   * only draws the matte of the text area
   */
  drawTextAreaMatte?: (ctx: CanvasRenderingContext2D) => void;

  /**
   * only draws the text content of the text area
   */
  drawText?: (ctx: CanvasRenderingContext2D) => void;

  /**
   * returns true if the point is within the shape or text area of the shape
   */
  hitbox: (point: Coordinate) => boolean;

  /**
   * returns true if the point is within the area of the shape
   */
  shapeHitbox: (point: Coordinate) => boolean;

  /**
   * returns true if the point is within the text area of the shape
   */
  textHitbox?: (point: Coordinate) => boolean;

  /**
   * returns true if the point is within the rectangular bounding box of the shape
   */
  efficientHitbox: (boxToCheck: BoundingBox) => boolean;

  /**
   * returns the coordinates of the top-left corner along with the width and height
   * of the area comprising the bounding box
   */
  getBoundingBox: () => BoundingBox;

  /**
   * activates the text area of the shape
   */
  activateTextArea?: (
    ctx: CanvasRenderingContext2D,
    handler: (str: string) => void,
  ) => void;
};

/**
 * a coordinate pair used to position
 * content on the canvas for rendering
 */
export type Coordinate = {
  x: number;
  y: number;
};

/**
 * an area that wraps some text without
 * canvas coordinates for rendering
 */
export type TextAreaNoLocation = {
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

export const TEXTAREA_DEFAULTS = {
  color: 'white',
  // TODO - make active color depend on the color of the text area
  activeColor: 'white',
} as const;

export type TextArea = {
  at: Coordinate;
} & TextAreaNoLocation;

/**
 * all font weights supported by html canvas
 */
export type TextFontWeight = 'lighter' | 'normal' | 'bold' | 'bolder';

/**
 * the text displayed in `TextArea`
 */
export type Text = {
  content: string;
  fontSize?: number;
  fontWeight?: TextFontWeight;
  color?: string;
  fontFamily?: string;
};

export const TEXT_DEFAULTS = {
  fontSize: 12,
  fontWeight: 'normal',
  color: 'black',
  fontFamily: 'Arial',
} as const;

export type Stroke = {
  color: string;
  width: number;
  /**
   * for dashed border: [dashLength, gapLength]
   */
  dash?: [number, number];
};

export const STROKE_DEFAULTS = {
  color: 'black',
  width: 0,
};

export type GradientStop = {
  offset: number;
  /**
   * parsed by the tinycolor library
   */
  color: string;
};

/**
 * the process all schemas go through to become shapes
 */
export type ShapeFactory<T> = (schema: T) => Shape