<script setup lang="ts">
  import { getRandomInRange } from '@magic/utils/random';

  import { ref } from 'vue';

  import GVerticalCardButton from '../../../../shared/ui/graph-core/button/GVerticalCardButton.vue';
  import type { SimulationDeclaration } from '../../../../types.ts';

  const props = defineProps<{
    simulation: SimulationDeclaration;
  }>();

  const img = ref('');
  setTimeout(
    () => {
      img.value = props.simulation.thumbnail;
    },
    getRandomInRange(0, 100),
  );
</script>

<template>
  <GVerticalCardButton
    :image-src="img"
    :title="simulation.name"
    :description="simulation.description"
    class="rounded-md"
  />
</template>
