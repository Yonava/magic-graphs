import type { ComputedRef, Ref } from "vue";

/**
 * a function that takes a `step` number and returns the state of the simulation at that step.
 * only intended for infinite or truly massive simulations. the use of array traces are preferred as
 * it enables users to scrub or seek between steps.
 */
export type TraceFunction<T = unknown> = (step: number) => T

/**
 * a trace of the simulation. can be an array of states or a function that
 * when called with a step number returns the state at that step.
 */
export type SimulationTrace<T = unknown> = T[] | TraceFunction<T>

/**
 * used as a standard for all simulation experiences across all products
 *
 * @template T the type of the trace that the simulation is running on
 */
export type SimulationControls<T extends SimulationTrace = any> = {
  /**
   * skip forward to the next step.
   * wont do anything if the current step is `lastStep`
   */
  nextStep: () => void
  /**
   * skip backward to the previous step.
   * wont do anything if the current step is 0
   */
  prevStep: () => void

  /**
   * the current trace of the algorithm for which the simulation is being run.
   */
  trace: ComputedRef<T>,
  /**
   * the current step of the simulation.
   * ranges from 0 to trace.length where 0 is the state before the algorithm has begun
   * and `lastStep` is the state after the algorithm has completed.
   */
  step: ComputedRef<number>
  /**
   * set the current step of the simulation
   *
   * @param step the step to set the simulation to
   * @throws if step is not between 0 and `lastStep`
   */
  setStep: (step: number) => void

  /**
   * start the simulation. this will begin the simulation from step -1
   */
  start: () => void
  /**
   * stop the simulation. this will end the simulation and reset all state
   */
  stop: () => void
  /**
   * pause the simulation. keeps the playback interval running but stops the step from incrementing
   */
  paused: Ref<boolean>
  /**
   * time, in milliseconds, between each step firing.
   */
  playbackSpeed: Ref<number>

  /**
   * whether the simulation is currently active.
   * changes to true when start is called and false when stop is called
   */
  isActive: ComputedRef<boolean>
  /**
   * whether the simulation is over.
   * true when the step is equal to `lastStep` (trace.length by default)
   */
  isOver: ComputedRef<boolean>
  /**
   * whether the simulation has begun.
   * true when the step is greater than 0
   */
  hasBegun: ComputedRef<boolean>
  /**
   * the last step of the simulation. defaults to trace.length
   */
  lastStep: ComputedRef<number>
}

/**
 * wraps around simulation controls to provide a standard interface for
 * the work of setting up and running of simulations, ie prompting the user to select a starting node,
 * source/sink nodes, activating graph themes, etc.
 *
 * @template T the type of the trace that the simulation is running on
 */
export type SimulationRunner<T extends SimulationTrace = any> = {
  /**
   * Start the simulation
   */
  start: () => Promise<void> | void
  /**
   * Stop the simulation
   */
  stop: () => Promise<void> | void
  /**
   * The controls for the simulation
   */
  simControls: SimulationControls<T>
}