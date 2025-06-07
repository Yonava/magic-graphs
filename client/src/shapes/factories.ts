import type { Shape } from './types';

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
