import type { RectSchema } from '@shape/shapes/rect';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { TextArea } from './schema';

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
export type Text = {
  content: string;
  fontSize?: number;
  fontWeight?: FontWeight;
  color?: string;
  fontFamily?: string;
};