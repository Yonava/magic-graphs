import { resolveThemeForNode } from '../themes';
import { BaseGraphNodeStyles, GraphInterface } from '../themes/types.ts';
import type { GNode, SchemaItem } from '../types.ts';

export const getNodeSchematic = (
  node: GNode,
  graph: GraphInterface,
): Omit<SchemaItem, 'priority'> | undefined => {
  const shape = graph.getTheme('node.base.shape', node, graph);
  if (!shape) return;

  return {
    shape: shape,
    id: node.id,
    graphType: 'node',
  };
};
