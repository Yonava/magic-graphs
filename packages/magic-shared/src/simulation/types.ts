import { Lens } from '../lens/types.ts';
import { GuardCheck } from './guard/SimulationGuardBuilder.ts';

export type FrameCollector<Frame> = {
  add: (frame: Frame) => void;
};

export type InitLensContext<Frame> = {
  getCurrentFrame: () => Frame;
};

export type SimulationDefinition<Frame> = {
  /**
   * Runs before frames are (re)computed on every graph structure
   * change. When `guard()` returns a violation, the simulation
   * halts and swaps in the violation's lens in place of the running
   * simulation's lens, until a later structure change makes every check pass.
   */
  guard?: GuardCheck;
  collectFrames: (collector: FrameCollector<Frame>) => void;
  // TODO roll into a lifecycle: { setup, teardown } shape, mirroring the lens API's setup/teardown vocabulary
  initLens: (context: InitLensContext<Frame>) => Lens;
  // add: mutations (add, remove, move etc) that may occur at a given step
};
