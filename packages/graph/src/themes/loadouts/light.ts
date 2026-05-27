import colors from '@magic/utils/colors';

import { GraphTheme } from '..';
import { edgeShared } from './shared/edge.ts';
import { nodeAnchorShared, nodeShared } from './shared/node.ts';

const nodeSharedLight = {
  textColor: colors.GRAY_900,
  ...nodeShared,
} as const;

const edgeSharedLight = {
  textColor: colors.GRAY_900,
  ...edgeShared,
} as const;

export const LIGHT_THEME = {
  node: {
    base: {
      color: colors.GRAY_50,
      borderColor: colors.GRAY_800,
      ...nodeSharedLight,
    },
    focus: {
      color: colors.BLUE_100,
      borderColor: colors.BLUE_600,
      ...nodeSharedLight,
    },
  },
  edge: {
    base: {
      color: colors.GRAY_800,
      ...edgeSharedLight,
    },
    focus: {
      color: colors.BLUE_600,
      ...edgeSharedLight,
    },
  },
  graph: {
    color: colors.GRAY_200,
    patternColor: colors.GRAY_500,
  },
  marquee: {
    color: colors.BLUE_300 + '15',
    borderColor: colors.BLUE_500,
    encapsulatedNodeBoxBorderColor: colors.BLUE_700,
    encapsulatedNodeBoxColor: colors.BLUE_700 + '05',
  },
  nodeAnchor: {
    base: {
      color: colors.BLACK,
      linkPreviewColor: colors.BLACK,
      ...nodeAnchorShared,
    },
    focus: {
      color: colors.BLUE_900,
      linkPreviewColor: colors.BLACK,
      ...nodeAnchorShared,
    },
  },
} as const satisfies GraphTheme;
