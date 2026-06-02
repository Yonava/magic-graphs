import { Coordinate } from '@magic/canvas/types';

import { BaseEventMap } from '../../base/events.ts';
import { BaseGraph } from '../../base/types.ts';
import { SchemaItem } from '../../types.ts';
import { CanvasEventMap } from './events.ts';

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

type CanvasGraph = {};

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
