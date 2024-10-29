import {
  computed,
  ref,
  toRef,
  watch,
} from "vue";
import type { MaybeRef } from "vue";
import type { Graph } from "@graph/types";
import { DEFAULT_HIGHLIGHT_CLASS_NAME, DEFAULT_INTERVAL } from "@graph/tutorials/types";
import type {
  TutorialSequence,
  IntervalStep,
  GraphEventStep,
  TutorialStep,
} from "@graph/tutorials/types";

/**
 * creates functionality for an interactive tutorial sequence for a graph
 *
 * @param graph the useGraph instance to apply the tutorial to
 * @param tutorialSequence the sequence of tutorial steps to apply
 * @returns controls for the tutorial sequence
 */
export const useGraphTutorial = (graph: Graph, tutorialSequence: MaybeRef<TutorialSequence>) => {

  /**
   * the current step in the tutorial sequence,
   * can be reactively set to skip to a specific step
   */
  const stepIndex = ref(0);
  const sequence = toRef(tutorialSequence);

  let cleanupHighlight: () => void;
  let cleanupStep: () => void;

  const executeStep = (step: GraphEventStep | IntervalStep) => {

    const {
      event: dismissEvent,
      predicate: dismissPredicate
    } = typeof step.dismiss === 'string' ? {
      event: step.dismiss,
      predicate: () => true
    } : step.dismiss;

    if (dismissEvent === 'onInterval') {
      const intervalTime = 'interval' in step ? step.interval : DEFAULT_INTERVAL;
      let iteration = 0;
      const interval = setInterval(() => {
        if (dismissPredicate(++iteration)) stepIndex.value++;
      }, intervalTime);
      return () => clearInterval(interval);
    }

    /**
     * must remain defined names and not anonymous to not create multiple function references
     */
    const eventFired = (...args: any[]) => {
      const predicate = dismissPredicate?.(...args);
      if (predicate) stepIndex.value++;
    }

    graph.subscribe(dismissEvent, eventFired);
    return () => graph.unsubscribe(dismissEvent, eventFired);
  }

  const runCurrentStep = () => {
    const step = sequence.value[stepIndex.value];

    if (!step) return;

    step.onInit?.();

    if (step.precondition?.(graph)) {
      stepIndex.value++;
      return;
    }

    if (step?.highlightElement) cleanupHighlight = applyHighlight(step);

    cleanupStep = executeStep(step.dismiss !== 'onTimeout' ? step : {
      hint: step.hint,
      dismiss: 'onInterval',
      interval: step.after,
    });
  }

  const initiateNewStep = (newStepIndex: number, prevStepIndex: number) => {
    if (newStepIndex < 0) return stepIndex.value = 0;
    if (newStepIndex > sequence.value.length) return stepIndex.value = sequence.value.length
    const prevStep = sequence.value[prevStepIndex];
    prevStep?.onDismiss?.();
    cleanupStep?.();
    cleanupHighlight?.();
    runCurrentStep();
  }

  watch(stepIndex, initiateNewStep);
  watch(sequence, () => initiateNewStep(stepIndex.value, stepIndex.value));

  runCurrentStep();

  return {
    currentStepIndex: stepIndex,
    // added undefined because stepIndex is +1 out of bounds when tutorial is over
    currentStep: computed<TutorialStep | undefined>(() => sequence.value[stepIndex.value]),
    sequence,
    nextStep: () => stepIndex.value++,
    previousStep: () => stepIndex.value--,
    endTutorial: () => stepIndex.value = sequence.value.length,
    restartTutorial: () => stepIndex.value = 0,
    isTutorialOver: computed(() => stepIndex.value >= sequence.value.length),
  }
}

/**
   * applies a highlight to an element
   *
   * @param tutorialStep the step containing the highlight element
   * @returns a function to remove the highlight
   */
const applyHighlight = (tutorialStep: TutorialStep) => {
  const { highlightElement: highlight } = tutorialStep;
  if (!highlight) return () => { };
  const {
    id,
    className,
  } = {
    id: typeof highlight === 'string' ? highlight : highlight.id,
    className: (typeof highlight === 'string' || !highlight?.className) ? DEFAULT_HIGHLIGHT_CLASS_NAME : highlight.className,
  };

  if (!id) return () => { };
  const element = document.getElementById(id);
  if (!element) throw new Error(`element with id ${id} not found`);

  element.classList.add(className);
  return () => element.classList.remove(className);
}