import type { GraphSettings } from '@graph/settings';
import { arrowEdgeAdded } from '@graph/base/animations';
import { AUTO_ANIMATE_DURATION_MS } from '@shape/animation/autoAnimate';

/**
 * settings for basic search useGraph instance
 */
export const BINARY_TREE_GRAPH_SETTINGS: Partial<GraphSettings> = {
  persistentStorageKey: 'binary-trees',
  interactive: false,
  displayEdgeLabels: false,
  animations: (defineTimeline) => ({
    arrow: {
      edgeAdded: defineTimeline({
        ...arrowEdgeAdded,
        delayMs: AUTO_ANIMATE_DURATION_MS,
      }),
    }
  })
};
