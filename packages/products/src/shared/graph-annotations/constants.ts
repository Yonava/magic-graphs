import { ANCHOR_EVENT_ID } from '@magic/graph/plugins/anchors/index';
import { GraphThemeName } from '@magic/graph/plugins/canvas/themes/index';
import { DRAG_EVENT_ID } from '@magic/graph/plugins/drag/index';
import { FOCUS_EVENT_ID } from '@magic/graph/plugins/focus/index';
import { MARQUEE_EVENT_ID } from '@magic/graph/plugins/marquee/index';
import colors, { Color } from '@magic/utils/colors';

export const COLORS = [
  colors.RED_600,
  colors.BLUE_600,
  colors.GREEN_600,
  colors.YELLOW_600,
];

export const BRUSH_WEIGHTS = [3, 6, 9, 12];

export const THEME_TO_ERASER_OUTLINE: Record<GraphThemeName, Color> = {
  light: colors.GRAY_900,
  dark: colors.GRAY_100,
  pink: colors.PINK_800,
};

export const ERASER_BRUSH_RADIUS = 10;

export const ANNOTATION_EVENT_ID = 'product/annotation';

export const PRIORITY = {
  before: [MARQUEE_EVENT_ID, DRAG_EVENT_ID, ANCHOR_EVENT_ID, FOCUS_EVENT_ID],
} as const;
