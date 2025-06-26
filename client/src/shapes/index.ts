import { arrow } from './shapes/arrow';
import { line } from './shapes/line';
import { rect } from './shapes/rect';
import { square } from './shapes/square';
import { triangle } from './shapes/triangle';
import { uturn } from './shapes/uturn';
import { cross } from './shapes/cross';
import { scribble } from './shapes/scribble';
import { ellipse } from './shapes/ellipse';
import { star } from './shapes/star';
import { image } from './shapes/image';
import { circle } from './shapes/circle';
import { initShapeCache } from './cacher';

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
  }
}

export type OptimizedShapes = ReturnType<typeof useOptimizedShapes>
