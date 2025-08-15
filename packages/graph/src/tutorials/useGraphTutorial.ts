import {
  DEFAULT_HIGHLIGHT_CLASS_NAME,
  DEFAULT_INTERVAL,
} from '../tutorials/types';
import type {
  GraphEventStep,
  IntervalStep,
  TutorialSequence,
  TutorialStep,
} from '../tutorials/types';
import type { Graph } from '../types';

import { computed, ref, toRef, watch } from 'vue';
import type { MaybeRef } from 'vue';

import type { TutorialControls } from './types';

/**
 * creates functionality for an interactive tutorial sequence for a graph
 *
 * @param graph the useGraph instance to apply the tutorial to
 * @param tutorialSequence the sequence of tutorial steps to apply
 * @returns controls for the tutorial sequence
 */
export const useGraphTutorial = (
  graph: Graph,
  tutorialSequence: MaybeRef<TutorialSequence>,
): TutorialControls => {
  /**
   * the current step in the tutorial sequence,
   * can be reactively set to skip to a specific step
   */
  const stepIndex = ref(-1);
  const sequence = toRef(tutorialSequence);

  const tutorialActive = ref(false);
  const tutorialPaused = ref(false);

  let cleanupHighlight: () => void;
  let cleanupStep: () => void;

  const executeStep = (step: GraphEventStep | IntervalStep) => {
    const { event: dismissEvent, predicate: dismissPredicate } =
      typeof step.dismiss === 'string'
        ? {
          event: step.dismiss,
          predicate: () => true,
        }
        : step.dismiss;

    if (dismissEvent === 'onInterval') {
      const intervalTime =
        'interval' in step ? step.interval : DEFAULT_INTERVAL;
      let iteration = 0;
      const interval = setInterval(() => {
        if (dismissPredicate(++iteration)) stepIndex.value++;
      }, intervalTime);
      return () => clearInterval(interval);
    }

    const eventFired = (...args: any[]) => {
      const predicate = dismissPredicate?.(...args);
      if (predicate) stepIndex.value++;
    };

    graph.subscribe(dismissEvent, eventFired);
    return () => graph.unsubscribe(dismissEvent, eventFired);
  };

  const runCurrentStep = () => {
    const step = sequence.value[stepIndex.value];

    if (!step) return;

    step.onInit?.();

    if (step.precondition?.(graph)) {
      stepIndex.value++;
      return;
    }

    if (step?.highlightElement) cleanupHighlight = applyHighlight(step);

    cleanupStep = executeStep(
      step.dismiss !== 'onTimeout'
        ? step
        : {
          hint: step.hint,
          dismiss: 'onInterval',
          interval: step.after,
        },
    );
  };

  const initiateNewStep = (newStepIndex: number, prevStepIndex: number) => {
    if (newStepIndex < 0) return (stepIndex.value = 0);
    if (newStepIndex > sequence.value.length)
      return (stepIndex.value = sequence.value.length);
    const prevStep = sequence.value[prevStepIndex];
    prevStep?.onDismiss?.();
    cleanupStep?.();
    cleanupHighlight?.();
    runCurrentStep();
  };

  watch(stepIndex, (newStep, oldStep) => {
    if (tutorialPaused.value) return;
    initiateNewStep(newStep, oldStep);
  });

  watch(sequence, () => initiateNewStep(stepIndex.value, stepIndex.value));

  const start = () => {
    stepIndex.value = 0;
    tutorialActive.value = true;
  };

  const stop = () => {
    stepIndex.value = sequence.value.length;
    tutorialActive.value = false;
  };

  return {
    sequence,
    step: computed(() => stepIndex.value),
    setStep: (step: number) => (stepIndex.value = step),
    paused: tutorialPaused,
    nextStep: () => stepIndex.value++,
    prevStep: () => stepIndex.value--,
    stop,
    start,
    isActive: computed(() => tutorialActive.value),
    hasBegun: computed(() => stepIndex.value > -1),
    isOver: computed(() => stepIndex.value >= sequence.value.length),
  };
};

/**
 * applies a highlight to an element
 *
 * @param tutorialStep the step containing the highlight element
 * @returns a function to remove the highlight
 */
const applyHighlight = (tutorialStep: TutorialStep) => {
  const { highlightElement: highlight } = tutorialStep;
  if (!highlight) return () => { };
  const { id, className } = {
    id: typeof highlight === 'string' ? highlight : highlight.id,
    className:
      typeof highlight === 'string' || !highlight?.className
        ? DEFAULT_HIGHLIGHT_CLASS_NAME
        : highlight.className,
  };

  if (!id) return () => { };
  const element = document.getElementById(id);
  if (!element) throw new Error(`element with id ${id} not found`);

  element.classList.add(className);
  return () => element.classList.remove(className);
};
