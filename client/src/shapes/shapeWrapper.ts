import type { Shape, ShapeProps } from './types';

export const shapeFactoryWrapper = (
  shapeProps: ShapeProps,
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

export type ShapeFactoryWrapper = typeof shapeFactoryWrapper
