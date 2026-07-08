import { Graph } from '@magic/create-graph/index';
import { CoreEdge, CoreNode } from '@magic/graph-primitives/types';

import { computed, ref, watch } from 'vue';

type CoreGraph<PresetName extends string> = Graph<{
  plugins: [];
  presetName: PresetName;
}>;

/** wrapper for create graph (theme-able) */
export const useCreateGraph = <PresetName extends string>(
  graph: CoreGraph<PresetName>,
) => {
  const nodes = ref<CoreNode[]>([...graph.nodes]);
  const edges = ref<CoreEdge[]>([...graph.edges]);

  graph.events.subscribe('onTransactionComplete', () => {
    nodes.value = [...graph.nodes];
    edges.value = [...graph.edges];
  });

  const activePreset = ref(graph.theme.activePresetName());

  watch(activePreset, (v) => {
    graph.theme.setActivePreset(v);
  });

  return {
    nodes: computed(() => nodes.value),
    edges: computed(() => edges.value),
    activePreset,
  };
};
