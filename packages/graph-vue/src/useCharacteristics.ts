import { ConsumerEventMap } from '@graph/create-graph/consumer-events';
import { CharacteristicsControls } from '@graph/plugins/characteristics/index';
import { ReadonlyEventHub } from '@graph/primitives/events/createEventHub';

import { computed, shallowRef } from 'vue';

export const useCharacteristics = (
  events: ReadonlyEventHub<ConsumerEventMap>,
  characteristics: CharacteristicsControls,
) => {
  const refresh = shallowRef(0);
  events.subscribe('onStructureChange', () => refresh.value++);

  return {
    isComplete: computed(() => {
      refresh.value;
      return characteristics.isComplete();
    }),
    cycles: computed(() => {
      refresh.value;
      return characteristics.getCycles();
    }),
    sccs: computed(() => {
      refresh.value;
      return characteristics.sccs();
    }),
    bidirectionalEdges: computed(() => {
      refresh.value;
      return characteristics.bidirectionalEdges();
    }),
    bipartite: computed(() => {
      refresh.value;
      return characteristics.bipartite();
    }),
    connected: computed(() => {
      refresh.value;
      return characteristics.connected();
    }),
  };
};
