import colors from '@magic/utils/colors';
import type { BaseGraph } from '../base';
import type { GNode, SchemaItem } from '../types';

export type SupportedNodeShapes = 'circle' | 'square';
type PropsNeededFromGraph = 'shapes' | 'getTheme';

export const getNodeSchematic = (
  node: GNode,
  graph: Pick<BaseGraph, PropsNeededFromGraph>,
): Omit<SchemaItem, 'priority'> | undefined => {
  const { getTheme } = graph;

  const color = getTheme('nodeColor', node);
  const borderColor = getTheme('nodeBorderColor', node);
  const size = getTheme('nodeSize', node);
  const borderWidth = getTheme('nodeBorderWidth', node);
  const text = getTheme('nodeText', node);
  const textSize = getTheme('nodeTextSize', node);
  const textColor = getTheme('nodeTextColor', node);
  const shape = getTheme('nodeShape', node);

  const circleShape = graph.shapes.circle({
    id: node.id,
    at: {
      x: node.x,
      y: node.y,
    },
    radius: size,
    fillColor: color,
    stroke: {
      color: borderColor,
      lineWidth: borderWidth,
    },
    textArea: {
      textBlock: {
        content: text,
        fontSize: textSize,
        fontWeight: 'bold',
        color: textColor,
      },
      color: colors.TRANSPARENT,
    },
  });

  const squareShape = graph.shapes.square({
    id: node.id,
    at: {
      x: node.x - size,
      y: node.y - size,
    },
    size: size * 2,
    fillColor: color,
    stroke: {
      color: borderColor,
      lineWidth: borderWidth,
    },
    textArea: {
      textBlock: {
        content: text,
        fontSize: textSize,
        fontWeight: 'bold',
        color: textColor,
      },
      color: colors.TRANSPARENT,
    },
  });

  return {
    shape: shape === 'circle' ? circleShape : squareShape,
    id: node.id,
    graphType: 'node',
  };
};
