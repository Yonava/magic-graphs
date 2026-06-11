import colors from '@magic/utils/colors';

import { CURSOR_FALLBACK } from '../cursor.ts';
import type { GraphTheme } from '../types.ts';
import { canvasShared } from './shared/canvas.ts';
import { edgeShared } from './shared/edge.ts';
import { marqueeEncapsulatedNodeBoxShared } from './shared/marquee.ts';
import { nodeShared } from './shared/node.ts';
import {
  nodeAnchorLinkPreviewShared,
  nodeAnchorShared,
} from './shared/nodeAnchor.ts';

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
    ...canvasShared,
  },
  marquee: {
    color: colors.WHITE + '15',
    borderColor: colors.WHITE,
    encapsulatedNodeBox: {
      color: colors.RED_700 + '20',
      borderColor: colors.RED_700,
      ...marqueeEncapsulatedNodeBoxShared,
    },
  },
  nodeAnchor: {
    default: {
      color: colors.GRAY_900,
      linkPreview: {
        color: colors.BLACK,
        ...nodeAnchorLinkPreviewShared,
      },
      ...nodeAnchorShared,
    },
    focus: {
      color: colors.RED_900,
      linkPreview: {
        color: colors.BLACK,
        ...nodeAnchorLinkPreviewShared,
      },
      ...nodeAnchorShared,
    },
  },
} as const satisfies GraphTheme;
