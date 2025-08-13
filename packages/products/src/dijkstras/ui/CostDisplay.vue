<script setup lang="ts">
  import colors from "@colors";
  import { nonNullGraph as graph } from "@magic/graph/global";
  import type { GNode } from "@magic/graph/types";

  import { INF_STR, SIM_COLORS } from "../sim/theme";

  const { getTheme, focus } = graph.value;
  const { isFocused } = focus;

  const getNodeCosts = (node: GNode) => getTheme("nodeText", node);

  const costToColor = (strCost: string) => {
    if (strCost === INF_STR) return colors.RED_800;
    const cost = Number(strCost);
    if (cost === Infinity || isNaN(cost)) return colors.GRAY_500;
    if (cost === 0) return colors.GREEN_700;
    if (cost < 3) return colors.GREEN_500;
    if (cost < 5) return colors.YELLOW_500;
    if (cost < 7) return colors.ORANGE_500;
    if (cost < 9) return colors.RED_400;
    return colors.RED_600;
  };

  const isExplored = (node: GNode) =>
    getTheme("nodeBorderColor", node) === SIM_COLORS.EXPLORED;
  const isQueued = (node: GNode) =>
    getTheme("nodeBorderColor", node) === SIM_COLORS.QUEUED;
  const isSource = (node: GNode) =>
    getTheme("nodeBorderColor", node) === SIM_COLORS.SOURCE;

  const exploreStateColor = (node: GNode) => {
    if (isExplored(node)) return SIM_COLORS.EXPLORED;
    if (isQueued(node)) return SIM_COLORS.QUEUED;
    if (isSource(node)) return SIM_COLORS.SOURCE;
    if (isFocused(node.id)) return getTheme("nodeBorderColor", node);
    return colors.GRAY_600;
  };

  const exploreStateText = (node: GNode) => {
    if (isExplored(node)) return "Explored";
    if (isQueued(node)) return "Queued";
    if (isSource(node)) return "Source";
    if (isFocused(node.id)) return "Highlighted";
    return "Unexplored";
  };
</script>

<template>
  <div
    v-for="node in graph.nodes.value"
    :key="node.id"
    @click="graph.focus.set([node.id])"
    class="text-white flex items-center gap-3 p-2 hover:bg-gray-900 cursor-pointer rounded-lg"
  >
    <span class="text-2xl w-6 text-center font-bold">
      {{ node.label }}
    </span>
    <span class="font-bold">→</span>
    <div
      class="text-lg rounded-lg h-8 w-16 grid place-items-center"
      :style="{ backgroundColor: costToColor(getNodeCosts(node)) }"
    >
      {{ getNodeCosts(node) }}
    </div>
    <div
      class="text-lg rounded-lg h-8 w-32 grid place-items-center font-bold"
      :style="{ backgroundColor: exploreStateColor(node) }"
    >
      {{ exploreStateText(node) }}
    </div>
  </div>
</template>
