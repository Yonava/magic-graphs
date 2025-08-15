<script setup lang="ts">
  import GVerticalCardButton from "../../graph/button/GVerticalCardButton.vue";
  import { getRandomInRange } from "@magic/utils/random";
  import type { SimulationDeclaration } from "@magic/products/types";

  import { ref } from "vue";

  const props = defineProps<{
    simulation: SimulationDeclaration;
  }>();

  const img = ref("");
  setTimeout(() => {
    img.value = props.simulation.thumbnail;
  }, getRandomInRange(0, 100));
</script>

<template>
  <GVerticalCardButton
    :image-src="img"
    :title="simulation.name"
    :description="simulation.description"
    class="rounded-md"
  />
</template>
