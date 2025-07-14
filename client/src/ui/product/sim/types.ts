import type { ComputedRef, Ref } from 'vue';
// @typescript-eslint/no-unused-vars reports unused even if referenced in jsdoc
// eslint-disable-next-line
import type { GraphEventMap } from '@graph/events';

/**
 * A function that returns the simulation state at a given step.
 * Intended for infinite or procedurally generated traces (e.g., computed from a mathematical function).
 * Prefer array-based traces when possible, as they support scrubbing and seeking.
 */
export type TraceFunction<T> = (step: number) => T;

/**
 * a trace of the simulation. can be an array of states or a function that
 * when called with a step number returns the state at that step.
 */
export type SimulationTrace<T> = T[] | TraceFunction<T>;

/**
 * a callback invoked when the step of the simulation changes
 * @param newStep the step the simulation is transitioning to
 * @param oldStep the step the simulation is transitioning from
 */
export type OnStepChangeCallback = (newStep: number, oldStep: number) => void;

/**
 * used as a standard for all simulation experiences across all products
 *
 * @template T the type of the trace that the simulation is running on
 */
export type SimulationControls<T = any> = {
  /**
   * skip forward to the next step.
   * wont do anything if the current step is `lastStep`
   */
  nextStep: () => void;
  /**
   * skip backward to the previous step.
   * wont do anything if the current step is 0
   */
  prevStep: () => void;

  /**
   * the current trace of the algorithm for which the simulation is being run.
   */
  trace: ComputedRef<SimulationTrace<T>>;
  /**
   * the trace as an array. throws an error when accessed if the trace is not an array
   */
  traceArray: ComputedRef<T[]>;
  /**
   * the trace as a function. throws an error when accessed if the trace is not a function
   */
  traceFn: ComputedRef<TraceFunction<T>>;
  /**
   * the current step of the simulation.
   * ranges from 0 to `lastStep` where 0 is the state before the algorithm has begun
   * and `lastStep` is the state after the algorithm has completed.
   */
  step: ComputedRef<number>;
  /**
   * the trace at the current step of the simulation
   */
  traceAtStep: ComputedRef<T>;
  /**
   * explanatory text at the current step of the simulation
   */
  explanationAtStep: ComputedRef<string | undefined>

  /**
   * set the current step of the simulation
   * @throws if step is not between 0 and `lastStep`
   */
  setStep: (step: number) => void;

  /**
   * start the simulation. this will begin the simulation from step 0
   *
   * ⚠️ this should only be invoked by a {@link SimulationRunner | simulation runner} during start up
   */
  start: () => void;
  /**
   * stop the simulation. this will end the simulation and reset all state
   *
   * ⚠️ this should only be invoked by a {@link SimulationRunner | simulation runner} during tear down
   */
  stop: () => void;
  /**
   * pause the simulation. keeps the playback interval running but stops the step from incrementing
   */
  paused: Ref<boolean>;
  /**
   * time, in milliseconds, between each step firing.
   */
  playbackSpeed: Ref<number>;
  /**
   * the default speed of the playback (seen as 1x speed in UI).
   */
  defaultPlaybackSpeedMs: number;
  /**
   * if false, users won't be able to adjust the speed of the playback
   */
  showPlaybackSpeedControls: boolean;
  /**
   * if true, the simulation will pause when
   * the graph {@link GraphEventMap.onStructureChange | structure changes}
   * @default true
   */
  pauseOnStructureChange: boolean;

  /**
   * whether the simulation is currently active.
   * changes to true when start is called and false when stop is called
   */
  isActive: ComputedRef<boolean>;
  /**
   * whether the simulation is over. true when the step is equal to `lastStep`
   */
  isOver: ComputedRef<boolean>;
  /**
   * whether the simulation has begun. true when the step is greater than 0
   */
  hasBegun: ComputedRef<boolean>;
  /**
   * the last step of the simulation.
   * @default trace.length
   */
  lastStep: ComputedRef<number>;
  /**
   * subscribe to changes in the step of the simulation
   * @param callback the function to call when the step changes
   * @returns a function to unsubscribe the callback
   */
  onStepChange: (callback: OnStepChangeCallback) => () => void;
};

/**
 * A wrapper around {@link SimulationControls} to provide a standardized interface
 * for setting up and running simulations (e.g., prompting for source nodes, activating themes, etc.)
 */
export type SimulationRunner<T = any> = {
  /**
   * Start the simulation
   */
  start: () => Promise<void> | void;
  /**
   * Stop the simulation
   */
  stop: () => Promise<void> | void;
  /**
   * The controls for the simulation
   */
  simControls: SimulationControls<T>;
};
