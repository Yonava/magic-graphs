import { CURSOR } from '@magic/graph-plugins-shared/theme/cursor';
import colors from '@magic/utils/colors';

const sharedText = {
  content: '?',
  size: 24,
  color: colors.PINK_600,
  fontWeight: 'bold',
} as const;

export const shared = {
  node: {
    size: 35,
    borderWidth: 8,
    cursor: CURSOR.POINTER,
    text: sharedText,
  },
  edge: {
    width: 10,
    text: sharedText,
    cursor: CURSOR.POINTER,
  },
  anchors: {
    radius: Math.ceil(Math.sqrt(35) * 2),
    cursor: CURSOR.GRAB,
    edgePreview: {
      color: colors.PINK_900,
      width: 10,
    },
  },
} as const;
