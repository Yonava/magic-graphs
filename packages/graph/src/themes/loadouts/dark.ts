import colors from '@magic/utils/colors';

import { GEdge, GNode } from '../../types';
import type { GraphTheme } from '../types';
import { nodeCircle } from './nodeShape';
import { textDefaults } from './text';

const REDDISH_GRAY = 'rgb(100, 60, 70)';

const nodeShared = {
  ...textDefaults,
  text: ({ label }: GNode) => label,
  borderWidth: 8,
  size: 35,
  shape: nodeCircle,
} as const;

const edgeShared = {
  ...textDefaults,
  text: ({ label }: GEdge) => label,
  width: 10,
};

export const DARK_THEME = {
  node: {
    base: {
      color: colors.STONE_600,
      borderColor: colors.BLACK,
      ...nodeShared,
    },
    focus: {
      color: REDDISH_GRAY,
      borderColor: colors.RED_700,
      ...nodeShared,
    },
  },
  edge: {
    base: {
      color: colors.STONE_900,
      ...edgeShared,
    },
    focus: {
      color: colors.RED_700,
      ...edgeShared,
    },
  },
  graph: {
    color: colors.GRAY_600,
    patternColor: colors.GRAY_500,
  },
  marquee: {
    color: colors.WHITE + '15',
    borderColor: colors.WHITE,
    encapsulatedNodeBoxBorderColor: colors.RED_700,
    encapsulatedNodeBoxColor: colors.RED_700 + '20',
  },
  nodeAnchor: {
    // Math.ceil(Math.sqrt(nodeSize) * 2)
    radius: Math.ceil(Math.sqrt(35) * 2),
    colorWhenParentFocused: colors.RED_900,
    color: colors.GRAY_900,
    linkPreviewWidth: 10,
    linkPreviewColor: colors.BLACK,
  },
} as const satisfies GraphTheme;
