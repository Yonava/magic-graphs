<script setup lang="ts">
  import GraphProduct from '@ui/product/GraphProduct.vue';
  import { BINARY_TREE_GRAPH_SETTINGS } from './settings';
  import CRUDControls from './ui/CRUDControls.vue';
  import TreeInfoLabels from './ui/TreeInfoLabels.vue';
  import { useTree } from './useTree';
  import AddNodePanel from './ui/AddNodePanel.vue';
  import state from './state';
  import TreeSimMenu from './ui/TreeSimMenu.vue';
  import { useGraphWithCanvas } from '@product/shared/useGraphWithCanvas';

  const { activeSim } = state;

  const graphWithCanvas = useGraphWithCanvas(BINARY_TREE_GRAPH_SETTINGS);
  const { graph } = graphWithCanvas;

  const tree = useTree(graph);

  graph.settings.value.shortcutDelete = () => {
    const { focusedNodes } = graph.focus;
    if (focusedNodes.value.length === 1)
      tree.removeNode(Number(focusedNodes.value[0].label));
    if (focusedNodes.value.length === graph.nodes.value.length)
      tree.resetTree();
    graph.focus.reset();
  };

  graph.settings.value.shortcutUndo = () => {
    if (activeSim.value) return;
    tree.undo();
  };

  graph.settings.value.shortcutRedo = () => {
    if (activeSim.value) return;
    tree.redo();
  };
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas">
    <template #top-center>
      <TreeInfoLabels :tree="tree" />
    </template>

    <template #center-left>
      <AddNodePanel
        v-if="!activeSim"
        :tree="tree"
      />
    </template>

    <template #bottom-center>
      <CRUDControls
        v-if="!activeSim"
        :tree="tree"
      />
      <TreeSimMenu
        v-else
        :controls="activeSim"
      />
    </template>
  </GraphProduct>
</template>
