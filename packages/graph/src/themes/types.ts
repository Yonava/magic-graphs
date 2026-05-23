import { AnimatedShapeControls } from '@magic/shapes/animation';
import type { FontWeight } from '@magic/shapes/text/types';
import { Shape } from '@magic/shapes/types';
import type { MaybeGetter, UnwrapMaybeGetter } from '@magic/utils/maybeGetter';
import { Builtin, PathValue, Paths } from 'ts-essentials';

import type { NodeAnchor } from '../plugins/anchors/types';
import type { EdgeGetterOrValue, GNode, NodeGetterOrValue } from '../types';

export type TextStyles = {
  text: string;
  textSize: number;
  textColor: string;
  textFontWeight: FontWeight;
};

export type BaseGraphNodeStyles = TextStyles & {
  size: number;
  borderWidth: number;
  borderColor: string;
  color: string;
};

export type BaseGraphNodeTheme = WrapWithNodeGetter<BaseGraphNodeStyles> & {
  shape: (
    node: GNode,
    graphShapes: AnimatedShapeControls['shapes'],
    nodeStyles: BaseGraphNodeStyles,
  ) => Shape | void;
};

export type BaseGraphEdgeStyles = TextStyles & {
  color: string;
  width: number;
};

type BaseGraphThemeGraphStyles = {
  color: string;
  patternColor: string;
};

export type BaseGraphTheme = {
  node: BaseGraphNodeTheme;
  edge: WrapWithEdgeGetter<BaseGraphEdgeStyles>;
  graph: BaseGraphThemeGraphStyles;
};

export type FocusGraphTheme = {
  node: WrapWithNodeGetter<BaseGraphNodeTheme>;
  edge: WrapWithEdgeGetter<BaseGraphEdgeStyles>;
};

export type NodeAnchorGraphTheme = {
  radius: NodeGetterOrValue<number>;
  color: NodeGetterOrValue<string>;
  colorWhenParentFocused: NodeGetterOrValue<string>;
  linkPreviewColor: MaybeGetter<string, [GNode, NodeAnchor]>;
  linkPreviewWidth: MaybeGetter<number, [GNode, NodeAnchor]>;
};

export type MarqueeGraphTheme = {
  color: string;
  borderColor: string;
  encapsulatedNodeBoxColor: string;
  encapsulatedNodeBoxBorderColor: string;
};

export type GraphTheme = {
  node: {
    base: BaseGraphTheme['node'];
    focus: FocusGraphTheme['node'];
  };
  edge: {
    base: BaseGraphTheme['edge'];
    focus: FocusGraphTheme['edge'];
  };
  graph: BaseGraphTheme['graph'];
  nodeAnchor: NodeAnchorGraphTheme;
  marquee: MarqueeGraphTheme;
};

type GraphThemePaths = Paths<GraphTheme>;

type PathsMappingToBuiltIn<Object, T> = T extends T
  ? PathValue<Object, T> extends Builtin
    ? T
    : never
  : never;

export type ValidGraphThemePaths = PathsMappingToBuiltIn<
  GraphTheme,
  GraphThemePaths
>;

/**
 * the raw theme object without any getters
 */
export type GraphThemeRaw = {
  // node.base.text and edge.base.text are special cases which must remain as getters
  [Path in ValidGraphThemePaths]: Path extends
    | 'node.base.text'
    | 'edge.base.text'
    ? PathValue<GraphTheme, Path>
    : UnwrapMaybeGetter<PathValue<GraphTheme, Path>>;
};

type WrapWithNodeGetter<T extends Record<string, any>> = {
  [K in keyof T]: NodeGetterOrValue<T[K]>;
};

type WrapWithEdgeGetter<T extends Record<string, any>> = {
  [K in keyof T]: EdgeGetterOrValue<T[K]>;
};

export type ThemeMapEntry<StyleValue> = {
  value: StyleValue;
  useThemeId: string;
};

type ThemeMapEntries<Object extends Record<string, Builtin>> = {
  [Key in keyof Object]: ThemeMapEntry<Object[Key]>[];
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

const textFields = (): ThemeMapEntries<TextStyles> => ({
  text: [],
  textColor: [],
  textFontWeight: [],
  textSize: [],
});

const nodeFields = (): ThemeMapEntries<BaseGraphNodeTheme> => ({
  ...textFields(),
  borderColor: [],
  borderWidth: [],
  color: [],
  shape: [],
  size: [],
});

const edgeFields = (): ThemeMapEntries<BaseGraphEdgeStyles> => ({
  ...textFields(),
  color: [],
  width: [],
});

export const getInitialThemeMap = (): FullThemeMap => ({
  node: {
    base: nodeFields(),
    focus: nodeFields(),
  },
  edge: {
    base: edgeFields(),
    focus: edgeFields(),
  },
  graph: {
    color: [],
    patternColor: [],
  },
  nodeAnchor: {
    radius: [],
    color: [],
    colorWhenParentFocused: [],
    linkPreviewColor: [],
    linkPreviewWidth: [],
  },
  marquee: {
    color: [],
    borderColor: [],
    encapsulatedNodeBoxColor: [],
    encapsulatedNodeBoxBorderColor: [],
  },
});
