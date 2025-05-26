import { arrow as arrowAPI } from './arrow';
import { circle as circleAPI } from './circle';
import { line as lineAPI } from './line';
import { rect as rectAPI } from './rect';
import { square as squareAPI } from './square';
import { triangle as triangleAPI } from './triangle';
import { uturn as uturnAPI } from './uturn';
import { cross as crossAPI } from './cross';
import { scribble as scribbleAPI } from './scribble';
import { ellipse as ellipseAPI } from './ellipse';
import { star as starAPI } from './star';
import { image as imageAPI } from './image';
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
