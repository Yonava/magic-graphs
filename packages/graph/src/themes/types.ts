import { AnimatedShapeControls } from '@magic/shapes/animation/index';
import type { FontWeight } from '@magic/shapes/text/types';
import { Shape } from '@magic/shapes/types/index';
import { Color } from '@magic/utils/colors';
import type { MaybeGetter } from '@magic/utils/maybeGetter/index';
import { Builtin, PathValue, Paths } from 'ts-essentials';

import { Ref } from 'vue';

import { BaseGraph } from '../base/types.ts';
import type { NodeAnchor } from '../plugins/anchors/types.ts';
import { GraphSettings } from '../settings/index.ts';
import type { GEdge, GNode } from '../types.ts';
import { ThemeGetter } from './getThemeResolver.ts';

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

export type GraphInterface = Pick<
  BaseGraph,
  'shapes' | 'settings' | 'getTheme' | 'edges' | 'getNode' | 'getEdge'
>;

export type BaseGraphNodeTheme = WrapWithNodeGetter<BaseGraphNodeStyles> & {
  shape: (node: GNode, graph: GraphInterface) => Shape | void;
};

export type BaseGraphEdgeStyles = TextStyles & {
  color: string;
  width: number;
};

export type BaseGraphEdgeTheme = WrapWithEdgeGetter<BaseGraphEdgeStyles> & {
  shape: (edge: GEdge, graph: GraphInterface) => Shape | void;
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

type NodeAnchorGraphStyles = {
  radius: number;
  color: Color;
};

type NodeAnchorLinkPreviewStyles = {
  linkPreviewColor: MaybeGetter<string, [GNode, NodeAnchor]>;
  linkPreviewWidth: MaybeGetter<number, [GNode, NodeAnchor]>;
};

type NodeAnchorGraphThemeRecord = WrapWithNodeGetter<NodeAnchorGraphStyles> &
  NodeAnchorLinkPreviewStyles;

export type NodeAnchorGraphTheme = {
  base: NodeAnchorGraphThemeRecord;
  focus: NodeAnchorGraphThemeRecord;
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

export type ValidGraphThemePath = PathsMappingToBuiltIn<
  GraphTheme,
  GraphThemePaths
>;

type NodeGetterOrValue<T> = T | ((node: GNode) => T | void);
type EdgeGetterOrValue<T> = T | ((edge: GEdge) => T | void);

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

const nodeAnchorFields = (): ThemeMapEntries<NodeAnchorGraphThemeRecord> => ({
  color: [],
  radius: [],
  linkPreviewColor: [],
  linkPreviewWidth: [],
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
    base: nodeAnchorFields(),
    focus: nodeAnchorFields(),
  },
  marquee: {
    color: [],
    borderColor: [],
    encapsulatedNodeBoxColor: [],
    encapsulatedNodeBoxBorderColor: [],
  },
});
