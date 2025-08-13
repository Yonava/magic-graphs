import { resolveArrowDefaults } from '../shapes/arrow/defaults';
import { resolveCircleDefaults } from '../shapes/circle/defaults';
import { resolveCrossDefaults } from '../shapes/cross/defaults';
import { resolveEllipseDefaults } from '../shapes/ellipse/defaults';
import { resolveImageDefaults } from '../shapes/image/defaults';
import { resolveLineDefaults } from '../shapes/line/defaults';
import { resolveRectDefaults } from '../shapes/rect/defaults';
import { resolveScribbleDefaults } from '../shapes/scribble/defaults';
import { resolveSquareDefaults } from '../shapes/square/defaults';
import { resolveStarDefaults } from '../shapes/star/defaults';
import { resolveTriangleDefaults } from '../shapes/triangle/defaults';
import { resolveUTurnDefaults } from '../shapes/uturn/defaults';

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
