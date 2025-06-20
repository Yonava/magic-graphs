import { drawUTurnWithCtx } from './draw';
import {
  uturnHitbox,
  uturnEfficientHitbox,
  getUTurnBoundingBox,
} from './hitbox';
import { getTextAreaAnchorPoint } from './text';
import type { Coordinate } from '@shape/types/utility';
import type { ShapeFactory } from '@shape/types';
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import { getShapeTextProps } from '@shape/text/text';
import type { UTurnSchema } from './types';

export const uturn: ShapeFactory<UTurnSchema> = (options) => {
  if (options.downDistance < 0) {
    throw new Error('downDistance must be positive');
  }

  if (options.upDistance < 0) {
    throw new Error('upDistance must be positive');
  }

  const anchorPt = getTextAreaAnchorPoint(options)
  const shapeTextProps = getShapeTextProps(anchorPt, options.textArea)

  const drawShape = drawUTurnWithCtx(options);

  const shapeHitbox = uturnHitbox(options);
  const efficientHitbox = uturnEfficientHitbox(options);

  const hitbox = (point: Coordinate) => {
    return shapeTextProps?.textHitbox(point) || shapeHitbox(point);
  };

  const getBoundingBox = getUTurnBoundingBox(options);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    shapeTextProps?.drawTextArea(ctx);
  };

  return shapeFactoryWrapper({
    name: 'uturn',

    draw,

    drawShape,

    hitbox,
    shapeHitbox,

    efficientHitbox,
    getBoundingBox,

    ...shapeTextProps,
  });
};
