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
      return prefix + `Preforming A Left-Left Balance`;
    }
    if (trace.method === 'left-right') {
      return prefix + `Preforming A Left-Right Balance`;
    }
    if (trace.method === 'right-left') {
      return prefix + `Preforming A Right-Left Balance`;
    }
    if (trace.method === 'right-right') {
      return prefix + `Preforming A Right-Right Balance`;
    }
    throw 'invalid balance method';
  },
  compare: (trace) => {
    const { targetNode: target, comparedNode: against } = trace;
    if (target > against) {
      return `${target} Is Greater Than ${against}, So We Go Right`;
    }

    if (target < against) {
      return `${target} Is Less Than ${against}, So We Go Left`;
    }

    if (activeSim.value?.step === activeSim.value?.trace.value.length) {
      return `We Have A Duplicate, So We End Here`;
    }

    return `Found ${target}`;
  },
  insert: (trace) => `At A Leaf Position, So We Insert ${trace.targetNode}`,
  remove: (trace) => `Removing ${trace.targetNode}`,
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
