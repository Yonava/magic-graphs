// utilized by jsdoc comments
import type { Camera } from './camera/index.ts';

type LocalStorageGetter = (...args: any[]) => string;
type LocalStorageRecord = Record<string, string | LocalStorageGetter>;

/**
 * a registry for all localStorage keys this application uses
 */
export const localKeys = {
  /** camera `panX` state in magic canvas - {@link Camera.state} */
  cameraPanX: (key: string) => `camera-pan-x-${key}` as const,
  /** camera `panY` state in magic canvas - {@link Camera.state} */
  cameraPanY: (key: string) => `camera-pan-y-${key}` as const,
  /** camera `zoom` state in magic canvas - {@link Camera.state} */
  cameraZoom: (key: string) => `camera-zoom-${key}` as const,
} as const satisfies LocalStorageRecord;
