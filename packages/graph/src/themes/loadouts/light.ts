import colors from '@magic/utils/colors';

import { GraphTheme } from '../index.ts';
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
    default: {
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
    default: {
      color: colors.GRAY_800,
      ...edgeSharedLight,
    },
    focus: {
      color: colors.BLUE_600,
      ...edgeSharedLight,
    },
  },
  canvas: {
    color: colors.GRAY_200,
    patternColor: colors.GRAY_500,
    cursor: null,
  },
  marquee: {
    color: colors.BLUE_300 + '15',
    borderColor: colors.BLUE_500,
    encapsulatedNodeBoxBorderColor: colors.BLUE_700,
    encapsulatedNodeBoxColor: colors.BLUE_700 + '05',
  },
  nodeAnchor: {
    default: {
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
