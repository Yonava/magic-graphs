import type { GraphSettings } from '@graph/settings';

/**
 * settings for MST useGraph instance
 */
export const MST_GRAPH_SETTINGS: Partial<GraphSettings> = {
  persistentStorageKey: 'min-spanning-tree',
  isGraphDirected: false,
  edgeInputToLabel: (input) => {
    const parsedInput = Number(input);
    const isNegative = parsedInput < 0;
    const isNotNumber = isNaN(parsedInput);
    if (isNegative || isNotNumber) return;
    return parsedInput.toString();
  },
};
