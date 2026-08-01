import { AnimatedShapeControls } from '@canvas/primitives/animation/index';
import { CanvasProps, Coordinate } from '@canvas/surface/types';
import {
  GraphPlugin,
  WithEvents,
  WithTheme,
} from '@graph/plugins-shared/plugins';
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
  /**
   * the topmost (active) canvas element under the cursor, equivalent to `elements.at(-1)`.
   */
  readonly topElement: CanvasElement | undefined;
};

type BaseCanvasControls = {
  /** @internal */
  magicCanvas: CanvasProps;
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
   *
   * recomputed every frame against the canvas as drawn, so anything your extension adds
   * to the aggregator is hit-tested automatically. `onGraphUnderCursorChange` is triggered
   * on the frames where the answer changes.
   */
  graphUnderCursor: DeepReadonly<GraphUnderCursor>;
  getNodePriority: () => (nodeId: string) => number;
};

export type CanvasControls = WithEvents<
  WithTheme<BaseCanvasControls, CanvasThemes>,
  CanvasEventMap
>;

type CanvasTransitPayload = {
  panX: number;
  panY: number;
  zoom: number;
};

export type CanvasPlugin = GraphPlugin<{
  name: 'canvas';
  controls: CanvasControls;
  transit: CanvasTransitPayload;
  events: CanvasEventMap;
}>;
