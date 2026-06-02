import { BaseEventMap } from '../../base/events.ts';
import { BaseGraph } from '../../base/types.ts';
import { CanvasEventMap } from './events.ts';

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
