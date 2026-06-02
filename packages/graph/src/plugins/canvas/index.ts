import { BaseEventMap } from '../../base/events.ts';
import { BaseGraph } from '../../base/types.ts';
import { GraphWithCanvas } from './types.ts';

export const useCanvasPlugin = <
  TransactionWrapperOptions,
  EventMap extends BaseEventMap,
  Plugins,
>(
  graph: BaseGraph<TransactionWrapperOptions, EventMap, Plugins>,
): GraphWithCanvas<TransactionWrapperOptions, EventMap, Plugins> => {};
