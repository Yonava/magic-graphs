import colors from '@magic/utils/colors';

import { GraphTheme } from '../..';
import { GNode } from '../../../types';
import { textDefaults } from './text';

const nodeCircle: GraphTheme['node']['base']['shape'] = (
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

export const nodeShared = {
  ...textDefaults,
  text: ({ label }: GNode) => label,
  borderWidth: 8,
  size: 35,
  shape: nodeCircle,
} as const;

export const nodeAnchorShared = {
  radius: Math.ceil(Math.sqrt(nodeShared.size) * 2),
  linkPreviewWidth: 10,
} as const;
