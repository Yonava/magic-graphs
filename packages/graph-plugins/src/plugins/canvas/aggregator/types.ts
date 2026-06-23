import { Shape } from '@magic/shapes/types/index';

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
   * TODO remove this field: https://github.com/Yonava/magic-graphs/issues/652
   * 🚨
   *
   * the type of graph data this element represents (node, edge, etc.)
   * @deprecated
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
