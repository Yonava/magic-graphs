import { CoreEdge, CoreNode } from '@magic/graph/types';
import type { FontWeight } from '@magic/shapes/text/types';
import { Shape } from '@magic/shapes/types/index';
import { Color } from '@magic/utils/colors';

import { Cursor, CursorFallback } from './theme/cursor.ts';
import { AsStyleValue, ThemeValue, ToThemeOverrides } from './theme/types.ts';

type TextStyleValues = {
  text: string;
  textSize: number;
  textColor: Color;
  textFontWeight: FontWeight;
};

type NodeStyleValues = TextStyleValues & {
  shape: AsStyleValue<Shape>;
  size: number;
  borderWidth: number;
  borderColor: Color;
  color: Color;
  cursor: Cursor;
};

type EdgeStyleValues = TextStyleValues & {
  shape: AsStyleValue<Shape>;
  color: Color;
  width: number;
};

type NodeThemeValues = {
  [K in keyof NodeStyleValues]: ThemeValue<
    NodeStyleValues[K],
    [node: CoreNode]
  >;
};

type EdgeThemeValue = {
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
  node: {
    default: NodeThemeValues;
  };
  edge: {
    default: EdgeThemeValue;
  };
  canvas: CanvasThemeValues;
};

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

export const createCanvasThemeOverrides =
  (): ToThemeOverrides<CanvasThemes> => ({
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
