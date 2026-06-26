import { ANCHOR_PLUGIN_ID } from '@magic/graph-plugins/anchors/constants';
import { FOCUS_PLUGIN_ID } from '@magic/graph-plugins/focus/constants';
import { MARQUEE_PLUGIN_ID } from '@magic/graph-plugins/marquee/constants';
import { NODE_DRAG_PLUGIN_ID } from '@magic/graph-plugins/node-drag/constants';
import colors, { Color } from '@magic/utils/colors';

import { ThemePreset } from '../useGraph.ts';

export const COLORS = [
  colors.RED_600,
  colors.BLUE_600,
  colors.GREEN_600,
  colors.YELLOW_600,
];

export const BRUSH_WEIGHTS = [3, 6, 9, 12];

export const THEME_TO_ERASER_OUTLINE: Record<ThemePreset, Color> = {
  light: colors.GRAY_900,
  dark: colors.GRAY_100,
  pink: colors.PINK_800,
};

export const ERASER_BRUSH_RADIUS = 10;

export const ANNOTATION_PLUGIN_ID = 'plugins/annotations';

export const PRIORITY = {
  before: [
    MARQUEE_PLUGIN_ID,
    NODE_DRAG_PLUGIN_ID,
    ANCHOR_PLUGIN_ID,
    FOCUS_PLUGIN_ID,
  ],
} as const;
