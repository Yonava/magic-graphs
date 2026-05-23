import { AnimatedShapeControls } from '@magic/shapes/animation';
import type { FontWeight } from '@magic/shapes/text/types';
import { Shape } from '@magic/shapes/types';
import type { MaybeGetter } from '@magic/utils/maybeGetter';
import { Builtin, PathValue, Paths } from 'ts-essentials';

import { Ref } from 'vue';

import type { NodeAnchor } from '../plugins/anchors/types';
import { GraphSettings } from '../settings';
import type {
  EdgeGetterOrValue,
  GEdge,
  GNode,
  NodeGetterOrValue,
} from '../types';
import { ThemeGetter } from './getThemeResolver';

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

export type GraphInterface = {
  shapes: AnimatedShapeControls['shapes'];
  settings: Ref<GraphSettings>;
  getTheme: ThemeGetter;
  edges: Ref<GEdge[]>;
  getNode: (id: GNode['id']) => GNode | undefined;
  getEdge: (id: GEdge['id']) => GEdge | undefined;
};

export type BaseGraphNodeTheme = WrapWithNodeGetter<BaseGraphNodeStyles> & {
  shape: (
    node: GNode,
    graphShapes: GraphInterface,
    styles: BaseGraphNodeStyles,
  ) => Shape | void;
};

export type BaseGraphEdgeStyles = TextStyles & {
  color: string;
  width: number;
};

export type BaseGraphEdgeTheme = WrapWithEdgeGetter<BaseGraphEdgeStyles> & {
  shape: (
    edge: GEdge,
    graphShapes: GraphInterface,
    styles: BaseGraphEdgeStyles,
  ) => Shape | void;
};

type BaseGraphThemeGraphStyles = {
  color: string;
  patternColor: string;
};

export type BaseGraphTheme = {
  node: BaseGraphNodeTheme;
  edge: BaseGraphEdgeTheme;
  graph: BaseGraphThemeGraphStyles;
};

export type FocusGraphTheme = {
  node: BaseGraphNodeTheme;
  edge: BaseGraphEdgeTheme;
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
  shape: [],
  borderColor: [],
  borderWidth: [],
  color: [],
  size: [],
});

const edgeFields = (): ThemeMapEntries<BaseGraphEdgeTheme> => ({
  ...textFields(),
  shape: [],
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
