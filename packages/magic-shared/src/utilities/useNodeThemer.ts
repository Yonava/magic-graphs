import colors, { Color } from '@core/utils/colors';
import { Themer } from '@graph/create-graph/createThemer';
import { ThemeValue } from '@graph/plugins-shared/theme';
import { CoreNode } from '@graph/primitives/types';

import { Ref, ref } from 'vue';

import { Graph } from '../graph/types.ts';

export const createNodeThemer = (
  graph: Graph,
  color: ThemeValue<Color, [CoreNode]>,
) => {
  return graph.theme.createThemer({
    canvas: {
      'node.default.border.color': color,
      'node.hover.border.color': color,
    },
    anchors: {
      'anchors.default.color': color,
    },
  });
};

export type NodeIdThemer = {
  themer: Themer;
  nodeId: Ref<string | undefined>;
};

export const useNodeIdThemer = (graph: Graph): NodeIdThemer => {
  const nodeId = ref<string>();

  const fn = ({ id }: CoreNode) =>
    nodeId.value === id ? colors.AMBER_500 : undefined;

  const themer = createNodeThemer(graph, fn);

  return {
    themer,
    nodeId,
  };
};
