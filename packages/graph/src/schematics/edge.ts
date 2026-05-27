import { GraphInterface } from '../themes/types.ts';
import type { GEdge, SchemaItem } from '../types.ts';

export const getEdgeSchematic = (
  edge: GEdge,
  graph: GraphInterface,
): Omit<SchemaItem, 'priority'> | undefined => {
  const shape = graph.getTheme('edge.base.shape', edge, graph);
  if (!shape) return;

  return {
    shape: shape,
    id: edge.id,
    graphType: 'edge',
  };
};
