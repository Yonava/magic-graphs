import { getCenterPoint } from './helpers';
import type { Shape, ShapeProps } from './types';

export type ShapeFactoryWrapper = (shapeProps: ShapeProps) => Shape

export const shapeFactoryWrapper: ShapeFactoryWrapper = (shapeProps) => {
  return {
    ...shapeProps,
    /**
     * get the center point of the shape based on its bounding box
     */
    getCenterPoint: () => getCenterPoint(shapeProps.getBoundingBox()),
  };
};