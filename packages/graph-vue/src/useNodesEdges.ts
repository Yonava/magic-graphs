import { CoreControls } from '@graph/core/types';
import { ConsumerEventMap } from '@graph/create-graph/consumer-events';
import { ReadonlyEventHub } from '@graph/primitives/events/createEventHub';

import { computed, shallowRef } from 'vue';

export const useNodesEdges = (
  events: ReadonlyEventHub<ConsumerEventMap>,
  core: Pick<CoreControls, 'nodes' | 'edges'>,
) => {
  const refresh = shallowRef(0);
  events.subscribe('onStructureChange', () => refresh.value++);

  return {
    nodes: computed(() => {
      refresh.value;
      return [...core.nodes];
    }),
    edges: computed(() => {
      refresh.value;
      return [...core.edges];
    }),
  };
};
