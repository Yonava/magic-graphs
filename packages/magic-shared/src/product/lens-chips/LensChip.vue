<script setup lang="ts">
  import { getValue } from '@core/utils/maybeGetter/index';

  import ToggleButton from '../../components/toggle-button/ToggleButton.vue';
  import Tooltip from '../../components/tooltip/Tooltip.vue';
  import { LensChipDefinition } from './types.ts';

  const props = defineProps<LensChipDefinition>();

  const model = defineModel<boolean>();
</script>

<template>
  <Tooltip :label="getValue(tooltipContent)">
    <template #trigger>
      <ToggleButton
        v-bind="$attrs"
        v-model="model"
      >
        {{ getValue(title) }}
      </ToggleButton>
    </template>
  </Tooltip>
</template>
