import { Lens } from '../lens/types.ts';
import { GuardCheck } from './guard/SimulationGuardBuilder.ts';

export type FrameCollector<Frame> = {
  add: (frame: Frame) => void;
};

export type SetupContext<Frame> = {
  getCurrentFrame: () => Frame;
};

type SetupOutput = {
  lens?: Lens;
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
  setup: (context: SetupContext<Frame>) => SetupOutput | undefined;
  // add: mutations (add, remove, move etc) that may occur at a given step
};
