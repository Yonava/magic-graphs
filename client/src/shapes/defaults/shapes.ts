import { resolveCircleDefaults } from "@shape/shapes/circle/defaults"
import { resolveUTurnDefaults } from "@shape/shapes/uturn/defaults"
import { resolveLineDefaults } from "@shape/shapes/line/defaults"
import { resolveArrowDefaults } from "@shape/shapes/arrow/defaults"
import { resolveSquareDefaults } from "@shape/shapes/square/defaults"
import { resolveRectDefaults } from "@shape/shapes/rect/defaults"
import { resolveCrossDefaults } from "@shape/shapes/cross/defaults"
import { resolveEllipseDefaults } from "@shape/shapes/ellipse/defaults"
import { resolveImageDefaults } from "@shape/shapes/image/defaults"
import { resolveScribbleDefaults } from "@shape/shapes/scribble/defaults"
import { resolveStarDefaults } from "@shape/shapes/star/defaults"
import { resolveTriangleDefaults } from "@shape/shapes/triangle/defaults"

export const shapeDefaults = {
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
} as const

export type SchemaDefaults = {
  [K in keyof typeof shapeDefaults]: ReturnType<(typeof shapeDefaults)[K]>
}