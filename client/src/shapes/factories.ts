import type { Shape, ShapeUtilProps } from './types';

export const factoryWrapper = (
  shapeProps: Omit<Shape, keyof ShapeUtilProps>,
): Shape => {
  return {
    ...shapeProps,
    /**
     * This method calculates the center point of the shape based on its bounding box.
     */
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
