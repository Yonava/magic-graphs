import type { ImageSchema } from '.';
import {
  drawTextAreaOnRect,
  drawTextAreaMatteOnRect,
  drawTextOnRect,
  getTextAreaLocationOnRect,
  rectTextHitbox,
} from '@shape/shapes/rect/text';

export const getTextAreaLocationOnImage = (image: ImageSchema) => {
  return getTextAreaLocationOnRect(image);
};

/**
 * @description checks if the point is in the text label of the image
 *
 * @param point - the point to check if it is in the image
 * @returns a function that checks if the point is in the image
 */
export const imageTextHitbox = (image: ImageSchema) => {
  if (!image.textArea) return;

  return rectTextHitbox(image);
};

export const drawTextAreaMatteOnImage = (image: ImageSchema) => {
  if (!image.textArea) return;

  return drawTextAreaMatteOnRect(image);
};

export const drawTextOnImage = (image: ImageSchema) => {
  if (!image.textArea) return;

  return drawTextOnRect(image);
};

export const drawTextAreaOnImage = (image: ImageSchema) => {
  if (!image.textArea) return;

  return drawTextAreaOnRect(image);
};
