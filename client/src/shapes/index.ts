import { arrow as arrowAPI } from './shapes/arrow';
import { circle as circleAPI } from './shapes/circle';
import { line as lineAPI } from './shapes/line';
import { rect as rectAPI } from './shapes/rect';
import { square as squareAPI } from './shapes/square';
import { triangle as triangleAPI } from './shapes/triangle';
import { uturn as uturnAPI } from './shapes/uturn';
import { cross as crossAPI } from './shapes/cross';
import { scribble as scribbleAPI } from './shapes/scribble';
import { ellipse as ellipseAPI } from './shapes/ellipse';
import { star as starAPI } from './shapes/star';
import { image as imageAPI } from './shapes/image';
import { initShapeCache } from './cacher';

export const line = lineAPI;
export const arrow = arrowAPI;
export const circle = circleAPI;
export const rect = rectAPI;
export const square = squareAPI;
export const triangle = triangleAPI;
export const uturn = uturnAPI;
export const cross = crossAPI;
export const scribble = scribbleAPI;
export const ellipse = ellipseAPI;
export const star = starAPI;
export const image = imageAPI;

export const shapes = {
  arrow,
  circle,
  line,
  rect,
  square,
  triangle,
  uturn,
  cross,
  scribble,
  ellipse,
  star,
  image,
} as const;

export const useOptimizedShapes = () => {
  const toOptimized = initShapeCache()
  return {
    arrow: toOptimized(arrow),
    circle: toOptimized(circle),
    line: toOptimized(line),
    rect: toOptimized(rect),
    square: toOptimized(square),
    triangle: toOptimized(triangle),
    uturn: toOptimized(uturn),
    cross: toOptimized(cross),
    scribble: toOptimized(scribble),
    ellipse: toOptimized(ellipse),
    star: toOptimized(star),
    image: toOptimized(image),
  } satisfies Record<keyof typeof shapes, ReturnType<typeof toOptimized<any>>>
}

export type OptimizedShapes = ReturnType<typeof useOptimizedShapes>
