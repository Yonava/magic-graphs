import { computed, shallowRef } from "vue";
import type { Graph } from "./types";

/**
 * if true, developer mode is active
 */
export const devMode = shallowRef(false)

export const graph = shallowRef<Graph>();

export const nonNullGraph = computed(() => {
  if (!graph.value) {
    throw new Error('global graph state is undefined');
  }

  return graph.value;
});
