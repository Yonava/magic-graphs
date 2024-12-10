import { generateId } from "@utils/id";
import type {
  Coordinate,
  Shape,
  Stroke,
  TextAreaNoLocation,
} from "@shape/types";
import {
  drawTextAreaOnTriangle,
  drawTextAreaMatteOnTriangle,
  drawTextOnTriangle,
  triangleTextHitbox,
} from './text'
import {
  triangleHitbox,
  triangleEfficientHitbox,
  getTriangleBoundingBox,
} from "./hitbox";
import { drawTriangleWithCtx } from "./draw";

export type Triangle = {
  id?: string;
  pointA: Coordinate;
  pointB: Coordinate;
  pointC: Coordinate;
  color?: string;
  stroke?: Stroke;
  textArea?: TextAreaNoLocation;
};

export const TRIANGLE_DEFAULTS = {
  color: "black",
} as const;

export const triangle = (options: Triangle): Shape => {
  const drawShape = drawTriangleWithCtx(options);
  const shapeHitbox = triangleHitbox(options);
  const textHitbox = triangleTextHitbox(options);
  const efficientHitbox = triangleEfficientHitbox(options);
  const hitbox = (point: Coordinate) => {
    return shapeHitbox(point); // text not implemented yet
  };

  const getBoundingBox = getTriangleBoundingBox(options);

  const drawTextArea = drawTextAreaOnTriangle(options);

  const drawTextAreaMatte = drawTextAreaMatteOnTriangle(options);
  const drawText = drawTextOnTriangle(options);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    drawTextArea?.(ctx);
  };

  return {
    id: options.id ?? generateId(),
    name: "triangle",

    draw,
    drawShape,
    drawTextArea,
    drawTextAreaMatte,
    drawText,

    hitbox,
    shapeHitbox,
    textHitbox,
    efficientHitbox,
    getBoundingBox,
  };
};
