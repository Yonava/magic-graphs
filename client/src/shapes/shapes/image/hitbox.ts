import type { BoundingBox, Coordinate } from '@shape/types/utility';
import { IMAGE_SCHEMA_DEFAULTS, type ImageSchema } from '.';
import {
  rectHitbox,
  rectEfficientHitbox,
  getRectBoundingBox,
} from '@shape/shapes/rect/hitbox';

/**
 * @param point - the point to check if it is in the image
 * @returns a function that checks if the point is in the image
 */
export const imageHitbox = (image: ImageSchema) => {
  const { at, width, height, rotation } = {
    ...IMAGE_SCHEMA_DEFAULTS,
    ...image,
  };

  const isInRect = rectHitbox({
    at,
    width,
    height,
    rotation,
  });

  return (point: Coordinate) => isInRect(point);
};

export const getImageBoundingBox = (image: ImageSchema) => {
  const { at, width, height } = image;

  return getRectBoundingBox({
    at,
    width,
    height,
  });
};

export const getImageCenterPoint = (image: ImageSchema) => () => {
  const { at, width, height } = getImageBoundingBox(image)();
  return {
    x: at.x + width / 2,
    y: at.y + height / 2,
  };
};

export const imageEfficientHitbox = (image: ImageSchema) => {
  const { at, width, height } = image;

  const isInRectEfficientHitbox = rectEfficientHitbox({
    at,
    width,
    height,
  });

  return (boxToCheck: BoundingBox) => isInRectEfficientHitbox(boxToCheck);
};
