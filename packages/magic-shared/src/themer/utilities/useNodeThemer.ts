import colors from '@core/utils/colors';

import { Ref, ref } from 'vue';

import { Graph } from '../../graph/types.ts';
import { Themer } from '../types.ts';
import { createThemer } from '../useThemer.ts';

export type NodeThemer = {
  themer: Themer;
  nodeId: Ref<string | undefined>;
};

export const useNodeThemer = (graph: Graph): NodeThemer => {
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
