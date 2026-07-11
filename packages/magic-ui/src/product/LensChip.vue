<script setup lang="ts">
  import { Lens } from '@magic/shared/lens';
  import { useProvidedGraph } from '@magic/shared/product';
  import Tooltip from '@magic/ui/Tooltip';

  import { ref, watch } from 'vue';

  import ToggleButton from '../components/toggle-button/ToggleButton.vue';

  type Props = {
    title: string;
    tooltipContent: string;
    lens: Lens;
  };

  const props = defineProps<Props>();

  const graph = useProvidedGraph();

  const hovered = ref(false);
  const active = ref(false);

  const toggleActive = () => {
    active.value = !active.value;
  };

  watch(hovered, () => {
    if (hovered.value) {
      return graph.magic.lens.add(props.lens);
    }
    if (!hovered.value && !active.value) {
      graph.magic.lens.remove(props.lens.id);
    }
  });
</script>

<template>
  <Tooltip :label="tooltipContent">
    <template #trigger>
      <ToggleButton
        @click="toggleActive"
        :model-value="active"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
      >
        {{ title }}
      </ToggleButton>
    </template>
  </Tooltip>
</template>
