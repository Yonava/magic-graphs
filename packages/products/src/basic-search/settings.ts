import type { GraphSettings } from '@magic/graph/settings/index';

/**
 * settings for basic search useGraph instance
 */
export const BASIC_SEARCH_GRAPH_SETTINGS: Partial<GraphSettings> = {
  isGraphWeighted: false,
  localStorageKey: 'basic-search',
};
