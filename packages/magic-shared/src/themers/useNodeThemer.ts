import colors from '@core/utils/colors';
import { Themer } from '@graph/create-graph/createThemer';

import { Ref, ref } from 'vue';

import { Graph } from '../graph/types.ts';

export type NodeThemer = {
  themer: Themer;
  nodeId: Ref<string | undefined>;
};

export const useNodeThemer = (graph: Graph): NodeThemer => {
  const nodeId = ref<string>();
  const themer = graph.theme.createThemer({
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
