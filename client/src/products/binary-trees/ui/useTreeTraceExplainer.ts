import { computed } from 'vue';
import state from '../state';
import type {
  BalanceAction,
  CompareAction,
  InsertAction,
  RemoveAction,
  TreeTrace,
} from '../tree/avl';

const { activeSim } = state;

type ExplainerFn<T extends TreeTrace> = (trace: T) => string;

type ActionMap = {
  balance: ExplainerFn<BalanceAction>;
  compare: ExplainerFn<CompareAction>;
  insert: ExplainerFn<InsertAction>;
  remove: ExplainerFn<RemoveAction>;
};

const traceActionToExplainer: ActionMap = {
  balance: (trace) => {
    const prefix = 'Tree Unbalanced! ';
    if (trace.method === 'left-left') {
      return prefix + `Correcting a Left-Left Imbalance`;
    }
    if (trace.method === 'left-right') {
      return prefix + `Correcting a Left-Right Imbalance`;
    }
    if (trace.method === 'right-left') {
      return prefix + `Correcting a Right-Left Imbalance`;
    }
    if (trace.method === 'right-right') {
      return prefix + `Correcting a Right-Right Imbalance`;
    }
    throw 'invalid balance method';
  },
  compare: (trace) => {
    const { targetNode: target, comparedNode: against } = trace;
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

const getExplainerFromTrace = (trace: TreeTrace) => {
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
    const { trace, step } = activeSim.value;
    const traceAtStep = trace.value[step.value];
    if (!traceAtStep) return;
    return getExplainerFromTrace(traceAtStep);
  });
