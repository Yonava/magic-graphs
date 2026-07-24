import { MaybeGetter } from '@core/utils/maybeGetter/index';

import { ComputedRef } from 'vue';

import { Lens } from '../lens/types.ts';
import { GuardCheck, Violation } from './guard/SimulationGuardBuilder.ts';

export type FrameCollector<Frame> = {
  add: (frame: Frame) => void;
};

export type SetupContext<Frame> = {
  frames: ComputedRef<Frame[]>;
  currentFrame: ComputedRef<Frame>;
};

export type ExplainerHighlight = {
  activate?: () => void;
  deactivate?: () => void;
  onMounted?: () => void;
  onUnmounted?: () => void;
  tooltipLabel?: MaybeGetter<string>;
  // TODO nest classes and styles under attrs field, and have attrs field spread onto button
  classes?: MaybeGetter<string>;
  styles?: MaybeGetter<CSSStyleValue>;
};

export type Explainer = {
  content: MaybeGetter<string>;
  highlights?: MaybeGetter<ExplainerHighlight[]>;
};

export type SimulationLifecycle<Frame> = {
  onSetupCompleted?: (firstFrame: Frame) => void;
  onBeforeTeardown?: () => void;
  onTeardownCompleted?: () => void;
  onFrameTransition?: (newFrame: Frame, oldFrame: Frame) => void;
  onViolation?: (violation: Violation) => void;
};

export type SimulationEffects<Frame> = {
  lens?: Lens;
  explainer?: (frame: Frame) => Explainer | undefined;
} & SimulationLifecycle<Frame>;

export type FrameCollectorFn<Frame> = (
  collector: FrameCollector<Frame>,
) => void;

export type SimulationDefinition<Frame> = {
  /**
   * Runs before frames are (re)computed on every graph structure
   * change. When `guard()` returns a violation, the simulation
   * halts and swaps in the violation's lens in place of the running
   * simulation's lens, until a later structure change makes every check pass.
   */
  guard?: GuardCheck;

  collectFrames: FrameCollectorFn<Frame>;
  setup: (context: SetupContext<Frame>) => SimulationEffects<Frame> | undefined;

  recomputeFramesOnStructureChange?: boolean;
  // add: mutations (add, remove, move etc) that may occur at a given step
};
