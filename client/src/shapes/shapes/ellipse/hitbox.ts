import { areBoundingBoxesOverlapping, normalizeBoundingBox } from '@shape/helpers';
import type { BoundingBox, Coordinate } from '@shape/types/utility';
import type { EllipseSchemaWithDefaults } from './defaults';

export const ellipseHitbox =
  (schema: EllipseSchemaWithDefaults) => (point: Coordinate) => {
    const { at, stroke, radiusX, radiusY } = schema;

    const dx = point.x - at.x;
    const dy = point.y - at.y;

    const strokeWidth = stroke?.lineWidth ?? 0;

    const radiusXWithStroke = radiusX + strokeWidth / 2;
    const radiusYWithStroke = radiusY + strokeWidth / 2;

    const inEllipse =
      dx ** 2 / radiusXWithStroke ** 2 + dy ** 2 / radiusYWithStroke ** 2 <= 1;

    return inEllipse;
  };

export const getEllipseBoundingBox = (schema: EllipseSchemaWithDefaults) => () => {
  const { at, radiusX, radiusY, stroke } = schema;

  const borderWidth = stroke?.lineWidth ?? 0;

  return normalizeBoundingBox({
    at: {
      x: at.x - (radiusX + borderWidth / 2),
      y: at.y - (radiusY + borderWidth / 2),
    },
    width: 2 * radiusX + borderWidth,
    height: 2 * radiusY + borderWidth,
  });
};

export const ellipseEfficientHitbox = (
  schema: EllipseSchemaWithDefaults
) => (boxToCheck: BoundingBox) => areBoundingBoxesOverlapping(
  getEllipseBoundingBox(schema)(),
  boxToCheck,
)
