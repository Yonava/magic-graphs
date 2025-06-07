import type { Shape } from './types';

/**
 * Adds a `getCenterPoint` method to a shape object.
 * This method calculates the center point of the shape based on its bounding box.
 */
export const withCenterPoint = (
  shapeProps: Omit<Shape, 'getCenterPoint'>,
): Shape => {
  return {
    ...shapeProps,
    getCenterPoint: () => {
      const {
        at: { x, y },
        width,
        height,
      } = shapeProps.getBoundingBox();
      return {
        x: x + width / 2,
        y: y + height / 2,
      };
    },
  };
};
