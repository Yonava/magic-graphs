import { computed, shallowRef } from "vue";
import type { GEdge, GNode, Graph } from "./types";
import type { Annotation } from "./plugins/annotations/types";

/**
 * if true, stats are displayed on screen
 */
export const inDevMode = shallowRef(false)

export const graph = shallowRef<Graph>();

export const nonNullGraph = computed(() => {
  if (!graph.value) {
    throw new Error('global graph state is undefined');
  }

  return graph.value;
});

/**
 * when switching between products, if this is set, the graph will be loaded with this state
 */
export const queuedGraphStateLoadout = shallowRef<{
  nodes: GNode[];
  edges: GEdge[];
}>();

/**
 * when switching between products, if this is set, the annotations will be loaded with this state
 */
export const queuedGraphAnnotationState = shallowRef<Annotation[]>();

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
export const MOUSE_BUTTONS = {
  left: 0,
  middle: 1,
  right: 2,
} as const;
