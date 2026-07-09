import {
  Cursor,
  CursorFallback,
  ThemeOverrides,
  ThemeValue,
} from '@graph/plugins-shared/theme';
import { CoreNode } from '@graph/primitives/types';
import { Color } from '@core/utils/colors';

import { NodeAnchor } from './types.ts';

export type AnchorsThemes = {
  'anchors.default.color': ThemeValue<Color, [node: CoreNode]>;
  'anchors.default.radius': ThemeValue<number, [node: CoreNode]>;
  'anchors.default.cursor': ThemeValue<
    Cursor | CursorFallback,
    [node: CoreNode]
  >;
  'anchors.parentFocused.color': ThemeValue<Color, [node: CoreNode]>;
  'anchors.parentFocused.radius': ThemeValue<number, [node: CoreNode]>;
  'anchors.parentFocused.cursor': ThemeValue<
    Cursor | CursorFallback,
    [node: CoreNode]
  >;
  'anchors.edge.preview.default.color': ThemeValue<
    Color,
    [node: CoreNode, anchor: NodeAnchor]
  >;
  'anchors.edge.preview.default.width': ThemeValue<
    number,
    [node: CoreNode, anchor: NodeAnchor]
  >;
  'anchors.edge.preview.parentFocused.color': ThemeValue<
    Color,
    [node: CoreNode, anchor: NodeAnchor]
  >;
  'anchors.edge.preview.parentFocused.width': ThemeValue<
    number,
    [node: CoreNode, anchor: NodeAnchor]
  >;
};

export const createAnchorsThemeOverrides =
  (): ThemeOverrides<AnchorsThemes> => ({
    'anchors.default.color': [],
    'anchors.default.radius': [],
    'anchors.default.cursor': [],
    'anchors.parentFocused.color': [],
    'anchors.parentFocused.radius': [],
    'anchors.parentFocused.cursor': [],
    'anchors.edge.preview.default.color': [],
    'anchors.edge.preview.default.width': [],
    'anchors.edge.preview.parentFocused.color': [],
    'anchors.edge.preview.parentFocused.width': [],
  });
