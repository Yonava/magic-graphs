<script setup lang="ts">
  import GWell from "../../../shared/ui/graph-core/GWell.vue";

  import AdjacencyListDisplay from "./AdjacencyListDisplay.vue";
</script>

<template>
  <h2 class="text-xl font-bold mb-2">Adjacency List</h2>
  <GWell
    secondary
    class="p-4 rounded-lg max-h-[200px] overflow-auto"
  >
    <AdjacencyListDisplay />
  </GWell>
</template>
