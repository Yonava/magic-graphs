import { EventHub } from '@graph/primitives/events/createEventHub';

import type { Ref } from 'vue';

import type { DrawPattern } from './backgroundPattern.ts';
import type { Camera } from './camera/index.ts';
import { MagicCanvasLifecycleEvents } from './events.ts';

export type Coordinate = {
  x: number;
  y: number;
};

export type DrawContent = (ctx: CanvasRenderingContext2D) => void;

export type DrawFns = {
  content: Ref<DrawContent>;
  backgroundPattern: Ref<DrawPattern>;
};

export type MagicCanvasProps = {
  canvas: Ref<HTMLCanvasElement | undefined>;
  camera: Omit<Camera, 'cleanup'>;
  cursorCoordinates: Ref<Coordinate>;
  ref: {
    canvasRef: (canvas: HTMLCanvasElement) => void;
    cleanup: (canvas: HTMLCanvasElement) => void;
  };
  draw: DrawFns;
  lifecycleEvents: Omit<EventHub<MagicCanvasLifecycleEvents>, 'emit'>;
};

export type MagicCanvasOptions = {
  /**
   * a key that is used to track the camera state in localStorage
   */
  storageKey?: string;
};

export type UseMagicCanvas = (options?: MagicCanvasOptions) => MagicCanvasProps;
