<script setup lang="ts">
  import ToggleButton from '../../components/toggle-button/ToggleButton.vue';
  import Tooltip from '../../components/tooltip/Tooltip.vue';

  const props = defineProps<{ tooltipContent: string; title: string }>();

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
