import { BaseGraphNodeStyles, GraphInterface } from '../themes/types';
import type { GNode, SchemaItem } from '../types';

export const getNodeSchematic = (
  node: GNode,
  graph: GraphInterface,
): Omit<SchemaItem, 'priority'> | undefined => {
  const styles: BaseGraphNodeStyles = {
    color: graph.getTheme('node.base.color', node),
    borderColor: graph.getTheme('node.base.borderColor', node),
    size: graph.getTheme('node.base.size', node),
    borderWidth: graph.getTheme('node.base.borderWidth', node),
    text: graph.getTheme('node.base.text', node),
    textSize: graph.getTheme('node.base.textSize', node),
    textColor: graph.getTheme('node.base.textColor', node),
    textFontWeight: graph.getTheme('node.base.textFontWeight', node),
  };

  const shape = graph.getTheme('node.base.shape', node, graph, styles);

  if (!shape) return;

  return {
    shape: shape,
    id: node.id,
    graphType: 'node',
  };
};
