<script setup lang="ts">
  import { useNonNullGraphColors } from '@graph/themes/useGraphColors';
  import CVerticalCardButton from '@ui/core/button/VerticalCardButton.vue';

  const colors = useNonNullGraphColors();
</script>

<template>
  <CVerticalCardButton
    v-bind="$attrs"
    :color="colors.primary"
    :hover-color="colors.secondary"
  />
</template>
