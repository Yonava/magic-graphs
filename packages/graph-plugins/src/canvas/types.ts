import { Coordinate, MagicCanvasProps } from '@magic/canvas/types';
import { GraphPlugin, WithTheme } from '@graph/plugins-shared/plugins';
import { AnimatedShapeControls } from '@magic/shapes/animation/index';
import { DeepReadonly } from 'ts-essentials';

import { AggregatorControls } from './aggregator/createAggregator.ts';
import { CanvasElement } from './aggregator/types.ts';
import { CanvasEventMap } from './events.ts';
import { CanvasThemes } from './themes.ts';

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

type BaseCanvasControls = {
  /** @internal */
  magicCanvas: MagicCanvasProps;
  /**
   * manages the set of canvas elements rendered on the canvas.
   * use `aggregator.transformers` to register custom canvas elements for your extension.
   */
  aggregator: AggregatorControls;
  /**
   * controls for adding and managing animated shapes on the canvas.
   */
  shapes: AnimatedShapeControls;
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
  getNodePriority: () => (nodeId: string) => number;
};

export type CanvasControls = WithTheme<BaseCanvasControls, CanvasThemes>;

export type CanvasPlugin = GraphPlugin<{
  name: 'canvas';
  controls: CanvasControls;
  events: CanvasEventMap;
}>;
