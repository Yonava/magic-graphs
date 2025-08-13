<script setup lang="ts">
  import { nonNullGraph as graph } from "@magic/graph/global";
  import type { GNode } from "@magic/graph/types";
  import CPopover from "@ui/core/Popover.vue";
  import CButton from "@ui/core/button/Button.vue";
  import GraphNode from "@ui/graph/GNode.vue";
  import GWell from "@ui/graph/GWell.vue";
  import GButton from "@ui/graph/button/GButton.vue";
  import colors from "@utils/colors";

  import { computed, toRef } from "vue";

  import TreeShapeMenuSettings from "./TreeShapeMenuSettings.vue";
  import type { AutoTreeControls } from "./tree/useTreeShaper";

  const props = defineProps<{
    controls: AutoTreeControls;
  }>();

  const treeControls = toRef(props, "controls");

  const { isActive, activate, deactivate, updateShape, rootNodeId } =
    treeControls.value;

  const nodeSelected = (node: GNode) => {
    rootNodeId.value = node.id;
    if (!isActive.value) updateShape();
  };

  const rootNode = computed(() => {
    if (!rootNodeId.value) return;
    return graph.value.getNode(rootNodeId.value);
  });

  const turnOnAutoTree = () => {
    activate();
    if (!rootNode.value && graph.value.nodes.value.length > 0) {
      rootNodeId.value = graph.value.nodes.value[0].id;
    }
  };
</script>

<template>
  <CPopover>
    <template #activator="menuProps">
      <slot v-bind="menuProps"></slot>
    </template>

    <GWell class="p-3 flex flex-col gap-2 w-72 rounded-lg">
      <div
        v-if="graph.nodes.value.length > 0"
        class="flex flex-col gap-2"
      >
        <div class="flex justify-between">
          <h1 class="font-bold text-xl">Pick A Root Node</h1>
          <TreeShapeMenuSettings :controls="treeControls" />
        </div>

        <GWell
          secondary
          class="py-3 flex flex-wrap justify-center gap-2 max-h-48 rounded-md overflow-auto"
        >
          <GraphNode
            v-for="node in graph.nodes.value"
            :key="node.id"
            @click="nodeSelected(node)"
            :node="node"
            :size="55"
          />
        </GWell>

        <div class="flex justify-between">
          <div>
            <CButton
              v-if="isActive"
              @click="deactivate"
              :color="colors.RED_600"
              class="text-xs"
            >
              Turn Off AutoTree™
            </CButton>
            <GButton
              v-else
              @click="turnOnAutoTree"
              tertiary
              class="text-xs"
            >
              Try AutoTree™
            </GButton>
          </div>
          <div>
            <GWell
              v-if="isActive && rootNode"
              secondary
              class="rounded-md px-2 py-1 font-bold text-xs animate-pulse"
            >
              <h2>Tracking Node {{ rootNode.label }}</h2>
            </GWell>
          </div>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col gap-2"
      >
        <h1 class="font-bold text-xl">Where Are The Nodes?!</h1>
        <p class="text-base">
          Add some nodes to the graph, then come back to check out how we can
          <span class="text-magic">magically</span>
          shape them into a tree!
        </p>
      </div>
    </GWell>
  </CPopover>
</template>
