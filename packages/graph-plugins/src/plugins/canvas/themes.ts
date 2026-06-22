import { CoreEdge, CoreNode } from '@magic/graph/types';
import type { FontWeight } from '@magic/shapes/text/types';
import { Shape } from '@magic/shapes/types/index';
import { Color } from '@magic/utils/colors';
import type { MaybeGetter } from '@magic/utils/maybeGetter/index';

import { Cursor, CursorFallback } from './theme/cursor.ts';
import { ToThemeOverrides, ToThemeValue } from './theme/types.ts';

type TextStyleValues = {
  text: string;
  textSize: number;
  textColor: Color;
  textFontWeight: FontWeight;
};

type NodeStyleValues = TextStyleValues & {
  // TODO consider wrapping this in a branded type or something so
  // it we can just say shape: NotAThemeOverride<Shape>
  shape: () => Shape;
  size: number;
  borderWidth: number;
  borderColor: Color;
  color: Color;
  cursor: Cursor;
};

type EdgeStyleValues = TextStyleValues & {
  shape: () => Shape;
  color: Color;
  width: number;
};

type NodeThemeValues = {
  [K in keyof NodeStyleValues]: ToThemeValue<
    (node: CoreNode) => NodeStyleValues[K]
  >;
};

type EdgeThemeValue = {
  [K in keyof EdgeStyleValues]: ToThemeValue<
    (edge: CoreEdge) => EdgeStyleValues[K]
  >;
};

type CanvasThemeValues = {
  color: MaybeGetter<string>;
  patternColor: MaybeGetter<string>;
  cursor: ToThemeValue<() => Cursor | CursorFallback>;
};

type CanvasTheme = {
  node: {
    default: NodeThemeValues;
  };
  edge: {
    default: EdgeThemeValue;
  };
  canvas: CanvasThemeValues;
};

export type ThemeOverrides = ToThemeOverrides<CanvasTheme>;

const textFields = (): ToThemeOverrides<TextStyleValues> => ({
  text: [],
  textColor: [],
  textFontWeight: [],
  textSize: [],
});

const nodeFields = (): ToThemeOverrides<NodeStyleValues> => ({
  ...textFields(),
  shape: [],
  borderColor: [],
  borderWidth: [],
  color: [],
  size: [],
  cursor: [],
});

const edgeFields = (): ToThemeOverrides<EdgeStyleValues> => ({
  ...textFields(),
  shape: [],
  color: [],
  width: [],
});

export const createThemeOverrides = (): ThemeOverrides => ({
  node: {
    default: nodeFields(),
  },
  edge: {
    default: edgeFields(),
  },
  canvas: {
    color: [],
    patternColor: [],
    cursor: [],
  },
});
