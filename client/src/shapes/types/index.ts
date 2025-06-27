// @typescript-eslint/no-unused-vars reports unused even if referenced in jsdoc
// eslint-disable-next-line
import type { ShapeFactoryWrapper } from '@shape/shapeWrapper';
import type { BoundingBox, Coordinate } from './utility';
import type { ObjectKeysToTuple } from '@utils/types';

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

/**
 * interface for shapes that support text areas
 */
export type ShapeTextProps = {
  /**
   * only draws the matte of the text area
   */
  drawTextAreaMatte: (ctx: CanvasRenderingContext2D) => void;
  /**
   * only draws the text content of the text area
   */
  drawText: (ctx: CanvasRenderingContext2D) => void;
  /**
   * draws the text area (ie both matte and text)
   */
  drawTextArea: (ctx: CanvasRenderingContext2D) => void;
  /**
   * returns true if the point is within the text area
   */
  textHitbox: (point: Coordinate) => boolean;
  /**
   * activates the text area of the shape
   */
  activateTextArea: (
    ctx: CanvasRenderingContext2D,
    handler: (str: string) => void,
  ) => void;
}

export type ShapeProps = {
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
   * returns true if the point is within the shape or text area of the shape
   */
  hitbox: (point: Coordinate) => boolean;

  /**
   * returns true if the point is within the area of the shape
   */
  shapeHitbox: (point: Coordinate) => boolean;

  /**
   * returns true if the point is within the rectangular bounding box of the shape
   */
  efficientHitbox: (boxToCheck: BoundingBox) => boolean;

  /**
   * returns the coordinates of the top-left corner along with the width and height
   * of the area comprising the bounding box
   */
  getBoundingBox: () => BoundingBox;
} & Partial<ShapeTextProps>;

/**
 * props added to every shape in {@link ShapeFactoryWrapper}
 */
export type ShapeWrapperProps = {
  /**
   * returns the coordinates of the center point of the shape's bounding box
   */
  getCenterPoint: () => Coordinate;
};

export type Shape = ShapeProps & ShapeWrapperProps;

/**
 * the process all schemas go through to become shapes
 */
export type ShapeFactory<T> = (schema: T) => Shape;

export type SchemaId = string

export type WithId<T> = T & {
  /**
   * a unique id to track this shape
   */
  id: SchemaId
}

/**
 * every {@link Shape} prop as an array of runtime strings
 */
export const shapeProps: ObjectKeysToTuple<Shape> = [
  'drawTextAreaMatte',
  'drawText',
  'drawTextArea',
  'textHitbox',
  'activateTextArea',
  'name',
  'draw',
  'drawShape',
  'hitbox',
  'shapeHitbox',
  'efficientHitbox',
  'getBoundingBox',
  'getCenterPoint',
]