import colors from '@magic/utils/colors';

import type { GraphTheme } from '../types.ts';
import { edgeShared } from './shared/edge.ts';
import { nodeAnchorShared, nodeShared } from './shared/node.ts';

const REDDISH_GRAY = 'rgb(100, 60, 70)';

const nodeSharedDark = {
  textColor: colors.WHITE,
  ...nodeShared,
} as const;

const edgeSharedDark = {
  textColor: colors.WHITE,
  ...edgeShared,
} as const;

export const DARK_THEME = {
  node: {
    default: {
      color: colors.STONE_600,
      borderColor: colors.BLACK,
      ...nodeSharedDark,
    },
    focus: {
      color: REDDISH_GRAY,
      borderColor: colors.RED_700,
      ...nodeSharedDark,
    },
  },
  edge: {
    default: {
      color: colors.STONE_900,
      ...edgeSharedDark,
    },
    focus: {
      color: colors.RED_700,
      ...edgeSharedDark,
    },
  },
  canvas: {
    color: colors.GRAY_600,
    patternColor: colors.GRAY_500,
    cursor: null,
  },
  marquee: {
    color: colors.WHITE + '15',
    borderColor: colors.WHITE,
    encapsulatedNodeBox: {
      color: colors.RED_700 + '20',
      borderColor: colors.RED_700,
      cursor: 'pointer',
    },
  },
  nodeAnchor: {
    default: {
      color: colors.GRAY_900,
      linkPreviewColor: colors.BLACK,
      ...nodeAnchorShared,
    },
    focus: {
      color: colors.RED_900,
      linkPreviewColor: colors.BLACK,
      ...nodeAnchorShared,
    },
  },
} as const satisfies GraphTheme;
