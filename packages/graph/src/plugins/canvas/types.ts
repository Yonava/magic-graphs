import { Coordinate, MagicCanvasProps } from '@magic/canvas/types';
import { AnimatedShapeControls } from '@magic/shapes/animation/index';
import { Shape } from '@magic/shapes/types/index';
import { DeepReadonly } from 'ts-essentials';

import { Ref, ShallowRef } from 'vue';

import { CoreEventMap } from '../../core/events.ts';
import { CoreGraph } from '../../core/types.ts';
import { GraphCursor } from './cursor/types.ts';
import { CanvasEventMap } from './events.ts';
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

export type CanvasGraph = {
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
  /**
   * tools to customize the style of the cursor
   */
  cursor: GraphCursor;
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

export type CanvasPlugin = {
  /**
   * graph canvas plugin controls
   */
  canvas: CanvasGraph;
};

export type GraphWithCanvas<
  TransactionWrapperOptions,
  EventMap extends CoreEventMap,
  Plugins,
> = CoreGraph<
  TransactionWrapperOptions,
  EventMap & CanvasEventMap,
  Plugins & CanvasPlugin
>;
