import { Position } from './types.ts';

export const DEFAULT_POSITION = {
  x: 0,
  y: 0,
  z: 1,
} as const satisfies Position;
