<script setup lang="ts">
  import CToolbarDivider from '@core/ui/core/toolbar/ToolbarDivider.vue';

  import { useNonNullGraphColors } from '../../../../shared/useGlobalGraphColors.ts';

  const colors = useNonNullGraphColors();
</script>

<template>
  <CToolbarDivider
    v-bind="$props"
    :color="colors.text + '30'"
  />
</template>
