import { capitalize } from '@core/utils/string';
import { Lens } from '@magic/shared/lens';
import { MagicProductOptions } from '@magic/shared/product';
import { createThemer } from '@magic/shared/themer/useThemer';

import NodeLens2 from './NodeLens2.vue';
import NodeLens from './NodeLens.vue';

export const lensChips: MagicProductOptions['lensChips'] = (graph) => {
  const nodeThemer = createThemer(graph, {
    canvas: {
      'node.default.color': 'red',
    },
  });

  const nodeThemer2 = createThemer(graph, {
    canvas: {
      'node.default.color': 'blue',
    },
  });

  const nodeLens: Lens = {
    id: 'lens-1',
    components: [
      {
        component: NodeLens,
        position: 'center-left',
      },
    ],
    ...nodeThemer,
  };

  const nodeLens2: Lens = {
    id: 'lens-2',
    components: [
      {
        component: NodeLens2,
        position: 'center-left',
      },
    ],
    ...nodeThemer2,
  };
  return [
    {
      lens: nodeLens,
      title: () => 'Red Nodes: ' + graph.nodes.value.length,
      tooltipContent: 'Red!',
    },
    {
      lens: nodeLens2,
      title: 'Blue Nodes',
      tooltipContent: () => 'Theme? ' + capitalize(graph.activePreset.value),
    },
  ];
};
