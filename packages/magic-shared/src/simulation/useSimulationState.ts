import { nullThrows } from '@core/utils/assert';

import { ref } from 'vue';

import { Lens } from '../lens/types.ts';
import { LensControls } from '../lens/useLensState.ts';
import { InitLensContext, Simulation } from './types.ts';

export type SimulationControls = {
  start: <Frame>(simulation: Simulation<Frame>) => void;
  stop: () => void;
};

type RunningSimulation<Frame> = {
  lens: Lens;
  frames: Frame[];
  playhead: number;
};

export const useSimulationState = (lens: LensControls): SimulationControls => {
  const runningSimulation = ref<RunningSimulation<any>>();

  const getCurrentFrame = () => {
    const sim = nullThrows(
      runningSimulation.value,
      'accessed frame with no running simulation!',
    );

    return sim.frames[sim.playhead];
  };

  const initFrames = <Frame>(simulation: Simulation<Frame>) => {
    const frames: Frame[] = [];
    simulation.collectFrames({
      add: (frame) => frames.push(frame),
    });
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

  const start = <Frame>(simulation: Simulation<Frame>) => {
    const frames = initFrames(simulation);
    const simLens = initLens(simulation);

    runningSimulation.value = {
      frames,
      lens: simLens,
      playhead: 0,
    };

    lens.add(simLens);
  };

  const stop = () => {
    const sim = nullThrows(runningSimulation.value, 'no running simulation!');
    lens.remove(sim.lens.id);
    runningSimulation.value = undefined;
  };

  return {
    start,
    stop,
  };
};
