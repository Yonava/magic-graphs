import { Coordinate, MagicCanvasProps } from '@magic/canvas/types';
import { CoreEventMap } from '@magic/graph/core/events';
import { GraphCoreControls } from '@magic/graph/core/types';
import { GraphPlugin } from '@magic/graph/plugins/types';
import { AnimatedShapeControls } from '@magic/shapes/animation/index';
import { Shape } from '@magic/shapes/types/index';
import { DeepReadonly } from 'ts-essentials';

import { ComputedRef, Ref, ShallowRef } from 'vue';

import { CanvasEventMap } from './events.ts';
import { ThemeLayer } from './themes/createLayer.ts';
import { TokenResolver } from './themes/createTokenResolver.ts';
import { AllThemePresets, ThemePreset } from './themes/index.ts';
import { ThemeOverrides } from './themes/types.ts';
import { AggregatorProps } from './useAggregator.ts';

export type GraphUnderCursor = {
  /**
   * coordinates of the cursor
   */
  coords: Coordinate;
  /**
   * the canvas elements under the cursor
   */
  elements: CanvasElement[];
};

export type CanvasPluginControls = {
  /** @internal */
  magicCanvas: MagicCanvasProps;
  /**
   * manages the set of canvas elements rendered on the canvas.
   * use `aggregator.transformers` to register custom canvas elements for your extension.
   */
  aggregator: AggregatorProps;
  /**
   * controls for adding and managing animated shapes on the canvas.
   */
  shapes: AnimatedShapeControls;
  /**
   * whether the canvas is currently focused in the browser
   */
  focused: Ref<boolean>;
  /**
   * whether the canvas is currently hovered by the mouse
   */
  hovered: ShallowRef<boolean>;
  /**
   * the canvas elements currently under the cursor and the cursor's canvas coordinates.
   * updated on mouse move and on any graph mutation that affects what is under the cursor.
   */
  graphUnderCursor: DeepReadonly<GraphUnderCursor>;
  /**
   * forces an update to `graphUnderCursor` with the latest canvas state,
   * triggering the `onGraphUnderCursorChange` event.
   *
   * ℹ️ use this when your extension renders content outside the graph's built-in APIs
   * (e.g. custom shapes or overlays) and needs to notify the system that cursor
   * hit-testing may have changed.
   */
  forceUpdateGraphUnderCursor: () => DeepReadonly<GraphUnderCursor>;

  theme: {
    /** the active preset providing StyleValue fallbacks when no override layer covers a token. */
    resolvedPreset: ComputedRef<AllThemePresets[ThemePreset]>;
    /** the currently active preset name. */
    activePreset: Ref<ThemePreset>;
    /** @internal resolves a ThemeToken through the override stack to its final StyleValue. */
    _resolveToken: TokenResolver;
    /** @internal the full override stack — all ThemeOverride arrays keyed by token. */
    _overrides: ThemeOverrides;
    /** creates a scoped override layer for pushing ThemeValues into the stack. */
    createLayer: (layerId?: string) => ThemeLayer;
  };
};

/**
 * the array in which canvas elements are added into in order to be rendered on the canvas
 */
export type Aggregator = CanvasElement[];

/**
 * a function that takes an `aggregator` and returns an `aggregator` with alterations to
 * the internal contents, these functions are layered on top of each other to create a pipeline
 * which will be invoked with a reducer each render cycle
 */
export type AggregatorTransformer = (aggregator: Aggregator) => Aggregator;
type CoreGraphTypes = 'node' | 'edge';
type MarqueeGraphTypes = 'marquee-box' | 'encapsulated-node-box';
type NodeAnchorGraphTypes = 'node-anchor' | 'link-preview';
type AnnotationGraphTypes = 'annotation' | 'annotation-eraser';

/**
 * an element that can be fed into the `aggregator` in order to be rendered on the canvas
 */
export type CanvasElement = {
  /**
   * unique identifier for this element
   */
  id: string;
  /**
   * 🚨
   * TODO explore deprecating: https://github.com/Yonava/magic-graphs/issues/652
   * 🚨
   *
   * the type of graph data this element represents (node, edge, etc.)
   */
  graphType:
    | CoreGraphTypes
    | NodeAnchorGraphTypes
    | MarqueeGraphTypes
    | AnnotationGraphTypes;
  /**
   * determines the rendering order on the canvas.
   *
   * ℹ️ elements with lower priority values are rendered earlier and appear
   * visually beneath items with higher values.
   */
  priority: number;
  /**
   * the {@link Shape | shape} to be rendered on the canvas
   */
  shape: Shape;
  /**
   * attached metadata
   */
  data?: Record<string, unknown>;
};

export type CanvasPlugin = GraphPlugin<{
  controls: { canvas: CanvasPluginControls };
  events: CanvasEventMap;
  actions: {};
}>;
