<script setup lang="ts">
  import CVerticalCardButton from '@core/ui/core/button/VerticalCardButton.vue';

  import { useNonNullGraphColors } from '../../../../shared/useGlobalGraphColors.ts';

  const colors = useNonNullGraphColors();
</script>

<template>
  <CVerticalCardButton
    v-bind="$attrs"
    :color="colors.primary"
    :hover-color="colors.secondary"
  />
</template>
