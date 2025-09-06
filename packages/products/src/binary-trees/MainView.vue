<script setup lang="ts">
  import { useGraphWithCanvas } from "../shared/useGraphWithCanvas";
  import GraphProduct from "@magic/products/shared/ui/general/GraphProduct.vue";
  import StopSimButton from "@magic/products/shared/ui/general/StopSimButton.vue";
  import SimulationPlaybackControls from "@magic/products/shared/ui/general/sim/SimulationPlaybackControls.vue";
  import { useEscSimulationShortcut } from "@magic/products/shared/ui/general/useEscSimulationShortcut";

  import { BINARY_TREE_GRAPH_SETTINGS } from "./settings";
  import state from "./state";
  import AddNodePanel from "./ui/AddNodePanel.vue";
  import CRUDControls from "./ui/CRUDControls.vue";
  import TreeInfoLabels from "./ui/TreeInfoLabels.vue";
  import { useTree } from "./useTree";

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
