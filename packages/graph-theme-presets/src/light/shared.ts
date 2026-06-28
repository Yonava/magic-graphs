import { CURSOR } from '@magic/graph-plugins-shared/theme';
import colors from '@magic/utils/colors';

const sharedText = {
  content: '?',
  size: 24,
  color: colors.GRAY_900,
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
      color: colors.BLACK,
      width: 10,
    },
  },
} as const;
