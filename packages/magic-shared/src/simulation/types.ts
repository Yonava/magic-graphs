import { Graph } from '../graph/types.ts';
import { Lens } from '../lens/types.ts';

export type FrameCollector<Frame> = {
  add: (frame: Frame) => void;
};

export type InitLensContext<Frame> = {
  getCurrentFrame: () => Frame;
};

export type GuardOutcome =
  | { ok: true }
  | { ok: false; reason: string; lens: Lens };

export type SimulationDefinition<Frame> = {
  /**
   * Runs before frames are (re)computed, including on every graph structure
   * change. Returning `{ ok: false, lens }` halts the simulation and swaps
   * in `lens` in place of the running simulation's lens, until a later
   * structure change makes the guard pass again.
   */
  guard?: (graph: Graph) => GuardOutcome;
  collectFrames: (collector: FrameCollector<Frame>) => void;
  initLens: (context: InitLensContext<Frame>) => Lens;
  // add: mutations (add, remove, move etc) that may occur at a given step
};
