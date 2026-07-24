import colors, { Color } from '@core/utils/colors';
import { Themer } from '@graph/create-graph/createThemer';
import { ThemeValue } from '@graph/plugins-shared/theme';
import { CoreNode } from '@graph/primitives/types';

import { GNode, Graph } from '../graph/types.ts';

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
  setNodeId: (id: GNode['id'] | undefined) => void;
  setNodeIds: (id: readonly GNode['id'][]) => void;
  clearNodeIds: () => void;
};

const nodeThemeModes = {
  primary: colors.AMBER_500,
  secondary: colors.SKY_500,
  tertiary: colors.PINK_500,
} as const;

type Mode = keyof typeof nodeThemeModes;

export const createNodeIdThemer = (
  graph: Graph,
  mode: Mode,
  initialIds?: GNode['id'][],
): NodeIdThemer => {
  const nodeIds: Set<GNode['id']> = new Set(initialIds);
  const color = nodeThemeModes[mode];

  const themer = createNodeThemer(graph, (n) =>
    nodeIds.has(n.id) ? color : undefined,
  );

  const clearNodeIds: NodeIdThemer['clearNodeIds'] = () => {
    nodeIds.clear();
  };

  const setNodeIds: NodeIdThemer['setNodeIds'] = (ids) => {
    clearNodeIds();
    for (const id of ids) nodeIds.add(id);
  };

  const setNodeId: NodeIdThemer['setNodeId'] = (id) =>
    id ? setNodeIds([id]) : clearNodeIds();

  return {
    themer,
    setNodeId,
    clearNodeIds,
    setNodeIds,
  };
};
