import type { BoundingBox, Coordinate } from "./utility";

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
   * the name of the shape type, ie `"circle"`, `"line"`, etc
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
 * the process all schemas go through to become shapes
 */
export type ShapeFactory<T> = (schema: T) => Shape