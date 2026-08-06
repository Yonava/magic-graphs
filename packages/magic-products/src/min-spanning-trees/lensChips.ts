import { Color } from '@core/utils/colors';
import { CoreEdge } from '@graph/primitives/types';
import type { Graph } from '@magic/shared/graph';
import { LensChipDefinition } from '@magic/shared/ui/lens-chips/types';
import tinycolor from 'tinycolor2';

import { computed } from 'vue';

import MSTCost from './MSTCost.vue';
import { allMstsChip } from './allMstsChip.ts';

export const lensChips = (graph: Graph): LensChipDefinition[] => {
  const msts = computed(() => graph.minimumSpanningTrees.all.value.msts);
  const totalMstCost = computed(
    () => graph.minimumSpanningTrees.all.value.totalWeight,
  );
  const mstConnected = computed(
    () => graph.minimumSpanningTrees.all.value.connected,
  );

  const colorMstEdge = (edge: CoreEdge, resolveUnderneath: () => Color) => {
    const mst = msts.value.at(0);
    if (!mst) return;
    const inMst = mst.some((e) => e.id === edge.id);
    if (inMst) return;
    return tinycolor(resolveUnderneath()).setAlpha(0.25).toHex8String();
  };

  const themer = graph.theme.createThemer({
    canvas: {
      'edge.default.color': colorMstEdge,
      'edge.default.text.color': colorMstEdge,
      'edge.hover.color': colorMstEdge,
      'edge.hover.text.color': colorMstEdge,
    },
    focus: {
      'edge.focus.color': colorMstEdge,
      'edge.focus.text.color': colorMstEdge,
    },
  });

  const costChip: LensChipDefinition = {
    title: () => `Total Cost: ${totalMstCost.value.toFraction()}`,
    tooltipLabel:
      'The total cost if you sum up all the edges making up the minimum spanning tree.',
    lens: {
      id: 'total-mst-cost',
      ...themer,
      components: [
        {
          component: MSTCost,
          position: 'bottom-middle',
        },
      ],
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
