<script setup lang="ts">
  import { nonNullGraph as graph } from "@magic/products/shared/globalGraph";
  import type { GNode } from "@magic/graph/types";
  import GWell from "@magic/ui/graph/GWell.vue";

  import { computed } from "vue";

  import type { MarkovChain } from "../markov/useMarkovChain";
  import MarkovClassNodes from "./MarkovClassNodes.vue";

  const props = defineProps<{
    markov: MarkovChain;
  }>();

  /**
   * goes through classes and replaces node ids with full nodes
   */
  const populateClasses = (classes: Set<GNode["id"]>[]) =>
    classes.map((nodeId) => {
      return Array.from(nodeId).map((nodeId) => {
        return graph.value.getNode(nodeId)!;
      });
    });

  const recurrentClasses = computed(() => {
    return populateClasses(props.markov.recurrentClasses.value);
  });

  const transientClasses = computed(() => {
    return populateClasses(props.markov.transientClasses.value);
  });
</script>

<template>
  <GWell class="p-3 rounded-lg">
    <div class="flex gap-4 items-center">
      <MarkovClassNodes :classes="recurrentClasses">
        Recurrent Classes ({{ recurrentClasses.length }})
      </MarkovClassNodes>

      <MarkovClassNodes :classes="transientClasses">
        Transient Classes ({{ transientClasses.length }})
      </MarkovClassNodes>
    </div>
  </GWell>
</template>
