/*
 * Naming conventions used throughout this file:
 *
 * StyleValue  — the raw, resolved value that gets painted on the canvas (e.g. string, number, Cursor).
 *               this is what a preset defines and what the renderer ultimately consumes.
 *
 * ThemeValue  — a StyleValue wrapped for the override system via FallthroughThemeValue.
 *               consumers provide ThemeValues: either a static StyleValue or a getter that
 *               may return void to defer ("fall through") to the next override layer or preset.
 *
 * ThemeToken  — a dot-notation path into GraphTheme that addresses a single StyleValue leaf
 *               (e.g. "node.default.color"). used to identify which token an override targets.
 */
import type { FontWeight } from '@magic/shapes/text/types';
import { Shape } from '@magic/shapes/types/index';
import { Color } from '@magic/utils/colors';
import type { MaybeGetter } from '@magic/utils/maybeGetter/index';
import { AnyFunction, Builtin, PathValue, Paths } from 'ts-essentials';

import { CoreGraph } from '../../../core/types.ts';
import { GEdge, GNode } from '../../../types.ts';
import { NodeAnchor } from '../../anchors/types.ts';
import { CanvasGraph } from '../types.ts';
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
  positions: CoreGraph['positions'];
  resolveToken: CanvasGraph['theme']['_resolveToken'];
  edges: CoreGraph['edges'];
  getNode: CoreGraph['getNode'];
  getEdge: CoreGraph['getEdge'];
  helpers: CoreGraph['helpers'];
};

export type CoreGraphNodeTheme = NodeThemeFields<CoreGraphNodeStyles> & {
  shape: (node: GNode, graph: GraphInterface) => Shape | void;
};

export type CoreGraphEdgeStyles = TextStyles & {
  color: string;
  width: number;
};

export type CoreGraphEdgeTheme = EdgeThemeFields<CoreGraphEdgeStyles> & {
  shape: (edge: GEdge, graph: GraphInterface) => Shape | void;
};

type CanvasGraphThemeStyles = {
  color: MaybeGetter<string>;
  patternColor: MaybeGetter<string>;
  cursor: FallthroughThemeValue<() => Cursor | CursorFallback>;
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

type NodeAnchorTheme = NodeThemeFields<NodeAnchorGraphStyles> &
  NodeAnchorLinkPreviewStyles;

export type NodeAnchorGraphTheme = {
  default: NodeAnchorTheme;
  focus: NodeAnchorTheme;
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

type LeafPaths<Schema, Path> = Path extends Path
  ? PathValue<Schema, Path> extends Builtin
    ? Path
    : never
  : never;

export type ThemeToken = LeafPaths<GraphTheme, Paths<GraphTheme>>;

/**
 * a theme token value that supports layered resolution. a static value is used as-is;
 * a getter returning `void` signals "no opinion" and defers to the next override layer,
 * eventually falling back to the active preset.
 */
type FallthroughThemeValue<StyleValueGetter extends AnyFunction> =
  | ReturnType<StyleValueGetter>
  | ((
      ...args: Parameters<StyleValueGetter>
    ) => ReturnType<StyleValueGetter> | void);

type NodeFallthroughThemeValue<StyleValue> = FallthroughThemeValue<
  (node: GNode) => StyleValue
>;
type EdgeFallthroughThemeValue<StyleValue> = FallthroughThemeValue<
  (edge: GEdge) => StyleValue
>;

type NodeThemeFields<T extends Record<string, any>> = {
  [K in keyof T]: NodeFallthroughThemeValue<T[K]>;
};

type EdgeThemeFields<T extends Record<string, any>> = {
  [K in keyof T]: EdgeFallthroughThemeValue<T[K]>;
};

/** a single consumer-defined override for one theme token, tagged with the id of the `createLayer` instance that registered it. */
export type ThemeOverride<ThemeValue> = {
  value: ThemeValue;
  layerId: string;
};

/** recursively transforms a theme shape so every leaf value becomes a `ThemeOverride` array. */
type ToThemeOverrides<T> = [T] extends [Builtin]
  ? ThemeOverride<T>[]
  : T extends Array<infer U>
    ? // handles nested arrays gracefully
      Array<ToThemeOverrides<U>>
    : T extends Function
      ? // leaves methods alone if your theme has helpers
        T
      : T extends object
        ? { [K in keyof T]: ToThemeOverrides<T[K]> }
        : T;

/** the full set of consumer overrides layered on top of the active theme preset. last registered override wins at each token. */
export type ThemeOverrides = ToThemeOverrides<GraphTheme>;

const textFields = (): ToThemeOverrides<TextStyles> => ({
  text: [],
  textColor: [],
  textFontWeight: [],
  textSize: [],
});

const nodeFields = (): ToThemeOverrides<CoreGraphNodeTheme> => ({
  ...textFields(),
  shape: [],
  borderColor: [],
  borderWidth: [],
  color: [],
  size: [],
  cursor: [],
});

const edgeFields = (): ToThemeOverrides<CoreGraphEdgeTheme> => ({
  ...textFields(),
  shape: [],
  color: [],
  width: [],
});

const nodeAnchorFields = (): ToThemeOverrides<NodeAnchorTheme> => ({
  color: [],
  radius: [],
  cursor: [],
  linkPreview: {
    color: [],
    width: [],
  },
});

export const createThemeOverrides = (): ThemeOverrides => ({
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
