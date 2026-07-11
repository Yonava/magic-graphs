import { Lens } from '../lens/types.ts';

export type FrameCollector<Frame> = {
  add: (frame: Frame) => void;
};

export type InitLensContext<Frame> = {
  getCurrentFrame: () => Frame;
};

export type Simulation<Frame> = {
  collectFrames: (collector: FrameCollector<Frame>) => void;
  initLens: (context: InitLensContext<Frame>) => Lens;
  // add: mutations (add, remove, move etc) that may occur at a given step
};
