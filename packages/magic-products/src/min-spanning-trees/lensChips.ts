import type { Graph } from '@magic/shared/graph';
import { LensChipDefinition } from '@magic/shared/ui/lens-chips/types';

import { computed } from 'vue';

import { allMstsChip } from './allMstsChip.ts';

export const lensChips = (graph: Graph): LensChipDefinition[] => {
  const msts = computed(() => graph.minimumSpanningTrees.all.value.msts);
  const totalMstCost = computed(
    () => graph.minimumSpanningTrees.all.value.totalWeight,
  );
  const mstConnected = computed(
    () => graph.minimumSpanningTrees.all.value.connected,
  );

  const costChip: LensChipDefinition = {
    title: () => `Total Cost: ${totalMstCost.value.toFraction()}`,
    tooltipLabel:
      'The total cost if you sum up all the edges making up the minimum spanning tree.',
    lens: {
      id: 'total-mst-cost',
      activate: () => {},
      deactivate: () => {},
    },
  };

  const connectedChip: LensChipDefinition = {
    title: () => `Is Connected: ${mstConnected.value ? 'Yes' : 'No'}`,
    tooltipLabel:
      'If the tree is connected it means that one contiguous path of edges can connect all nodes.',
    lens: {
      id: 'is-mst-connected',
      activate: () => {},
      deactivate: () => {},
    },
  };

  return [allMstsChip(graph, msts), costChip, connectedChip];
};
