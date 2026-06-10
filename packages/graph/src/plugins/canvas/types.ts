import { Coordinate, MagicCanvasProps } from '@magic/canvas/types';
import { AnimatedShapeControls } from '@magic/shapes/animation/index';
import { DeepReadonly } from 'ts-essentials';

import { Ref, ShallowRef } from 'vue';

import { CoreEventMap } from '../../core/events.ts';
import { CoreGraph } from '../../core/types.ts';
import { CanvasElement } from '../../types.ts';
import { GraphCursor } from './cursor/types.ts';
import { CanvasEventMap } from './events.ts';
import { AggregatorProps } from './useAggregator.ts';

export type GraphUnderCursor = {
  /**
   * coordinates of the cursor
   */
  coords: Coordinate;
  /**
   * the schema items under the cursor
   */
  items: CanvasElement[];
};

export type CanvasGraph = {
  /** @internal */
  magicCanvas: MagicCanvasProps;
  /**
   * manages the set of schema items rendered on the canvas.
   * use `aggregator.transformers` to register custom schema items for your extension.
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
   * the schema items currently under the cursor and the cursor's canvas coordinates.
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
