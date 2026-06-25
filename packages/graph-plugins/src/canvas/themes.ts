import { CoreEdge, CoreNode } from '@magic/graph-core-infra/types';
import {
  Cursor,
  CursorFallback,
} from '@magic/graph-plugins-shared/theme/cursor';
import {
  ThemeOverrides,
  ThemeValue,
} from '@magic/graph-plugins-shared/theme/types';
import type { FontWeight } from '@magic/shapes/text/types';
import { Color } from '@magic/utils/colors';

import { Ref } from 'vue';

type TextStyleValues = {
  text: string;
  textSize: number;
  textColor: Color;
  textFontWeight: FontWeight;
};

type NodeStyleValues = TextStyleValues & {
  size: number;
  borderWidth: number;
  borderColor: Color;
  color: Color;
  cursor: Cursor;
};

type EdgeStyleValues = TextStyleValues & {
  color: Color;
  width: number;
  cursor: Cursor;
};

export type NodeThemeValues = {
  [K in keyof NodeStyleValues]: ThemeValue<
    NodeStyleValues[K],
    [node: CoreNode]
  >;
};

export type EdgeThemeValues = {
  [K in keyof EdgeStyleValues]: ThemeValue<
    EdgeStyleValues[K],
    [edge: CoreEdge]
  >;
};

type CanvasThemeValues = {
  color: ThemeValue<string>;
  patternColor: ThemeValue<string>;
  cursor: ThemeValue<Cursor | CursorFallback>;
};

export type CanvasThemes = {
  'node.default.text.content': NodeThemeValues['text'];
  'node.default.text.size': NodeThemeValues['textSize'];
  'node.default.text.color': NodeThemeValues['textColor'];
  'node.default.text.fontWeight': NodeThemeValues['textFontWeight'];
  'node.default.size': NodeThemeValues['size'];
  'node.default.border.width': NodeThemeValues['borderWidth'];
  'node.default.border.color': NodeThemeValues['borderColor'];
  'node.default.color': NodeThemeValues['color'];
  'node.default.cursor': NodeThemeValues['cursor'];
  'edge.default.text.content': EdgeThemeValues['text'];
  'edge.default.text.size': EdgeThemeValues['textSize'];
  'edge.default.text.color': EdgeThemeValues['textColor'];
  'edge.default.text.fontWeight': EdgeThemeValues['textFontWeight'];
  'edge.default.color': EdgeThemeValues['color'];
  'edge.default.width': EdgeThemeValues['width'];
  'edge.default.cursor': EdgeThemeValues['cursor'];
  'canvas.color': CanvasThemeValues['color'];
  'canvas.patternColor': CanvasThemeValues['patternColor'];
  'canvas.cursor': CanvasThemeValues['cursor'];
};

export const createCanvasThemeOverrides = (): ThemeOverrides<CanvasThemes> => ({
  'node.default.text.content': [],
  'node.default.text.size': [],
  'node.default.text.color': [],
  'node.default.text.fontWeight': [],
  'node.default.size': [],
  'node.default.border.width': [],
  'node.default.border.color': [],
  'node.default.color': [],
  'node.default.cursor': [],
  'edge.default.text.content': [],
  'edge.default.text.size': [],
  'edge.default.text.color': [],
  'edge.default.text.fontWeight': [],
  'edge.default.color': [],
  'edge.default.width': [],
  'edge.default.cursor': [],
  'canvas.color': [],
  'canvas.patternColor': [],
  'canvas.cursor': [],
});
