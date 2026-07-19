import { Graph } from '@graph/create-graph/index';
import { CoreEdge, CoreNode } from '@graph/primitives/types';

import { ComputedRef, Ref, computed, ref, watch } from 'vue';

type CoreGraph<PresetName extends string> = Graph<{
  plugins: [];
  presetName: PresetName;
}>;

type UseCreateGraphReturn<PresetName extends string> = {
  nodes: ComputedRef<CoreNode[]>;
  edges: ComputedRef<CoreEdge[]>;
  activePreset: Ref<PresetName>;
};

/** wrapper for create graph (theme-able) */
export const useCreateGraph = <PresetName extends string>(
  graph: CoreGraph<PresetName>,
): UseCreateGraphReturn<PresetName> => {
  const nodes = ref<CoreNode[]>([...graph.nodes]);
  const edges = ref<CoreEdge[]>([...graph.edges]);

  graph.events.core.subscribe('onTransactionComplete', () => {
    nodes.value = [...graph.nodes];
    edges.value = [...graph.edges];
  });

  // TODO ensure that consumers only have access to either ref setters or ag-graph setters for ref syncing
  const activePreset = ref(graph.theme.activePresetName()) as Ref<PresetName>;

  watch(activePreset, (v) => {
    graph.theme.setActivePreset(v);
  });

  return {
    nodes: computed(() => nodes.value),
    edges: computed(() => edges.value),
    activePreset,
  };
};
