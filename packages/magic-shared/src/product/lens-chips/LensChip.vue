<script setup lang="ts">
  import { ref, watch } from 'vue';

  import ToggleButton from '../../components/toggle-button/ToggleButton.vue';
  import Tooltip from '../../components/tooltip/Tooltip.vue';
  import { useProvidedGraph } from '../useProvidedGraph.ts';
  import { LensChipDefinition } from './types.ts';

  const props = defineProps<LensChipDefinition>();

  const model = defineModel<boolean>();
</script>

<template>
  <Tooltip :label="tooltipContent">
    <template #trigger>
      <ToggleButton
        v-bind="$attrs"
        v-model="model"
      >
        {{ title }}
      </ToggleButton>
    </template>
  </Tooltip>
</template>
