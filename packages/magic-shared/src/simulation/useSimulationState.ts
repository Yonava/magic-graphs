import { nullThrows } from '@core/utils/assert';

import { ComputedRef, computed, defineAsyncComponent, markRaw, ref } from 'vue';

import { Graph } from '../graph/types.ts';
import { Lens } from '../lens/types.ts';
import { LensControls } from '../lens/useLensState.ts';
import { InitLensContext, SimulationDefinition } from './types.ts';

export type SimulationControls = {
  start: <Frame>(definition: SimulationDefinition<Frame>) => void;
  stop: () => void;
  current: ComputedRef<Simulation<any> | undefined>;
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

type Simulation<Frame> = {
  definition: SimulationDefinition<Frame>;
  lens: Lens;
  frames: Frame[];
  playhead: Playhead;
};

export const useSimulationState = (
  lens: LensControls,
  graph: Graph,
): SimulationControls => {
  const simulation = ref<Simulation<any>>();

  const getSimulation = () =>
    nullThrows(simulation.value, 'no running simulation!');

  const getCurrentFrame = () => {
    const sim = getSimulation();
    return sim.frames[sim.playhead.position];
  };

  const initFrames = <Frame>(definition: SimulationDefinition<Frame>) => {
    const frames: Frame[] = [];
    definition.collectFrames({
      add: (frame) => frames.push(frame),
    });
    nullThrows(
      frames.at(0),
      'simulation must produce at least one frame to be valid!',
    );
    return frames;
  };

  const initLens = <Frame>(definition: SimulationDefinition<Frame>) => {
    const context: InitLensContext<Frame> = { getCurrentFrame };
    return definition.initLens(context);
  };

  const initPlayhead = (frames: unknown[]): Playhead => {
    const isFirst = () => {
      const sim = getSimulation();
      return sim.playhead.position === 0;
    };
    const isLast = () => {
      const sim = getSimulation();
      return sim.playhead.position === frames.length - 1;
    };

    const initialPlayheadPosition = () => {
      if (!simulation.value) return 0;
      const activePosition = simulation.value.playhead.position;
      const maxValue = frames.length - 1;
      return Math.min(activePosition, maxValue);
    };

    return {
      position: initialPlayheadPosition(),
      isFirst,
      isLast,
      next: () => {
        const sim = getSimulation();
        if (isLast()) {
          throw new Error(
            `playhead.next() called at last frame (${sim.playhead.position} of ${frames.length - 1})`,
          );
        }
        sim.playhead.position++;
      },
      prev: () => {
        const sim = getSimulation();
        if (isFirst()) {
          throw new Error(`playhead.prev() called at first frame (position 0)`);
        }
        sim.playhead.position--;
      },
      set: (position) => {
        const sim = getSimulation();
        if (position < 0 || position >= frames.length) {
          throw new Error(
            `playhead.set(${position}) out of range [0, ${frames.length - 1}]`,
          );
        }
        sim.playhead.position = position;
      },
    };
  };

  const start = <Frame>(definition: SimulationDefinition<Frame>) => {
    const frames = initFrames(definition);
    const simLens = initLens(definition);
    const playhead = initPlayhead(frames);

    simulation.value = {
      frames,
      lens: simLens,
      playhead,
      definition,
    };

    const lensComponents = simLens.components ?? [];
    lensComponents.push({
      position: 'left',
      component: markRaw(
        defineAsyncComponent(() => import('./SimulationScrubber.vue')),
      ),
    });
    lens.add({
      ...simLens,
      components: lensComponents,
    });
  };

  const stop = () => {
    const sim = getSimulation();
    lens.remove(sim.lens.id);
    simulation.value = undefined;
  };

  graph.events.subscribe('onStructureChange', () => {
    if (!simulation.value) return;
    const frames = initFrames(simulation.value.definition);
    const playhead = initPlayhead(frames);
    simulation.value.frames = frames;
    simulation.value.playhead = playhead;
  });

  return {
    start,
    stop,
    current: computed(() => simulation.value),
  };
};
