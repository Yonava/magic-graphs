import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import { getShapeTextProps } from '@shape/text/text';
import type { ShapeFactory } from '@shape/types';
import type { Coordinate } from '@shape/types/utility';

import { resolveUTurnDefaults } from './defaults';
import { drawUTurnWithCtx } from './draw';
import {
  getUTurnBoundingBox,
  uturnEfficientHitbox,
  uturnHitbox,
} from './hitbox';
import { getTextAreaAnchorPoint } from './text';
import type { UTurnSchema } from './types';

export const uturn: ShapeFactory<UTurnSchema> = (options) => {
  if (options.downDistance < 0) {
    throw new Error('downDistance must be positive');
  }

  if (options.upDistance < 0) {
    throw new Error('upDistance must be positive');
  }

  const schema = resolveUTurnDefaults(options);
  const anchorPt = getTextAreaAnchorPoint(schema);
  const text = getShapeTextProps(anchorPt, schema.textArea);

  const getBoundingBox = getUTurnBoundingBox(schema);

  const hitbox = (pt: Coordinate) => text?.textHitbox(pt) || shapeHitbox(pt);
  const shapeHitbox = uturnHitbox(schema);
  const efficientHitbox = uturnEfficientHitbox(schema);

  const drawShape = drawUTurnWithCtx(schema);
  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    text?.drawTextArea(ctx);
  };

  return shapeFactoryWrapper({
    name: 'uturn',

    draw,
    drawShape,

    hitbox,
    shapeHitbox,
    efficientHitbox,

    getBoundingBox,

    ...text,
  });
};
