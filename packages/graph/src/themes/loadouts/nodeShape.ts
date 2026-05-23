import colors from '@magic/utils/colors';

import { GraphTheme } from '..';

export const nodeCircle: GraphTheme['node']['base']['shape'] = (
  node,
  shapes,
  styles,
) =>
  shapes.circle({
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
        fontWeight: 'bold',
        color: styles.textColor,
      },
      color: colors.TRANSPARENT,
    },
  });
