import colors from '@core/utils/colors';

import { ref } from 'vue';

import { Graph } from '../../graph/types.ts';
import { createThemer } from '../useThemer.ts';

export const useNodeThemer = (graph: Graph) => {
  const nodeId = ref<string>();
  const themer = createThemer(graph, {
    canvas: {
      'node.default.border.color': ({ id }) =>
        nodeId.value === id ? colors.AMBER_500 : undefined,
    },
  });

  return {
    themer,
    nodeId,
  };
};
