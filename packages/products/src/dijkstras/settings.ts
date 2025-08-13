import type { GraphSettings } from '@graph/settings';

/**
 * settings for dijkstras useGraph instance
 */
export const DIJKSTRAS_GRAPH_SETTINGS: Partial<GraphSettings> = {
  persistentStorageKey: 'dijkstras',
  userAddedEdgeRuleNoSelfLoops: true,
  userAddedEdgeRuleOneEdgePerPath: true,
  edgeInputToLabel: (input) => {
    const number = parseInt(input);
    if (isNaN(number)) return;
    const isNegative = number < 0;
    if (isNegative) return;
    return number.toString();
  },
};
