import { Graph } from '@magic/shared/graph';
import { LensChipDefinition } from '@magic/shared/ui/lens-chips/types';

import { computed } from 'vue';

export const connectedChip = (graph: Graph): LensChipDefinition => {
  const mstConnected = computed(
    () => graph.minimumSpanningTrees.all.value.connected,
  );

  return {
    title: () => `Is Connected: ${mstConnected.value ? 'Yes' : 'No'}`,
    tooltipLabel:
      'If the tree is connected it means that one contiguous path of edges can connect all nodes.',
    lens: {
      id: 'is-mst-connected',
      activate: () => {},
      deactivate: () => {},
    },
  };
};
