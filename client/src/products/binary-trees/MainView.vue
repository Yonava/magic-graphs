<script setup lang="ts">
  import GraphProduct from '@ui/product/GraphProduct.vue';
  import { BINARY_TREE_GRAPH_SETTINGS } from './settings';
  import CRUDControls from './ui/CRUDControls.vue';
  import TreeInfoLabels from './ui/TreeInfoLabels.vue';
  import { useTree } from './useTree';
  import AddNodePanel from './ui/AddNodePanel.vue';
  import state from './state';
  import { useGraphWithCanvas } from '@product/shared/useGraphWithCanvas';
  import StopSimButton from '@ui/product/StopSimButton.vue';
  import SimulationPlaybackControls from '@ui/product/sim/SimulationPlaybackControls.vue';
  import { useEscSimulationShortcut } from '@ui/product/useEscSimulationShortcut';

  const { simRunner } = state;

  const graphWithCanvas = useGraphWithCanvas(BINARY_TREE_GRAPH_SETTINGS);
  const { graph } = graphWithCanvas;

  const tree = useTree(graph);

  graph.settings.value.shortcutDelete = () => {
    if (simRunner.value) return;
    const { focusedNodes } = graph.focus;
    if (focusedNodes.value.length === 1)
      tree.removeNode(Number(focusedNodes.value[0].label));
    if (focusedNodes.value.length === graph.nodes.value.length)
      tree.resetTree();
    graph.focus.reset();
  };

  graph.settings.value.shortcutUndo = () => {
    if (simRunner.value) return;
    tree.undo();
  };

  graph.settings.value.shortcutRedo = () => {
    if (simRunner.value) return;
    tree.redo();
  };

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
