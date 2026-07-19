import { ConsumerEventMap } from '@graph/create-graph/consumer-events';
import { TransitionMatrixControls } from '@graph/plugins/transition-matrix/types';
import { ReadonlyEventHub } from '@graph/primitives/events/createEventHub';

import { computed, shallowRef } from 'vue';

export const useTransitionMatrix = (
  events: ReadonlyEventHub<ConsumerEventMap>,
  transitionMatrix: TransitionMatrixControls,
) => {
  const refresh = shallowRef(0);
  events.subscribe('onStructureChange', () => refresh.value++);

  return computed(() => {
    refresh.value;
    return transitionMatrix();
  });
};
