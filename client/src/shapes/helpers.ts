import { type BoundingBox, type Coordinate, type GradientStop } from '@shape/types';
import { LINE_SCHEMA_DEFAULTS } from './line';
import type { ArrowSchema } from './arrow';
import tinycolor from 'tinycolor2';

/**
 * rotates a point around a center point by a given angle in radians
 *
 * @param pointToRotate - the point that is to be rotated
 * @param centerPoint - the point that the pointToRotate will rotate around
 * @param angle - the angle in radians that the pointToRotate will rotate by
 * @returns the new point after rotation
 */
export const rotatePoint = (
  pointToRotate: Coordinate,
  centerPoint: Coordinate,
  angle: number,
) => {
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const dx = pointToRotate.x - centerPoint.x;
  const dy = pointToRotate.y - centerPoint.y;

  return {
    x: centerPoint.x + (dx * cosA - dy * sinA),
    y: centerPoint.y + (dx * sinA + dy * cosA),
  };
};

/**
 * same as rotatePoint but modifies the pointToRotate in place as opposed to returning a new point object
 *
 * @param pointToRotate - the point that is to be rotated
 * @param centerPoint - the point that the pointToRotate will rotate around
 * @param angle - the angle in radians that the pointToRotate will rotate by
 */
export const rotatePointInPlace = (
  pointToRotate: Coordinate,
  centerPoint: Coordinate,
  angle: number,
) => {
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const dx = pointToRotate.x - centerPoint.x;
  const dy = pointToRotate.y - centerPoint.y;

  pointToRotate.x = centerPoint.x + (dx * cosA - dy * sinA);
  pointToRotate.y = centerPoint.y + (dx * sinA + dy * cosA);
};

/**
 * calculates the angle between two points in radians
 *
 * @param point1 - the first point
 * @param point2 - the second point
 * @returns the angle between the two points in radians
 */
export const getAngle = (point1: Coordinate, point2: Coordinate) => {
  const { x: x1, y: y1 } = point1;
  const { x: x2, y: y2 } = point2;
  return Math.atan2(y2 - y1, x2 - x1);
};

/**
 * calculates the midpoint of the largest angular between a center point and a list of points
 *
 * @param center - the center point
 * @param points - the list of points
 * @returns the midpoint of the largest angular space
 */
export const getLargestAngularSpace = (
  center: Coordinate,
  points: Coordinate[],
) => {
  if (points.length === 0) return 0;
  const [firstPoint] = points;
  if (points.length === 1) return getAngle(center, firstPoint) + Math.PI;

  const angles = points
    .map((point) => getAngle(center, point))
    .sort((angleA, angleB) => angleA - angleB);

  let maxAngularDistance = 0;
  let maxAngularDistanceIndex = 0;

  for (let i = 0; i < angles.length; i++) {
    const nextAngle = (i + 1) % angles.length;
    const angularDistance =
      (angles[nextAngle] - angles[i] + 2 * Math.PI) % (2 * Math.PI);
    if (angularDistance > maxAngularDistance) {
      maxAngularDistance = angularDistance;
      maxAngularDistanceIndex = i;
    }
  }

  return (
    (angles[maxAngularDistanceIndex] + maxAngularDistance / 2) % (2 * Math.PI)
  );
};

/**
 * calculates the height and base width of the arrow's head based on the width of the arrow shaft
 *
 * @param arrowWidth - the width of the arrow shaft
 * @returns the arrowhead height and the arrowhead base length
 */
export const getArrowHeadSize = (
  arrowWidth: ArrowSchema['width'] = LINE_SCHEMA_DEFAULTS.width,
) => {
  const arrowHeadHeight = arrowWidth * 2.5;
  const perpLineLength = arrowHeadHeight / 1.75;
  return {
    arrowHeadHeight,
    perpLineLength,
  };
};

/**
 * generates a triangle object from the arrow tip
 *
 * @param options the arrow
 * @returns the triangle that makes up the arrow tip
 */

export const calculateArrowHeadCorners = (
  options: Required<Pick<ArrowSchema, 'start' | 'end' | 'width' | 'arrowHeadSize'>>,
) => {
  const { start, end, width, arrowHeadSize } = options;

  const { arrowHeadHeight, perpLineLength } = arrowHeadSize(width);

  const directionX = end.x - start.x;
  const directionY = end.y - start.y;
  const length = Math.sqrt(directionX ** 2 + directionY ** 2);
  const unitX = directionX / length;
  const unitY = directionY / length;

  const tip = {
    x: end.x,
    y: end.y,
  };

  const perpX = -unitY * perpLineLength;
  const perpY = unitX * perpLineLength;

  const baseLeft = {
    x: end.x - unitX * arrowHeadHeight + perpX,
    y: end.y - unitY * arrowHeadHeight + perpY,
  };
  const baseRight = {
    x: end.x - unitX * arrowHeadHeight - perpX,
    y: end.y - unitY * arrowHeadHeight - perpY,
  };

  return {
    pointA: tip,
    pointB: baseLeft,
    pointC: baseRight,
  };
};

/**
 * calculates the difference between two angles in radians.
 *
 * @param angleA The first angle in radians.
 * @param angleB The second angle in radians.
 * @returns The difference between the two angles in radians.
 */
export const angleDifference = (angleA: number, angleB: number) =>
  Math.abs(Math.atan2(Math.sin(angleA - angleB), Math.cos(angleA - angleB)));

/**
 * interpolates between two colors using tinycolor at a given ratio
 *
 * @param color1 - The first color (any format supported by tinycolor)
 * @param color2 - The second color
 * @param ratio - The ratio to interpolate (0 to 1)
 * @returns The interpolated color as a hex string
 */
const interpolateColor = (color1: string, color2: string, ratio: number) => {
  const c1 = tinycolor(color1).toRgb();
  const c2 = tinycolor(color2).toRgb();

  const result = {
    r: Math.round(c1.r + ratio * (c2.r - c1.r)),
    g: Math.round(c1.g + ratio * (c2.g - c1.g)),
    b: Math.round(c1.b + ratio * (c2.b - c1.b)),
    a: c1.a + ratio * (c2.a - c1.a),
  };

  return tinycolor(result).toHexString();
};

/**
 * finds the color at a specific percentage in a gradient
 *
 * @param gradient - The array of gradient stops
 * @param percentage - The distance along the gradient (0 to 1) to calculate the color for
 * @returns The color at the specified percentage as a hex string
 */
export const getColorAtPercentage = (
  gradient: readonly GradientStop[],
  percentage: number,
) => {
  if (gradient.length === 0) {
    throw new Error('Gradient must have at least one stop');
  }

  if (percentage > 1 || percentage < 0) {
    throw new Error('Percentage must be between 0 and 1');
  }

  let lowerStop = gradient[0];
  let upperStop = gradient[gradient.length - 1];

  for (let i = 1; i < gradient.length; i++) {
    if (percentage <= gradient[i].offset) {
      lowerStop = gradient[i - 1];
      upperStop = gradient[i];
      break;
    }
  }

  const range = upperStop.offset - lowerStop.offset;
  const ratio = range === 0 ? 0 : (percentage - lowerStop.offset) / range;

  return interpolateColor(lowerStop.color, upperStop.color, ratio);
};

/**
 * returns a bounding box with non-negative width and height by adjusting the `at` coordinate
 * to ensure it represents the top-left corner.
 *
 * @example
 * const res = normalizeBoundingBox({ at: { x: 10, y: 10 }, width: -5, height: 10 });
 * console.log(res); // { at: { x: 5, y: 10 }, width: 5, height: 10 }
 */
export const normalizeBoundingBox = (bb: BoundingBox): BoundingBox => ({
  at: {
    x: bb.at.x + (bb.width < 0 ? bb.width : 0),
    y: bb.at.y + (bb.height < 0 ? bb.height : 0)
  },
  width: Math.abs(bb.width),
  height: Math.abs(bb.height),
})