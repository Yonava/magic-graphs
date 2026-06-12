import { nullThrows } from '@magic/utils/assert';

import { computed, shallowRef } from 'vue';

import type { Graph } from './useGraphWithCanvas.ts';

/**
 * if true, developer mode is active
 */
export const devMode = shallowRef(false);

export const graph = shallowRef<Graph>();

export const nonNullGraph = computed(() => {
  return nullThrows(graph.value, 'global graph state is undefined');
});
