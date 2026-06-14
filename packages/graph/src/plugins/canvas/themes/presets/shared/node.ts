import { nullThrows } from '@magic/utils/assert';
import colors from '@magic/utils/colors';

import { CURSOR } from '../../cursor.ts';
import { GraphTheme, resolveNodeStyles } from '../../index.ts';
import { textDefaults } from './text.ts';

const nodeCircle: GraphTheme['node']['default']['shape'] = (node, graph) => {
  const styles = resolveNodeStyles(graph.resolveToken, node);
  const nodePosition = nullThrows(
    graph.positions.get(node.id),
    `could not resolve position for node with id ${node.id}`,
  );

  return graph.shapes.shapes.circle({
    id: node.id,
    at: nodePosition,
    radius: styles.size,
    fillColor: styles.color,
    stroke: {
      color: styles.borderColor,
      lineWidth: styles.borderWidth,
    },
    textArea: {
      textBlock: {
        content: styles.text,
        fontSize: styles.textSize,
        fontWeight: styles.textFontWeight,
        color: styles.textColor,
      },
      color: colors.TRANSPARENT,
    },
  });
};

export const nodeShared = {
  ...textDefaults,
  text: '?',
  borderWidth: 8,
  size: 35,
  shape: nodeCircle,
  cursor: CURSOR.POINTER,
} as const;
