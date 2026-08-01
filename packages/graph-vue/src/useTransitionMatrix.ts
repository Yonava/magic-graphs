import { TransitionMatrixControls } from '@graph/plugins/transition-matrix/types';

import { useSignal } from './useSignal.ts';

export const useTransitionMatrix = (
  transitionMatrix: TransitionMatrixControls,
) => useSignal(transitionMatrix);
