import { shapeFactoryWrapper } from '../../shapeWrapper.ts';
import { getShapeTextProps } from '../../text/text.ts';
import type { ShapeFactory } from '../../types/index.ts';
import type { Coordinate } from '../../types/utility.ts';
import { resolveUTurnDefaults } from './defaults.ts';
import { drawUTurnWithCtx } from './draw.ts';
import {
  getUTurnBoundingBox,
  uturnEfficientHitbox,
  uturnHitbox,
} from './hitbox.ts';
import { getTextAreaAnchorPoint } from './text.ts';
import type { UTurnSchema } from './types.ts';

export const uturn: ShapeFactory<UTurnSchema> = (options) => {
  if (options.downDistance < 0) {
    throw new Error('downDistance must be positive');
  }

  if (options.upDistance < 0) {
    throw new Error('upDistance must be positive');
  }

  const schema = resolveUTurnDefaults(options);
  const anchorPt = getTextAreaAnchorPoint(schema);
  const drawShape = drawUTurnWithCtx(schema);
  const text = getShapeTextProps(anchorPt, schema.textArea, drawShape);
  const { drawOverride, ...textProps } = text ?? {};

  const getBoundingBox = getUTurnBoundingBox(schema);

  const hitbox = (pt: Coordinate) => text?.textHitbox(pt) || shapeHitbox(pt);
  const shapeHitbox = uturnHitbox(schema);
  const efficientHitbox = uturnEfficientHitbox(schema);

  const draw = drawOverride ?? ((ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    text?.drawTextArea(ctx);
  });

  return shapeFactoryWrapper({
    name: 'uturn',

    draw,
    drawShape,

    hitbox,
    shapeHitbox,
    efficientHitbox,

    getBoundingBox,

    ...textProps,
  });
};
