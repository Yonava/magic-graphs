import { nullThrows } from '@core/utils/assert';

import {
  ComputedRef,
  computed,
  defineAsyncComponent,
  markRaw,
  ref,
} from 'vue';

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
  seek: (position: number) => void;
};

type Simulation<Frame> = {
  definition: SimulationDefinition<Frame>;
  lens: Lens;
  frames: Frame[];
  playhead: Playhead;
  /** Lens currently shown in place of `lens` while the guard is failing. */
  guardLens: Lens | undefined;
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

  const initPlayhead = (frameCount: number, previousPosition = 0): Playhead => {
    const position = ref(Math.min(previousPosition, frameCount - 1));
    const isFirst = () => position.value === 0;
    const isLast = () => position.value === frameCount - 1;

    return {
      get position() {
        return position.value;
      },
      set position(value) {
        position.value = value;
      },
      isFirst,
      isLast,
      next: () => {
        if (isLast()) {
          throw new Error(
            `playhead.next() called at last frame (${position.value} of ${frameCount - 1})`,
          );
        }
        position.value++;
      },
      prev: () => {
        if (isFirst()) {
          throw new Error(`playhead.prev() called at first frame (position 0)`);
        }
        position.value--;
      },
      seek: (value: number) => {
        if (value < 0 || value >= frameCount) {
          throw new Error(
            `playhead.seek(${value}) out of range [0, ${frameCount - 1}]`,
          );
        }
        position.value = value;
      },
    };
  };

  const computeRun = <Frame>(
    definition: SimulationDefinition<Frame>,
    previousPosition = 0,
  ) => {
    const frames = initFrames(definition);
    const playhead = initPlayhead(frames.length, previousPosition);
    return { frames, playhead };
  };

  const start = <Frame>(definition: SimulationDefinition<Frame>) => {
    const { frames, playhead } = computeRun(definition);
    const simLens = initLens(definition);

    const lensComponents = simLens.components ?? [];
    lensComponents.push({
      position: 'left',
      component: markRaw(
        defineAsyncComponent(() => import('./SimulationScrubber.vue')),
      ),
    });
    simLens.components = lensComponents;

    simulation.value = {
      frames,
      lens: simLens,
      playhead,
      definition,
      guardLens: undefined,
    };

    const guardOutcome = definition.guard?.(graph);
    if (guardOutcome?.ok === false) {
      simulation.value.guardLens = guardOutcome.lens;
      lens.add(guardOutcome.lens);
    } else {
      lens.add(simLens);
    }
  };

  const stop = () => {
    const sim = getSimulation();
    lens.remove((sim.guardLens ?? sim.lens).id);
    simulation.value = undefined;
  };

  graph.events.subscribe('onStructureChange', () => {
    const sim = simulation.value;
    if (!sim) return;

    const guardOutcome = sim.definition.guard?.(graph);

    if (guardOutcome?.ok === false) {
      lens.remove((sim.guardLens ?? sim.lens).id);
      sim.guardLens = guardOutcome.lens;
      lens.add(guardOutcome.lens);
      return;
    }

    if (sim.guardLens) {
      lens.remove(sim.guardLens.id);
      sim.guardLens = undefined;
      lens.add(sim.lens);
    }

    const { frames, playhead } = computeRun(
      sim.definition,
      sim.playhead.position,
    );
    sim.frames = frames;
    sim.playhead = playhead;
  });

  return {
    start,
    stop,
    current: computed(() => simulation.value),
  };
};
