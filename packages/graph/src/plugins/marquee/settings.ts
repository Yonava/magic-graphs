import { SchemaItem } from '../../types.ts';

export type MarqueeGraphSettings = {
  /**
   * whether marquee selection is enabled
   * @default true
   */
  marquee: boolean;
  /**
   * the types of graph items that can be marquee-selected
   * @default ['node', 'edge']
   */
  marqueeSelectableGraphTypes: SchemaItem['graphType'][];
};

export const DEFAULT_MARQUEE_SETTINGS: MarqueeGraphSettings = {
  marquee: true,
  marqueeSelectableGraphTypes: ['node', 'edge'],
};
