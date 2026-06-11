import colors from '@magic/utils/colors';

import { CURSOR_FALLBACK } from '../cursor.ts';
import type { GraphTheme } from '../types.ts';
import { edgeShared } from './shared/edge.ts';
import { nodeAnchorShared, nodeShared } from './shared/node.ts';

const nodeSharedPink = {
  textColor: colors.PINK_600,
  ...nodeShared,
} as const;

const edgeSharedPink = {
  textColor: colors.PINK_600,
  ...edgeShared,
} as const;

export const PINK_THEME = {
  node: {
    default: {
      color: colors.PINK_100,
      borderColor: colors.PINK_400,
      ...nodeSharedPink,
    },
    focus: {
      borderColor: colors.PURPLE_600,
      color: colors.PURPLE_200,
      ...nodeSharedPink,
      textColor: colors.PURPLE_900,
    },
  },
  edge: {
    default: {
      color: colors.PINK_600,
      ...edgeSharedPink,
    },
    focus: {
      color: colors.PURPLE_600,
      ...edgeSharedPink,
      textColor: colors.PURPLE_600,
    },
  },
  canvas: {
    color: colors.PINK_300,
    patternColor: colors.PURPLE_200,
    cursor: CURSOR_FALLBACK,
  },
  marquee: {
    color: colors.PINK_300 + '15',
    borderColor: colors.PINK_500,
    encapsulatedNodeBox: {
      color: colors.PINK_700 + '05',
      borderColor: colors.PINK_700,
      cursor: 'pointer',
    },
  },
  nodeAnchor: {
    default: {
      color: colors.PINK_500,
      linkPreviewColor: colors.PINK_900,
      ...nodeAnchorShared,
    },
    focus: {
      color: colors.PURPLE_700,
      linkPreviewColor: colors.PINK_900,
      ...nodeAnchorShared,
    },
  },
} as const satisfies GraphTheme;
