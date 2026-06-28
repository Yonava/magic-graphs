import { CoreEdge, CoreNode } from '@magic/graph-primitives/types';
import { ComputedTokenDetectorMap } from '@magic/graph-plugins-shared/computed-tokens';
import {
  TokenResolver,
  Cursor,
  CursorFallback,
  ThemeOverrides,
  ThemeValue,
} from '@magic/graph-plugins-shared/theme';
import type { FontWeight } from '@magic/shapes/text/types';
import { Color } from '@magic/utils/colors';

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

export const createCanvasDetectors = (
  resolveToken: TokenResolver<CanvasThemes>,
): ComputedTokenDetectorMap => ({
  default: {
    node: {
      'node.color': (node) => resolveToken('node.default.color', node),
      'node.size': (node) => resolveToken('node.default.size', node),
      'node.border.color': (node) =>
        resolveToken('node.default.border.color', node),
      'node.border.width': (node) =>
        resolveToken('node.default.border.width', node),
      'node.cursor': (node) => resolveToken('node.default.cursor', node),
      'node.text.content': (node) =>
        resolveToken('node.default.text.content', node),
      'node.text.size': (node) => resolveToken('node.default.text.size', node),
      'node.text.color': (node) =>
        resolveToken('node.default.text.color', node),
      'node.text.fontWeight': (node) =>
        resolveToken('node.default.text.fontWeight', node),
    },
    edge: {
      'edge.color': (edge) => resolveToken('edge.default.color', edge),
      'edge.width': (edge) => resolveToken('edge.default.width', edge),
      'edge.cursor': (edge) => resolveToken('edge.default.cursor', edge),
      'edge.text.content': (edge) =>
        resolveToken('edge.default.text.content', edge),
      'edge.text.size': (edge) => resolveToken('edge.default.text.size', edge),
      'edge.text.color': (edge) =>
        resolveToken('edge.default.text.color', edge),
      'edge.text.fontWeight': (edge) =>
        resolveToken('edge.default.text.fontWeight', edge),
    },
  },
});

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
