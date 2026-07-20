<script setup lang="ts">
  import { getValue } from '@core/utils/maybeGetter/index';
  import { mdiInformationOutline } from '@mdi/js';

  import Icon from '../../components/icon/Icon.vue';
  import ToggleButton from '../../components/toggle-button/ToggleButton.vue';
  import Tooltip from '../../components/tooltip/Tooltip.vue';
  import { LensChipDefinition } from './types.ts';

  const props = defineProps<LensChipDefinition>();

  const model = defineModel<boolean>();
</script>

<template>
  <Tooltip :label="getValue(tooltipLabel)">
    <template #trigger>
      <ToggleButton
        v-bind="$attrs"
        v-model="model"
        class="gap-2"
      >
        <span>
          {{ getValue(title) }}
        </span>
        <Icon :path="mdiInformationOutline" />
      </ToggleButton>
    </template>
  </Tooltip>
</template>
