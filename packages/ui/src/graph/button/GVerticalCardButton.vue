<script setup lang="ts">
  import { useNonNullGraphColors } from "@magic/graph/themes/useGraphColors";
  import CVerticalCardButton from "@magic/ui/core/button/VerticalCardButton.vue";

  const colors = useNonNullGraphColors();
</script>

<template>
  <CVerticalCardButton
    v-bind="$attrs"
    :color="colors.primary"
    :hover-color="colors.secondary"
  />
</template>
