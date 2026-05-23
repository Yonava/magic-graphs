import colors from '@magic/utils/colors';

import type { GraphTheme } from '../types';
import { edgeShared } from './shared/edge';
import { nodeAnchorShared, nodeShared } from './shared/node';

const nodeSharedPink = {
  textColor: colors.PINK_600,
  ...nodeShared,
} as const;

const edgeSharedPink = {
  textColor: colors.PINK_600,
  ...edgeShared,
} as const;

export const DARK_THEME: GraphTheme = {
  node: {
    base: {
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
    base: {
      color: colors.PINK_600,
      ...edgeSharedPink,
    },
    focus: {
      color: colors.PURPLE_600,
      ...edgeSharedPink,
      textColor: colors.PURPLE_600,
    },
  },
  graph: {
    color: colors.PINK_300,
    patternColor: colors.PURPLE_200,
  },
  marquee: {
    color: colors.PINK_300 + '15',
    borderColor: colors.PINK_500,
    encapsulatedNodeBoxBorderColor: colors.PINK_700,
    encapsulatedNodeBoxColor: colors.PINK_700 + '05',
  },
  nodeAnchor: {
    color: colors.PINK_500,
    colorWhenParentFocused: colors.PURPLE_700,
    linkPreviewColor: colors.PINK_900,
    ...nodeAnchorShared,
  },
};
