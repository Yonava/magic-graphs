import { Coordinate, MagicCanvasProps } from '@magic/canvas/types';
import { AnimatedShapeControls } from '@magic/shapes/animation/index';

import { Ref, ShallowRef } from 'vue';

import { BaseEventMap } from '../../base/events.ts';
import { BaseGraph } from '../../base/types.ts';
import { SchemaItem } from '../../types.ts';
import { GraphCursor } from './cursor/types.ts';
import { CanvasEventMap } from './events.ts';
import { AggregatorProps } from './useAggregator.ts';

/**
 * stores info about the last mouse position on the graph
 */
export type GraphAtMousePosition = {
  /**
   * coordinates translated to the graph's coordinate system
   */
  coords: Coordinate;
  /**
   * the schema items at the coordinates of the mouse
   */
  items: SchemaItem[];
};

export type CanvasGraph = {
  magicCanvas: MagicCanvasProps;
  aggregator: AggregatorProps;
  shapes: AnimatedShapeControls;
  /**
   * whether the canvas is currently focused in the browser
   */
  canvasFocused: Ref<boolean>;
  /**
   * whether the canvas is currently hovered by the mouse
   */
  canvasHovered: ShallowRef<boolean>;

  graphAtMousePosition: Ref<GraphAtMousePosition>;
  updateGraphAtMousePosition: () => GraphAtMousePosition;
  cursor: GraphCursor;
};

export type CanvasPlugin = {
  /**
   * graph canvas plugin controls
   */
  canvas: CanvasGraph;
};

export type GraphWithCanvas<
  TransactionWrapperOptions,
  EventMap extends BaseEventMap,
  Plugins,
> = BaseGraph<
  TransactionWrapperOptions,
  EventMap & CanvasEventMap,
  Plugins & CanvasPlugin
>;
