<script setup lang="ts">
  import InputRange from "@magic/ui/InputRange.vue";
  import CIcon from "@magic/ui/core/Icon.vue";
  import CPopover from "@magic/ui/core/Popover.vue";
  import GWell from "@magic/ui/graph/GWell.vue";
  import GButton from "@magic/ui/graph/button/GButton.vue";

  import { toRef } from "vue";

  import type { AutoGenerateGraphOptions } from "./types";
  import { AUTO_GENERATE_GRAPH_DEFAULTS } from "./types";

  const props = defineProps<{
    options: AutoGenerateGraphOptions;
  }>();

  const options = toRef(props.options);
</script>

<template>
  <CPopover>
    <template #activator="{ toggle }">
      <GButton @click="toggle">
        <CIcon icon="cog" />
      </GButton>
    </template>

    <GWell class="p-3 flex flex-col gap-2 w-72 rounded-lg">
      <h2 class="font-bold text-sm">
        Nodes ({{ options.maxNodesPerCluster }})
      </h2>
      <InputRange
        v-model="options.maxNodesPerCluster"
        :min="3"
        :max="50"
        class="w-full"
      />
      <GButton
        v-if="
          options.maxNodesPerCluster !==
          AUTO_GENERATE_GRAPH_DEFAULTS.maxNodesPerCluster
        "
        @click="
          options.maxNodesPerCluster =
            AUTO_GENERATE_GRAPH_DEFAULTS.maxNodesPerCluster
        "
      >
        Reset
      </GButton>
      <h2 class="font-bold text-sm">
        Max edges per node ({{ options.maxEdgesPerNode! + 1 }})
      </h2>
      <InputRange
        v-model="options.maxEdgesPerNode"
        :min="0"
        :max="9"
        class="w-full"
      />
      <GButton
        v-if="
          options.maxEdgesPerNode !==
          AUTO_GENERATE_GRAPH_DEFAULTS.maxEdgesPerNode
        "
        @click="
          options.maxEdgesPerNode = AUTO_GENERATE_GRAPH_DEFAULTS.maxEdgesPerNode
        "
      >
        Reset
      </GButton>
      <h2 class="font-bold text-sm">
        Connection probability ({{ options.connectionProbability }})
      </h2>
      <InputRange
        v-model="options.connectionProbability"
        :min="0"
        :max="1"
        step="0.05"
        class="w-full"
      />
      <GButton
        v-if="
          options.connectionProbability !==
          AUTO_GENERATE_GRAPH_DEFAULTS.connectionProbability
        "
        @click="
          options.connectionProbability =
            AUTO_GENERATE_GRAPH_DEFAULTS.connectionProbability
        "
      >
        Reset
      </GButton>
      <h2 class="font-bold text-sm">
        Edge connection distance ({{ options.maxNeighbors }})
      </h2>
      <InputRange
        v-model="options.maxNeighbors"
        :min="0"
        :max="50"
        class="w-full"
      />
      <GButton
        v-if="
          options.maxNeighbors !== AUTO_GENERATE_GRAPH_DEFAULTS.maxNeighbors
        "
        @click="
          options.maxNeighbors = AUTO_GENERATE_GRAPH_DEFAULTS.maxNeighbors
        "
      >
        Reset
      </GButton>
      <h2 class="font-bold text-sm">
        Allow Self Referencing Nodes?
        <input
          v-model="options.allowUTurnEdges"
          type="checkbox"
        />
      </h2>
      <h2 class="font-bold text-sm">
        Allow Bidirecional Edges?
        <input
          v-model="options.allowBidirectionalEdges"
          type="checkbox"
        />
      </h2>
    </GWell>
  </CPopover>
</template>
