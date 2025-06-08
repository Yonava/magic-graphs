import type { Shape, ShapeUtilProps } from './types';

export const shapeFactoryWrapper = (
  shapeProps: Omit<Shape, keyof ShapeUtilProps>,
): Shape => {
  return {
    ...shapeProps,
    /**
     * calculates the center point of the shape based on its bounding box
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
