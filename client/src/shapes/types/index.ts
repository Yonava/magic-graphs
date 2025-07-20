// @typescript-eslint/no-unused-vars reports unused even if referenced in jsdoc
// eslint-disable-next-line
import type { ShapeFactoryWrapper } from '@shape/shapeWrapper';
import type { BoundingBox, Coordinate } from './utility';
import type { CrossSchema } from "@shape/shapes/cross/types";
import type { EllipseSchema } from "@shape/shapes/ellipse/types";
import type { ImageSchema } from "@shape/shapes/image/types";
import type { ScribbleSchema } from "@shape/shapes/scribble/types";
import type { StarSchema } from "@shape/shapes/star/types";
import type { TriangleSchema } from "@shape/shapes/triangle/types";
import type { ArrowSchema } from "@shapes/arrow/types";
import type { LineSchema } from "@shapes/line/types";
import type { RectSchema } from "@shapes/rect/types";
import type { SquareSchema } from "@shapes/square/types";
import type { UTurnSchema } from "@shapes/uturn/types";
import type { CircleSchema } from "@shapes/circle/types";
import type { StartTextAreaEdit } from '@shape/text/types';
import type { UnionToIntersection } from 'ts-essentials';

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
   * draws the text area by calling `drawTextAreaMatte` then `drawText`
   */
  drawTextArea: (ctx: CanvasRenderingContext2D) => void;
  /**
   * only draws the matte of the text area
   */
  drawTextAreaMatte: (ctx: CanvasRenderingContext2D) => void;
  /**
   * only draws the text content of the text area
   */
  drawText: (ctx: CanvasRenderingContext2D) => void;
  /**
   * returns true if the point is within the text area
   */
  textHitbox: (point: Coordinate) => boolean;
  /**
   * starts a text editing session.
   */
  startTextAreaEdit: StartTextAreaEdit;
}

export type ShapeProps = {
  /**
   * the name of the shape type, ie `"circle"`, `"line"`, etc
   */
  name: ShapeName;

  /**
   * draws the shape and the text area
   */
  draw: (ctx: CanvasRenderingContext2D) => void;

  /**
   * draws the shape without the text area
   */
  drawShape: (ctx: CanvasRenderingContext2D) => void;

  /**
   * returns true if the point is within the shape or text area
   */
  hitbox: (point: Coordinate) => boolean;

  /**
   * returns true if the point is within the shape, not including text area
   */
  shapeHitbox: (point: Coordinate) => boolean;

  /**
   * returns true if any part of the bounding box is within the shape, not including text area
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
   * returns the coordinates of the center of the shape's bounding box
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

export type ShapeNameToSchema = {
  arrow: ArrowSchema,
  circle: CircleSchema,
  cross: CrossSchema,
  ellipse: EllipseSchema,
  image: ImageSchema,
  line: LineSchema,
  rect: RectSchema,
  scribble: ScribbleSchema,
  square: SquareSchema,
  star: StarSchema,
  triangle: TriangleSchema,
  uturn: UTurnSchema,
}

export type EverySchemaProp = ShapeNameToSchema[keyof ShapeNameToSchema]
export type EverySchemaPropName = keyof UnionToIntersection<EverySchemaProp>

/**
 * all properties on the shape object as a runtime value
 */
export const shapeProps: Set<keyof Shape> = new Set([
  'drawTextAreaMatte',
  'drawText',
  'drawTextArea',
  'textHitbox',
  'startTextAreaEdit',
  'name',
  'draw',
  'drawShape',
  'hitbox',
  'shapeHitbox',
  'efficientHitbox',
  'getBoundingBox',
  'getCenterPoint',
])