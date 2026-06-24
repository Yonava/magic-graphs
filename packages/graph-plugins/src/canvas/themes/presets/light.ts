import colors from '@magic/utils/colors';

import { GraphTheme } from '../index.ts';
import { canvasShared } from './shared/canvas.ts';
import { edgeShared } from './shared/edge.ts';
import { marqueeEncapsulatedNodeBoxShared } from './shared/marquee.ts';
import { nodeShared } from './shared/node.ts';
import {
  nodeAnchorLinkPreviewShared,
  nodeAnchorShared,
} from './shared/nodeAnchor.ts';

const nodeSharedLight = {
  textColor: colors.GRAY_900,
  ...nodeShared,
} as const;

const edgeSharedLight = {
  textColor: colors.GRAY_900,
  ...edgeShared,
} as const;

const EDGE_COLOR = colors.GRAY_800;

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
      color: EDGE_COLOR,
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
    ...canvasShared,
  },
  marquee: {
    color: colors.BLUE_300 + '15',
    borderColor: colors.BLUE_500,
    encapsulatedNodeBox: {
      color: colors.BLUE_700 + '05',
      borderColor: colors.BLUE_700,
      ...marqueeEncapsulatedNodeBoxShared,
    },
  },
  nodeAnchor: {
    default: {
      color: colors.BLACK,
      linkPreview: {
        color: EDGE_COLOR,
        ...nodeAnchorLinkPreviewShared,
      },
      ...nodeAnchorShared,
    },
    focus: {
      color: colors.BLUE_900,
      linkPreview: {
        color: EDGE_COLOR,
        ...nodeAnchorLinkPreviewShared,
      },
      ...nodeAnchorShared,
    },
  },
} as const satisfies GraphTheme;
