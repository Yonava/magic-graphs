// @typescript-eslint/no-unused-vars reports unused even if referenced in jsdoc
// eslint-disable-next-line
import type { GraphEventMap } from '@graph/events';
import type {
  OnStepChangeCallback,
  SimulationControls,
  SimulationTrace,
} from '@ui/product/sim/types';
import { localKeys } from '@utils/localStorage';
import { useLocalStorage } from '@vueuse/core';

import { computed, ref, toRef, watch } from 'vue';
import type { ComputedRef, MaybeRef } from 'vue';

/**
 * @returns the text to be displayed alongside the simulation at given step.
 * if undefined is returned, the simulation will not display text for that step.
 */
export type GetSimulationExplanation<T> = (traceStep: T) => string | undefined;

export type SimulationControlsOptions<T> = {
  /**
   * if set, the simulation will stop when the step reaches this value.
   * See {@link SimulationControls.lastStep}
   * @default trace.length - 1
   */
  lastStep?: MaybeRef<number>;
  /**
   * @returns the text to be displayed alongside the simulation at given step.
   * if undefined is returned, the simulation will not display text for that step.
   */
  explanation?: GetSimulationExplanation<T>;
  /**
   * set the default speed of the playback (seen as 1x speed in UI).
   *
   * ⚠️ normally a users preferred playback speed is saved to localStorage, however
   * on simulations where default playback speed is explicitly overridden,
   * no data will be saved.
   * @default 1000
   */
  defaultPlaybackSpeedMs?: number;
  /**
   * if false, users won't be able to adjust the speed of the playback
   * @default true
   */
  showPlaybackSpeedControls?: boolean;
  /**
   * if true, the simulation will pause when
   * the graph {@link GraphEventMap.onStructureChange | structure changes}
   * @default true
   */
  pauseOnStructureChange?: boolean;
};

/**
 * default amount of time (in ms) each step is shown for before moving to the next
 */
export const DEFAULT_PLAYBACK_SPEED_MS = 1000;

export const useSimulationControls = <T>(
  traceInput: ComputedRef<SimulationTrace<T>> | SimulationTrace<T>,
  options: SimulationControlsOptions<T> = {},
): SimulationControls<T> => {
  const lastStepOption = toRef(options.lastStep);

  const trace = computed(() => {
    if ('value' in traceInput) return traceInput.value;
    return traceInput;
  });

  /**
   * the last step of the simulation
   */
  const simLastStep = computed(() => {
    if (lastStepOption.value !== undefined) return lastStepOption.value;
    if (Array.isArray(trace.value)) return trace.value.length - 1;
    return Infinity;
  });

  /**
   * the current step of the simulation
   */
  const step = ref(0);

  /**
   * whether the simulation is paused
   */
  const paused = ref(true);

  /**
   * amount of time (in ms) each step is shown for before moving to the next
   */
  const playbackSpeed =
    options.defaultPlaybackSpeedMs !== undefined
      ? ref(options.defaultPlaybackSpeedMs)
      : useLocalStorage(
          localKeys.simulationPlaybackSpeed,
          DEFAULT_PLAYBACK_SPEED_MS,
        );

  /**
   * whether the simulation is actively being played back (even if paused)
   */
  const active = ref(false);

  /**
   * the interval that advances the simulation
   */
  const interval = ref<NodeJS.Timeout | undefined>();

  /**
   * whether the simulation has reached the last step
   */
  const isOver = computed(() => step.value === simLastStep.value);

  /**
   * whether the simulation is past the initial step
   */
  const hasBegun = computed(() => step.value > 0);

  /**
   * kicks off the simulation playback
   */
  const start = () => {
    if (active.value) return;

    paused.value = false;
    active.value = true;
    step.value = 0;
    emitStepChange(0, -1);

    setupPlaybackInterval();
  };

  /**
   * shuts down the simulation playback
   */
  const stop = () => {
    if (interval.value) clearInterval(interval.value);
    active.value = false;
  };

  /**
   * sets up the interval that advances the simulation
   */
  const setupPlaybackInterval = () => {
    if (interval.value) clearInterval(interval.value);
    // this condition should never be true, but
    // this loop should never be executing if the playback is not active
    if (!active.value) return;
    interval.value = setInterval(() => {
      if (isOver.value || paused.value) return;
      nextStep();
    }, playbackSpeed.value);
  };

  // makes the interval reactive to changes in the playback speed
  watch(playbackSpeed, setupPlaybackInterval);

  /**
   * advances the simulation to the next step
   */
  const nextStep = () => {
    if (isOver.value) return;
    step.value++;
  };

  /**
   * rewinds the simulation to the previous step
   */
  const prevStep = () => {
    if (!hasBegun.value) return;
    step.value--;
  };

  /**
   * sets the simulation to a specific step
   */
  const setStep = (newStep: number) => {
    if (newStep < 0 || newStep > simLastStep.value) return;
    step.value = newStep;
  };

  const stepChangeSubs = new Set<OnStepChangeCallback>();

  const emitStepChange = (newStep: number, oldStep: number) => {
    for (const cb of stepChangeSubs) {
      cb(newStep, oldStep);
    }
  };

  watch(step, emitStepChange);

  const traceAtStep = computed(() => {
    if (Array.isArray(trace.value)) {
      if (step.value >= trace.value.length) return trace.value.at(-1)!;
      return trace.value[step.value];
    }
    return trace.value(step.value);
  });

  watch(trace, () => {
    if (step.value >= trace.value.length) {
      setStep(trace.value.length - 1);
    }
  });

  /**
   * allows users to subscribe to step changes
   */
  const onStepChange = (cb: OnStepChangeCallback) => {
    stepChangeSubs.add(cb);
    return () => {
      stepChangeSubs.delete(cb);
    };
  };

  return {
    nextStep,
    prevStep,
    setStep,

    trace,
    traceArray: computed(() => {
      if (!Array.isArray(trace.value)) return [];
      return trace.value;
    }),
    traceFn: computed(() => {
      if (Array.isArray(trace.value)) return () => traceAtStep.value;
      return trace.value;
    }),
    step: computed(() => step.value),
    traceAtStep,
    explanationAtStep: computed(() => options.explanation?.(traceAtStep.value)),

    start,
    stop,
    paused,
    playbackSpeed,

    defaultPlaybackSpeedMs:
      options.defaultPlaybackSpeedMs ?? DEFAULT_PLAYBACK_SPEED_MS,
    showPlaybackSpeedControls: options.showPlaybackSpeedControls ?? true,
    pauseOnStructureChange: options.pauseOnStructureChange ?? true,

    isOver,
    hasBegun,
    isActive: computed(() => active.value),
    lastStep: simLastStep,

    onStepChange,
  };
};
