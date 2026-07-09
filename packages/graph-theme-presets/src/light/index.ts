import {
  CURSOR,
  CURSOR_FALLBACK,
} from '@graph/plugins-shared/theme';
import { AnchorsPlugin } from '@graph/plugins/anchors/types';
import { CanvasPlugin } from '@graph/plugins/canvas/types';
import { FocusPlugin } from '@graph/plugins/focus/types';
import { MarqueePlugin } from '@graph/plugins/marquee/types';
import colors from '@magic/utils/colors';

import { shared } from './shared.ts';
import { PluginThemes } from '@graph/plugins-shared/plugins';

type LightPreset = PluginThemes<
  [CanvasPlugin, FocusPlugin, MarqueePlugin, AnchorsPlugin]
>;

export const light: LightPreset = {
  canvas: {
    'canvas.color': colors.GRAY_200,
    'canvas.cursor': CURSOR_FALLBACK,
    'canvas.patternColor': colors.GRAY_500,

    'edge.default.color': colors.GRAY_800,
    'edge.default.cursor': shared.edge.cursor,
    'edge.default.text.color': shared.edge.text.color,
    'edge.default.text.content': shared.edge.text.content,
    'edge.default.text.fontWeight': shared.edge.text.fontWeight,
    'edge.default.text.size': shared.edge.text.size,
    'edge.default.width': shared.edge.width,

    'node.default.border.color': colors.GRAY_800,
    'node.default.border.width': shared.node.borderWidth,
    'node.default.color': colors.GRAY_50,
    'node.default.cursor': shared.node.cursor,
    'node.default.size': shared.node.size,
    'node.default.text.color': shared.node.text.color,
    'node.default.text.content': shared.node.text.content,
    'node.default.text.fontWeight': shared.node.text.fontWeight,
    'node.default.text.size': shared.node.text.size,
  },
  focus: {
    'edge.focus.color': colors.BLUE_600,
    'edge.focus.cursor': shared.edge.cursor,
    'edge.focus.text.color': shared.edge.text.color,
    'edge.focus.text.content': shared.edge.text.content,
    'edge.focus.text.fontWeight': shared.edge.text.fontWeight,
    'edge.focus.text.size': shared.edge.text.size,
    'edge.focus.width': shared.edge.width,

    'node.focus.border.color': colors.BLUE_600,
    'node.focus.border.width': shared.node.borderWidth,
    'node.focus.color': colors.BLUE_100,
    'node.focus.cursor': shared.node.cursor,
    'node.focus.size': shared.node.size,
    'node.focus.text.color': shared.node.text.color,
    'node.focus.text.content': shared.node.text.content,
    'node.focus.text.fontWeight': shared.node.text.fontWeight,
    'node.focus.text.size': shared.node.text.size,
  },
  marquee: {
    'marquee.drag.border.color': colors.BLUE_500,
    'marquee.drag.border.width': 1,
    'marquee.drag.color': colors.BLUE_300 + '15',

    'marquee.selection.border.color': colors.BLUE_700,
    'marquee.selection.border.width': 1,
    'marquee.selection.color': colors.BLUE_700 + '05',
    'marquee.selection.cursor': CURSOR.POINTER,
  },
  anchors: {
    'anchors.default.color': colors.BLACK,
    'anchors.default.cursor': shared.anchors.cursor,
    'anchors.default.radius': shared.anchors.radius,

    'anchors.edge.preview.default.color': shared.anchors.edgePreview.color,
    'anchors.edge.preview.default.width': shared.anchors.edgePreview.width,
    'anchors.edge.preview.parentFocused.color':
      shared.anchors.edgePreview.color,
    'anchors.edge.preview.parentFocused.width':
      shared.anchors.edgePreview.width,

    'anchors.parentFocused.color': colors.BLUE_900,
    'anchors.parentFocused.cursor': shared.anchors.cursor,
    'anchors.parentFocused.radius': shared.anchors.radius,
  },
};
