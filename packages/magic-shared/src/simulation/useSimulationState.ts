import { nullThrows } from '@core/utils/assert';

import { ComputedRef, computed, ref } from 'vue';

import { Lens } from '../lens/types.ts';
import { LensControls } from '../lens/useLensState.ts';
import { InitLensContext, Simulation } from './types.ts';

export type SimulationControls = {
  start: <Frame>(simulation: Simulation<Frame>) => void;
  stop: () => void;
  runningSimulation: ComputedRef<RunningSimulation<any> | undefined>;
};

type Playhead = {
  /** Index of the current frame in `frames`. */
  position: number;
  /** True when `position` is the last valid index; check before calling `next`. */
  isLast: () => boolean;
  /** True when `position` is the first valid index; check before calling `prev`. */
  isFirst: () => boolean;
  /** Moves to the previous frame. Throws if `isFirst()` is true. */
  prev: () => void;
  /** Moves to the next frame. Throws if `isLast()` is true. */
  next: () => void;
  /** Jumps to an arbitrary frame. Throws if out of bounds. */
  set: (position: number) => void;
};

type RunningSimulation<Frame> = {
  lens: Lens;
  frames: Frame[];
  playhead: Playhead;
};

export const useSimulationState = (lens: LensControls): SimulationControls => {
  const runningSimulation = ref<RunningSimulation<any>>();

  const getRunningSim = () =>
    nullThrows(runningSimulation.value, 'no running simulation!');

  const getCurrentFrame = () => {
    const sim = getRunningSim();
    return sim.frames[sim.playhead.position];
  };

  const initFrames = <Frame>(simulation: Simulation<Frame>) => {
    console.log('collecting');
    const frames: Frame[] = [];
    simulation.collectFrames({
      add: (frame) => frames.push(frame),
    });
    console.log('collected frames');
    nullThrows(
      frames.at(0),
      'simulation must produce at least one frame to be valid!',
    );
    return frames;
  };

  const initLens = <Frame>(simulation: Simulation<Frame>) => {
    const context: InitLensContext<Frame> = { getCurrentFrame };
    return simulation.initLens(context);
  };

  const initPlayhead = (): Playhead => {
    const isFirst = () => {
      const sim = getRunningSim();
      return sim.playhead.position === 0;
    };
    const isLast = () => {
      const sim = getRunningSim();
      return sim.playhead.position === sim.frames.length - 1;
    };

    return {
      position: 0,
      isFirst,
      isLast,
      next: () => {
        const sim = getRunningSim();
        if (isLast()) {
          throw new Error(
            `playhead.next() called at last frame (${sim.playhead.position} of ${sim.frames.length - 1})`,
          );
        }
        sim.playhead.position++;
      },
      prev: () => {
        const sim = getRunningSim();
        if (isFirst()) {
          throw new Error(`playhead.prev() called at first frame (position 0)`);
        }
        sim.playhead.position--;
      },
      set: (position) => {
        const sim = getRunningSim();
        if (position < 0 || position >= sim.frames.length) {
          throw new Error(
            `playhead.set(${position}) out of range [0, ${sim.frames.length - 1}]`,
          );
        }
        sim.playhead.position = position;
      },
    };
  };

  const start = <Frame>(simulation: Simulation<Frame>) => {
    const frames = initFrames(simulation);
    const simLens = initLens(simulation);
    const playhead = initPlayhead();

    runningSimulation.value = {
      frames,
      lens: simLens,
      playhead,
    };

    lens.add(simLens);
  };

  const stop = () => {
    const sim = getRunningSim();
    lens.remove(sim.lens.id);
    runningSimulation.value = undefined;
  };

  return {
    start,
    stop,
    runningSimulation: computed(() => runningSimulation.value),
  };
};
