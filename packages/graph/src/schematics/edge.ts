import { BaseGraphEdgeStyles, GraphInterface } from '../themes/types';
import type { GEdge, SchemaItem } from '../types';

export const getEdgeSchematic = (
  edge: GEdge,
  graph: GraphInterface,
): Omit<SchemaItem, 'priority'> | undefined => {
  const styles: BaseGraphEdgeStyles = {
    color: graph.getTheme('edge.base.color', edge),
    width: graph.getTheme('edge.base.width', edge),
    text: graph.getTheme('edge.base.text', edge),
    textSize: graph.getTheme('edge.base.textSize', edge),
    textColor: graph.getTheme('edge.base.textColor', edge),
    textFontWeight: graph.getTheme('edge.base.textFontWeight', edge),
  };

  const shape = graph.getTheme('edge.base.shape', edge, graph, styles);

  if (!shape) return;

  return {
    shape: shape,
    id: edge.id,
    graphType: 'edge',
  };
};
