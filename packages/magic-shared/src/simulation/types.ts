import { MaybeGetter } from '@core/utils/maybeGetter/index';

import { Lens } from '../lens/types.ts';
import { GuardCheck } from './guard/SimulationGuardBuilder.ts';

export type FrameCollector<Frame> = {
  add: (frame: Frame) => void;
};

export type SetupContext<Frame> = {
  getCurrentFrame: () => Frame;
};

export type ExplainerHighlight = {
  activate: () => void;
  deactivate: () => void;
  tooltipLabel?: MaybeGetter<string>;
  classes?: MaybeGetter<string>;
};

export type Explainer = {
  content: MaybeGetter<string>;
  highlights: MaybeGetter<ExplainerHighlight[]>;
};

export type SimulationEffects<Frame> = {
  lens?: Lens;
  explainer?: (frame: Frame) => Explainer;
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
  setup: (context: SetupContext<Frame>) => SimulationEffects<Frame> | undefined;
  teardown?: () => void;
  // add: mutations (add, remove, move etc) that may occur at a given step
};
