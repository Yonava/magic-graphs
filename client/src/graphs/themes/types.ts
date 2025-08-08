import type { NodeAnchor } from '@graph/plugins/anchors/types';
import type { SupportedNodeShapes } from '@graph/schematics/node';
import type { EdgeGetterOrValue, GNode, NodeGetterOrValue } from '@graph/types';
import type { FontWeight } from '@shape/types/utility';
import type {
  MaybeGetter,
  MaybeGetterParams,
  UnwrapMaybeGetter,
} from '@utils/maybeGetter';

export type BaseGraphNodeTheme = {
  nodeSize: number;
  nodeBorderWidth: number;
  nodeColor: string;
  nodeBorderColor: string;
  nodeText: string;
  nodeTextSize: number;
  nodeTextColor: string;
  nodeShape: SupportedNodeShapes;
};

export type BaseGraphEdgeTheme = {
  edgeColor: string;
  edgeWidth: number;
  edgeText: string;
  edgeTextSize: number;
  edgeTextColor: string;
  edgeTextFontWeight: FontWeight;
};

export type BaseGraphTheme = WrapWithNodeGetter<BaseGraphNodeTheme> &
  WrapWithEdgeGetter<BaseGraphEdgeTheme> & {
    graphBgColor: string;
    graphBgPatternColor: string;
  };

export type HistoryGraphTheme = {};

export type FocusGraphTheme = {
  nodeFocusColor: NodeGetterOrValue<string>;
  nodeFocusBorderColor: NodeGetterOrValue<string>;
  nodeFocusTextColor: NodeGetterOrValue<string>;
  edgeFocusColor: EdgeGetterOrValue<string>;
  edgeFocusTextColor: EdgeGetterOrValue<string>;
};

export type DraggableGraphTheme = {};

export type NodeAnchorGraphTheme = {
  nodeAnchorRadius: NodeGetterOrValue<number>;
  nodeAnchorColor: NodeGetterOrValue<string>;
  nodeAnchorColorWhenParentFocused: NodeGetterOrValue<string>;
  linkPreviewColor: MaybeGetter<string, [GNode, NodeAnchor]>;
  linkPreviewWidth: MaybeGetter<number, [GNode, NodeAnchor]>;
};

export type MarqueeGraphTheme = {
  marqueeSelectionBoxColor: string;
  marqueeSelectionBoxBorderColor: string;
  marqueeEncapsulatedNodeBoxColor: string;
  marqueeEncapsulatedNodeBoxBorderColor: string;
};

export type AnnotationGraphTheme = {};

export type PersistentGraphTheme = {};

export type GraphTheme = BaseGraphTheme &
  HistoryGraphTheme &
  FocusGraphTheme &
  DraggableGraphTheme &
  NodeAnchorGraphTheme &
  MarqueeGraphTheme &
  PersistentGraphTheme;

/**
 * the raw theme object without any getters
 */
export type GraphThemeRaw = {
  // nodeText and edgeText are special cases which must remain as getters
  [K in keyof GraphTheme]: K extends 'nodeText' | 'edgeText'
    ? GraphTheme[K]
    : UnwrapMaybeGetter<GraphTheme[K]>;
};

/**
 * decomposes MaybeGetter<T, K> such that it turns T into T | void
 */
export type MaybeGetterOrVoid<T> = MaybeGetter<
  UnwrapMaybeGetter<T> | void,
  MaybeGetterParams<T>
>;

type WrapWithNodeGetter<T extends Record<string, any>> = {
  [K in keyof T]: NodeGetterOrValue<T[K]>;
};

type WrapWithEdgeGetter<T extends Record<string, any>> = {
  [K in keyof T]: EdgeGetterOrValue<T[K]>;
};

export type ThemeMapEntry<T extends keyof GraphTheme> = {
  value: MaybeGetterOrVoid<GraphTheme[T]>;
  useThemeId: string;
};

export type FullThemeMap = {
  [K in keyof GraphTheme]: ThemeMapEntry<K>[];
};

export type PartialThemeMap = Partial<FullThemeMap>;

export const getInitialThemeMap = (): FullThemeMap => ({
  /**
   * base themes
   */
  nodeSize: [],
  nodeBorderWidth: [],
  nodeColor: [],
  nodeBorderColor: [],
  nodeFocusColor: [],
  nodeFocusBorderColor: [],
  nodeText: [],
  nodeFocusTextColor: [],
  nodeTextSize: [],
  nodeTextColor: [],
  nodeShape: [],
  edgeColor: [],
  edgeWidth: [],
  edgeText: [],
  edgeTextSize: [],
  edgeTextColor: [],
  edgeFocusTextColor: [],
  edgeTextFontWeight: [],
  edgeFocusColor: [],

  graphBgColor: [],
  graphBgPatternColor: [],

  /**
   * node anchor themes
   */
  nodeAnchorRadius: [],
  nodeAnchorColor: [],
  nodeAnchorColorWhenParentFocused: [],
  linkPreviewColor: [],
  linkPreviewWidth: [],

  /**
   * marquee themes
   */
  marqueeSelectionBoxColor: [],
  marqueeSelectionBoxBorderColor: [],
  marqueeEncapsulatedNodeBoxColor: [],
  marqueeEncapsulatedNodeBoxBorderColor: [],
});
