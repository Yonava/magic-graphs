import type { TreeTraceStep } from '../tree/avl';
import type { GetSimulationExplanation } from '@ui/product/sim/useSimulationControls';

export const getTreeTraceExplanation: GetSimulationExplanation<TreeTraceStep> = (traceStep) => {
  const { action } = traceStep
  if (action === 'balance') {
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
  }

  if (action === 'compare') {
    const { targetNode: target, comparedNode: against } = traceStep;
    if (target > against) {
      return `${target} is greater than ${against}, so we go right.`;
    }

    if (target < against) {
      return `${target} is less than ${against}, so we go left.`;
    }

    if (target === against) {
      return `We have a duplicate, so we end here.`;
    }

    return `Found ${target}.`;
  }

  if (action === 'insert') {
    return `At a leaf position, so we insert ${traceStep.targetNode}.`
  }

  if (action === 'remove') {
    return `Removing ${traceStep.targetNode}.`
  }

  throw `invalid tree trace action: ${action}`
};