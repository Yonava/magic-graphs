import type { FontWeight } from '@magic/shapes/text/types';
import { Shape } from '@magic/shapes/types/index';
import { Color } from '@magic/utils/colors';
import type { MaybeGetter } from '@magic/utils/maybeGetter/index';
import { AnyFunction, Builtin, PathValue, Paths } from 'ts-essentials';

import { CoreGraph } from '../core/types.ts';
import type { NodeAnchor } from '../plugins/anchors/types.ts';
import { CanvasGraph } from '../plugins/canvas/types.ts';
import type { GEdge, GNode } from '../types.ts';
import { Cursor, CursorFallback } from './cursor.ts';

export type TextStyles = {
  text: string;
  textSize: number;
  textColor: string;
  textFontWeight: FontWeight;
};

export type CoreGraphNodeStyles = TextStyles & {
  size: number;
  borderWidth: number;
  borderColor: string;
  color: string;
  cursor: Cursor;
};

export type GraphInterface = {
  shapes: CanvasGraph['shapes'];
  settings: CoreGraph['settings'];
  getTheme: CoreGraph['getTheme'];
  edges: CoreGraph['edges'];
  getNode: CoreGraph['getNode'];
  getEdge: CoreGraph['getEdge'];
  helpers: CoreGraph['helpers'];
};

export type CoreGraphNodeTheme =
  WrapWithNodeThemeGetter<CoreGraphNodeStyles> & {
    shape: (node: GNode, graph: GraphInterface) => Shape | void;
  };

export type CoreGraphEdgeStyles = TextStyles & {
  color: string;
  width: number;
};

export type CoreGraphEdgeTheme =
  WrapWithEdgeThemeGetter<CoreGraphEdgeStyles> & {
    shape: (edge: GEdge, graph: GraphInterface) => Shape | void;
  };

type CanvasGraphThemeStyles = {
  color: MaybeGetter<string>;
  patternColor: MaybeGetter<string>;
  cursor: ThemeGetterOrValue<() => Cursor | CursorFallback>;
};

export type CoreGraphTheme = {
  node: CoreGraphNodeTheme;
  edge: CoreGraphEdgeTheme;
  canvas: CanvasGraphThemeStyles;
};

export type FocusGraphTheme = {
  node: CoreGraphNodeTheme;
  edge: CoreGraphEdgeTheme;
};

type NodeAnchorGraphStyles = {
  radius: number;
  color: Color;
  cursor: Cursor;
};

type NodeAnchorLinkPreviewStyles = {
  linkPreview: {
    color: MaybeGetter<string, [GNode, NodeAnchor]>;
    width: MaybeGetter<number, [GNode, NodeAnchor]>;
  };
};

type NodeAnchorGraphThemeRecord =
  WrapWithNodeThemeGetter<NodeAnchorGraphStyles> & NodeAnchorLinkPreviewStyles;

export type NodeAnchorGraphTheme = {
  default: NodeAnchorGraphThemeRecord;
  focus: NodeAnchorGraphThemeRecord;
};

export type MarqueeGraphTheme = {
  color: string;
  borderColor: string;
  encapsulatedNodeBox: {
    color: string;
    borderColor: string;
    cursor: Cursor;
  };
};

export type GraphTheme = {
  node: {
    default: CoreGraphTheme['node'];
    focus: FocusGraphTheme['node'];
  };
  edge: {
    default: CoreGraphTheme['edge'];
    focus: FocusGraphTheme['edge'];
  };
  canvas: CoreGraphTheme['canvas'];
  nodeAnchor: NodeAnchorGraphTheme;
  marquee: MarqueeGraphTheme;
};

type GraphThemePaths = Paths<GraphTheme>;

type PathsMappingToBuiltIn<Object, T> = T extends T
  ? PathValue<Object, T> extends Builtin
    ? T
    : never
  : never;

export type ValidGraphThemePath = PathsMappingToBuiltIn<
  GraphTheme,
  GraphThemePaths
>;

type ThemeGetterOrValue<Getter extends AnyFunction> =
  | ReturnType<Getter>
  | ((...args: Parameters<Getter>) => ReturnType<Getter> | void);

type NodeThemeGetterOrValue<ThemeValue> = ThemeGetterOrValue<
  (node: GNode) => ThemeValue
>;
type EdgeThemeGetterOrValue<ThemeValue> = ThemeGetterOrValue<
  (edge: GEdge) => ThemeValue
>;

type WrapWithNodeThemeGetter<T extends Record<string, any>> = {
  [K in keyof T]: NodeThemeGetterOrValue<T[K]>;
};

type WrapWithEdgeThemeGetter<T extends Record<string, any>> = {
  [K in keyof T]: EdgeThemeGetterOrValue<T[K]>;
};

export type ThemeMapEntry<StyleValue> = {
  value: StyleValue;
  useThemeId: string;
};

type DeepThemeMapEntry<T> = [T] extends [Builtin]
  ? ThemeMapEntry<T>[]
  : T extends Array<infer U>
    ? // handles nested arrays gracefully
      Array<DeepThemeMapEntry<U>>
    : T extends Function
      ? // leaves methods alone if your theme has helpers
        T
      : T extends object
        ? { [K in keyof T]: DeepThemeMapEntry<T[K]> }
        : T;

export type FullThemeMap = DeepThemeMapEntry<GraphTheme>;

const textFields = (): DeepThemeMapEntry<TextStyles> => ({
  text: [],
  textColor: [],
  textFontWeight: [],
  textSize: [],
});

const nodeFields = (): DeepThemeMapEntry<CoreGraphNodeTheme> => ({
  ...textFields(),
  shape: [],
  borderColor: [],
  borderWidth: [],
  color: [],
  size: [],
  cursor: [],
});

const edgeFields = (): DeepThemeMapEntry<CoreGraphEdgeTheme> => ({
  ...textFields(),
  shape: [],
  color: [],
  width: [],
});

const nodeAnchorFields = (): DeepThemeMapEntry<NodeAnchorGraphThemeRecord> => ({
  color: [],
  radius: [],
  cursor: [],
  linkPreview: {
    color: [],
    width: [],
  },
});

export const getInitialThemeMap = (): FullThemeMap => ({
  node: {
    default: nodeFields(),
    focus: nodeFields(),
  },
  edge: {
    default: edgeFields(),
    focus: edgeFields(),
  },
  canvas: {
    color: [],
    patternColor: [],
    cursor: [],
  },
  nodeAnchor: {
    default: nodeAnchorFields(),
    focus: nodeAnchorFields(),
  },
  marquee: {
    color: [],
    borderColor: [],
    encapsulatedNodeBox: {
      color: [],
      borderColor: [],
      cursor: [],
    },
  },
});
