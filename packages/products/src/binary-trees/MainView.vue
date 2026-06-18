<script setup lang="ts">
  import GraphProduct from '../shared/ui/general/GraphProduct.vue';
  import StopSimButton from '../shared/ui/general/StopSimButton.vue';
  import SimulationPlaybackControls from '../shared/ui/general/sim/SimulationPlaybackControls.vue';
  import { useEscSimulationShortcut } from '../shared/ui/general/useEscSimulationShortcut.ts';
  import { useGraphWithCanvas } from '../shared/useGraphWithCanvas.ts';
  import { BINARY_TREE_GRAPH_SETTINGS } from './settings.ts';
  import state from './state.ts';
  import AddNodePanel from './ui/AddNodePanel.vue';
  import CRUDControls from './ui/CRUDControls.vue';
  import TreeInfoLabels from './ui/TreeInfoLabels.vue';
  import { useTree } from './useTree.ts';

  const { simRunner } = state;

  const graphWithCanvas = useGraphWithCanvas(BINARY_TREE_GRAPH_SETTINGS);
  const { graph } = graphWithCanvas;

  const tree = useTree(graph);

  graph.settings.value.shortcutDelete = () => {
    if (simRunner.value) return;
    const { focusedNodes } = graph.focus;
    if (focusedNodes.value.length === 1)
      tree.removeNode(Number(graph.nodeLabel.get(focusedNodes.value[0].id)));
    if (focusedNodes.value.length === graph.nodes.value.length)
      tree.resetTree();
    graph.focus.clear();
  };

  graph.settings.value.shortcutUndo = () => !simRunner.value && tree.undo();
  graph.settings.value.shortcutRedo = () => !simRunner.value && tree.redo();

  useEscSimulationShortcut(() => simRunner.value?.stop());
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas">
    <template #top-center>
      <TreeInfoLabels :tree="tree" />
    </template>

    <template #center-left>
      <AddNodePanel
        v-if="!simRunner"
        :tree="tree"
      />
    </template>

    <template #bottom-center>
      <CRUDControls
        v-if="!simRunner"
        :tree="tree"
      />
      <SimulationPlaybackControls
        v-else
        :controls="simRunner.simControls"
      />
    </template>

    <template #top-right>
      <StopSimButton
        v-if="simRunner"
        @click="simRunner.stop"
      />
    </template>
  </GraphProduct>
</template>
