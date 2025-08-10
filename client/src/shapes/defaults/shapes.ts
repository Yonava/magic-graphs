import { resolveArrowDefaults } from '@shape/shapes/arrow/defaults';
import { resolveCircleDefaults } from '@shape/shapes/circle/defaults';
import { resolveCrossDefaults } from '@shape/shapes/cross/defaults';
import { resolveEllipseDefaults } from '@shape/shapes/ellipse/defaults';
import { resolveImageDefaults } from '@shape/shapes/image/defaults';
import { resolveLineDefaults } from '@shape/shapes/line/defaults';
import { resolveRectDefaults } from '@shape/shapes/rect/defaults';
import { resolveScribbleDefaults } from '@shape/shapes/scribble/defaults';
import { resolveSquareDefaults } from '@shape/shapes/square/defaults';
import { resolveStarDefaults } from '@shape/shapes/star/defaults';
import { resolveTriangleDefaults } from '@shape/shapes/triangle/defaults';
import { resolveUTurnDefaults } from '@shape/shapes/uturn/defaults';

export const getSchemaWithDefaults = {
  arrow: resolveArrowDefaults,
  circle: resolveCircleDefaults,
  cross: resolveCrossDefaults,
  ellipse: resolveEllipseDefaults,
  image: resolveImageDefaults,
  line: resolveLineDefaults,
  rect: resolveRectDefaults,
  scribble: resolveScribbleDefaults,
  square: resolveSquareDefaults,
  star: resolveStarDefaults,
  triangle: resolveTriangleDefaults,
  uturn: resolveUTurnDefaults,
} as const;

export type SchemaWithDefaults = {
  [K in keyof typeof getSchemaWithDefaults]: ReturnType<(typeof getSchemaWithDefaults)[K]>;
};

// type t = SchemaWithDefaults['arrow']
