import type { GraphEvent, GraphEventMap } from '../events';
import type { Graph } from '../types';

import type { ComputedRef, Ref } from 'vue';

/**
 * css class defined in App.vue, should move later, used as default for ElementHighlightOptions -> highlightElement.className
 */
export const DEFAULT_HIGHLIGHT_CLASS_NAME = 'element-highlight';

/**
 * describes a step in a tutorial sequence for graph events defined in the useGraph event map
 */
export type TutorialStepForEvent<T extends GraphEvent> = {
  /**
   * the hint to display to the user in order to complete the step
   */
  hint: string;
  /**
   * the event that triggers a dismiss inquiry, if its just the event itself (T), then the step will be dismissed
   * upon invocation of the event via event bus, if its an object, then the step will be dismissed upon invocation
   * of the event and only if the predicate returns true
   */
  dismiss:
  | T
  | {
    event: T;
    /**
     * @param args the arguments passed to the event handler as defined in the event map
     * @returns true if the step should be dismissed
     */
    predicate: (...args: Parameters<GraphEventMap[T]>) => boolean;
  };
};

/**
 * describes a step that will resolve after a set amount of time
 */
export type TimeoutStep = {
  hint: string;
  dismiss: 'onTimeout';
  /**
   * time to wait before the next step, in milliseconds
   */
  after: number;
};

type SharedStepProps = {
  /**
   * the text shown to the user in order to help guide them along
   */
  hint: string;
  /**
   * describes the precondition option for a tutorial step.
   * a precondition allows the implementer to run a function before the step is shown.
   * its boolean return acts just as a predicate would act as defined in base tutorial step.
   * if the precondition returns true, its like the condition for going to the next step is
   * already met, so the step will be skipped.
   */
  precondition?: (graph: Graph) => boolean;
  /**
   * callback to run when the step is initialized.
   * runs before precondition
   */
  onInit?: () => void;
  /**
   * callback to run when the step is dismissed
   */
  onDismiss?: () => void;
  /**
   * describes options for highlighting an element.
   * passing a string will highlight the element with the id
   */
  highlightElement?:
  | string
  | {
    /**
     * id of the element to highlight
     */
    id?: string;
    /**
     * css class name to apply to the element
     * @default 'element-highlight'
     */
    className?: string;
  };
};

/**
 * describes a step that will resolve after a set amount of time conditioned upon
 * the predicate returning true, if false the step will be re-evaluated after the interval
 * so on and so forth until the predicate returns true
 */
export type IntervalStep = {
  hint: string;
  dismiss:
  | 'onInterval'
  | {
    event: 'onInterval';
    /**
     * @param iteration the number of times the interval has been called
     * @returns true if the step should be dismissed
     */
    predicate: (iteration: number) => boolean;
  };
  /**
   * time to wait before the next evaluation, in milliseconds
   * @default 1000 milliseconds
   */
  interval?: number;
};

export const DEFAULT_INTERVAL = 1000;

/**
 * describes a step in a tutorial sequence for a graph event
 */
export type GraphEventStep = {
  [K in GraphEvent]: TutorialStepForEvent<K>;
}[GraphEvent];

/**
 * describes a step in a tutorial sequence
 */
export type TutorialStep = (GraphEventStep | TimeoutStep | IntervalStep) &
  SharedStepProps;

/**
 * describes a list of tutorial steps that will be executed in order from index 0 to n - 1
 */
export type TutorialSequence = TutorialStep[];

/**
 * time to wait (in milliseconds) between the dismissal of a step and the initialization of the next step
 */
export const DELAY_UNTIL_NEXT_STEP = 1000;

export const TUTORIAL_THEME_ID = 'tutorial';

export type TutorialControls = {
  /**
   * skip forward to the next step of the tutorial.
   * wont do anything if the current step is the last step
   */
  nextStep: () => void;
  /**
   * skip backward to the previous step of the tutorial.
   * wont do anything if the current step is -1.
   */
  prevStep: () => void;

  /**
   * an array of all the steps in the tutorial
   */
  sequence: Ref<TutorialSequence>;
  /**
   * the current step in the tutorial sequence. ranges from -1 to sequence.value.length.
   * where -1 is the state before the tutorial has begun and sequence.value.length is the
   * state after the tutorial has completed.
   */
  step: ComputedRef<number>;
  /**
   * set the current step of the tutorial
   * @param step the step to set the tutorial to
   * @throws if step is not within the bounds of the sequence (-1 to sequence.value.length)
   */
  setStep: (step: number) => void;

  /**
   * start the tutorial. this will begin the tutorial from step 0
   */
  start: () => void;
  /**
   * stop the tutorial. this will end the tutorial and reset all state
   */
  stop: () => void;
  /**
   * pause the tutorial. no progress can be made while the tutorial is paused
   */
  paused: Ref<boolean>;

  /**
   * whether the tutorial is currently active.
   * changes to true when start is called and false when stop is called
   */
  isActive: ComputedRef<boolean>;
  /**
   * whether the tutorial is over.
   * true when the step is sequence.value.length
   */
  isOver: ComputedRef<boolean>;
  /**
   * whether the tutorial has begun.
   * true when the step is -1
   */
  hasBegun: ComputedRef<boolean>;
};
