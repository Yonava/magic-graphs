import { computed, ref } from "vue";
import type { Graph } from "@graph/types";
import { prim } from "./prim";

export const usePrim = (graph: Graph) => {
  /**
   * just the mst array, to get the first n steps, slice the array at (0, n)
   */
  const trace = ref(prim(graph));

  const update = () => trace.value = prim(graph);

  graph.subscribe("onStructureChange", update);

  return {
    output: {
      mst: computed(() => trace.value.at(-1)),
    },
    trace: computed(() => trace.value),
  }
};
