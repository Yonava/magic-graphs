import { resolveThemeForEdge } from '../themes';
import { BaseGraphEdgeStyles, GraphInterface } from '../themes/types';
import type { GEdge, SchemaItem } from '../types';

export const getEdgeSchematic = (
  edge: GEdge,
  graph: GraphInterface,
): Omit<SchemaItem, 'priority'> | undefined => {
  const styles: BaseGraphEdgeStyles = resolveThemeForEdge(graph.getTheme, edge);
  const shape = graph.getTheme('edge.base.shape', edge, graph, styles);

  if (!shape) return;

  return {
    shape: shape,
    id: edge.id,
    graphType: 'edge',
  };
};
