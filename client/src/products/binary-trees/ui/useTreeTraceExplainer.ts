import { computed } from 'vue';
import state from '../state';
import type { TreeTraceStep } from '../tree/avl';

const { simRunner: activeSim } = state;

const TRACE_STEP_TO_EXPLAINER: Record<TreeTraceStep['action'], (traceStep: TreeTraceStep) => string> = {
  balance: (traceStep) => {
    if (traceStep.action !== 'balance') throw 'wrong explainer function called'
    const { method } = traceStep;
    const prefix = 'Tree Unbalanced! ';
    if (method === 'left-left') {
      return prefix + `Correcting a Left-Left Imbalance`;
    }
    if (method === 'left-right') {
      return prefix + `Correcting a Left-Right Imbalance`;
    }
    if (method === 'right-left') {
      return prefix + `Correcting a Right-Left Imbalance`;
    }
    if (method === 'right-right') {
      return prefix + `Correcting a Right-Right Imbalance`;
    }
    throw 'invalid balance method';
  },
  compare: (traceStep) => {
    if (!activeSim.value) throw 'no active sim'
    if (traceStep.action !== 'compare') throw 'wrong explainer function called'
    const { targetNode: target, comparedNode: against } = traceStep;
    const { step, traceArray } = activeSim.value.simControls;
    if (target > against) {
      return `${target} is greater than ${against}, so we go right.`;
    }

    if (target < against) {
      return `${target} is less than ${against}, so we go left.`;
    }

    if (step.value === traceArray.value.length) {
      return `We have a duplicate, so we end here.`;
    }

    return `Found ${target}.`;
  },
  insert: (traceStep) => {
    if (traceStep.action !== 'insert') throw 'wrong explainer function called'
    return `At a leaf position, so we insert ${traceStep.targetNode}.`
  },
  remove: (traceStep) => {
    if (traceStep.action !== 'remove') throw 'wrong explainer function called'
    return `Removing ${traceStep.targetNode}.`
  },
};

export const useTreeTraceExplainer = () =>
  computed(() => {
    if (!activeSim.value) return;
    const { traceAtStep } = activeSim.value.simControls;
    const getExplainer = TRACE_STEP_TO_EXPLAINER[traceAtStep.value.action]
    return getExplainer(traceAtStep.value);
  });
