import colors from '@magic/utils/colors';

import type { GraphTheme } from '../types.ts';
import { canvasShared } from './shared/canvas.ts';
import { edgeShared } from './shared/edge.ts';
import { marqueeEncapsulatedNodeBoxShared } from './shared/marquee.ts';
import { nodeShared } from './shared/node.ts';
import {
  nodeAnchorLinkPreviewShared,
  nodeAnchorShared,
} from './shared/nodeAnchor.ts';

const nodeSharedPink = {
  textColor: colors.PINK_600,
  ...nodeShared,
} as const;

const edgeSharedPink = {
  textColor: colors.PINK_600,
  ...edgeShared,
} as const;

const EDGE_COLOR = colors.PINK_600;

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
      color: EDGE_COLOR,
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
    ...canvasShared,
  },
  marquee: {
    color: colors.PINK_300 + '15',
    borderColor: colors.PINK_500,
    encapsulatedNodeBox: {
      color: colors.PINK_700 + '05',
      borderColor: colors.PINK_700,
      ...marqueeEncapsulatedNodeBoxShared,
    },
  },
  nodeAnchor: {
    default: {
      color: colors.PINK_500,
      linkPreview: {
        color: EDGE_COLOR,
        ...nodeAnchorLinkPreviewShared,
      },
      ...nodeAnchorShared,
    },
    focus: {
      color: colors.PURPLE_700,
      linkPreview: {
        color: EDGE_COLOR,
        ...nodeAnchorLinkPreviewShared,
      },
      ...nodeAnchorShared,
    },
  },
} as const satisfies GraphTheme;
