import { computed } from 'vue';
import state from '../state';
import type {
  BalanceStep,
  CompareStep,
  InsertStep,
  RemoveStep,
  TreeTraceStep,
} from '../tree/avl';

const { activeSim } = state;

type ExplainerFn<T extends TreeTraceStep> = (traceStep: T) => string;

type ActionMap = {
  balance: ExplainerFn<BalanceStep>;
  compare: ExplainerFn<CompareStep>;
  insert: ExplainerFn<InsertStep>;
  remove: ExplainerFn<RemoveStep>;
};

const traceActionToExplainer: ActionMap = {
  balance: (traceStep) => {
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
    const { targetNode: target, comparedNode: against } = traceStep;
    if (target > against) {
      return `${target} is greater than ${against}, so we go right.`;
    }

    if (target < against) {
      return `${target} is less than ${against}, so we go left.`;
    }

    if (activeSim.value?.step === activeSim.value?.trace.value.length) {
      return `We have a duplicate, so we end here.`;
    }

    return `Found ${target}.`;
  },
  insert: (trace) => `At a leaf position, so we insert ${trace.targetNode}.`,
  remove: (trace) => `Removing ${trace.targetNode}.`,
};

const getExplainerFromTrace = (trace: TreeTraceStep) => {
  if (trace.action === 'balance') {
    return traceActionToExplainer['balance'](trace);
  }
  if (trace.action === 'compare') {
    return traceActionToExplainer['compare'](trace);
  }
  if (trace.action === 'insert') {
    return traceActionToExplainer['insert'](trace);
  }
  if (trace.action === 'remove') {
    return traceActionToExplainer['remove'](trace);
  }
};

export const useTreeTraceExplainer = () =>
  computed(() => {
    if (!activeSim.value) return;
    const { traceArray, step } = activeSim.value;
    const traceAtStep = traceArray.value[step.value];
    if (!traceAtStep) return;
    return getExplainerFromTrace(traceAtStep);
  });
