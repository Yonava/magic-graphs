import colors from '@magic/utils/colors';

import { GNode } from '../../../../../types.ts';
import { CURSOR } from '../../cursor.ts';
import { GraphTheme, resolveNodeStyles } from '../../index.ts';
import { textDefaults } from './text.ts';

const nodeCircle: GraphTheme['node']['default']['shape'] = (node, graph) => {
  const styles = resolveNodeStyles(graph.resolveToken, node);

  return graph.shapes.shapes.circle({
    id: node.id,
    at: {
      x: node.x,
      y: node.y,
    },
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
  text: ({ label }: GNode) => label,
  borderWidth: 8,
  size: 35,
  shape: nodeCircle,
  cursor: CURSOR.POINTER,
} as const;
