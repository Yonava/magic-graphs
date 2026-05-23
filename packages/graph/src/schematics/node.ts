import colors from '@magic/utils/colors';

import type { BaseGraph } from '../base';
import { BaseGraphNodeStyles } from '../themes/types';
import type { GNode, SchemaItem } from '../types';

type PropsNeededFromGraph = 'shapes' | 'getTheme';

export const getNodeSchematic = (
  node: GNode,
  graph: Pick<BaseGraph, PropsNeededFromGraph>,
): Omit<SchemaItem, 'priority'> | undefined => {
  const { getTheme } = graph;

  const styles: BaseGraphNodeStyles = {
    color: getTheme('node.base.color', node),
    borderColor: getTheme('node.base.borderColor', node),
    size: getTheme('node.base.size', node),
    borderWidth: getTheme('node.base.borderWidth', node),
    text: getTheme('node.base.text', node),
    textSize: getTheme('node.base.textSize', node),
    textColor: getTheme('node.base.textColor', node),
    textFontWeight: getTheme('node.base.textFontWeight', node),
  };

  const shape = getTheme('node.base.shape', node, graph.shapes, styles);

  if (!shape) {
    throw new Error(`could not resolve shape on node with ID ${node.id}`);
  }

  return {
    shape: shape,
    id: node.id,
    graphType: 'node',
  };
};
