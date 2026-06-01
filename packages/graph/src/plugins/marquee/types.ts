import { ComputedRef } from 'vue';

import { BaseEventMap } from '../../base/events.ts';
import { BaseGraph } from '../../base/types.ts';
import { FocusGraphEventMap } from '../focus/events.ts';
import { FocusPlugin, FocusTransactionWrapperOptions } from '../focus/types.ts';
import { MarqueeEventMap } from './events.ts';

export type MarqueeGraph = {
  /**
   * updates the bounding box around the nodes that are currently focused.
   * use this when you are changing theme or position outside of the standard supported use cases
   */
  updateEncapsulatedNodeBox: () => void;
  /**
   * true when the marquee box is being actively sized by user
   */
  activelySelecting: ComputedRef<boolean>;
};

type MarqueePlugin = {
  /**
   * history plugin controls
   */
  marquee: MarqueeGraph;
};

export type GraphWithMarquee<
  TransactionWrapperOptions,
  GraphEventMap extends BaseEventMap,
  Plugins,
> = BaseGraph<
  TransactionWrapperOptions & FocusTransactionWrapperOptions,
  GraphEventMap & FocusGraphEventMap & MarqueeEventMap,
  Plugins & FocusPlugin & MarqueePlugin
>;
