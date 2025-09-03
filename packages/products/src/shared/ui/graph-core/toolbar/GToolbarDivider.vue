<script setup lang="ts">
  import { useNonNullGraphColors } from "@magic/products/shared/useGlobalGraphColors";
  import CToolbarDivider from "@magic/ui/core/toolbar/ToolbarDivider.vue";

  const colors = useNonNullGraphColors();
</script>

<template>
  <CToolbarDivider
    v-bind="$props"
    :color="colors.text + '30'"
  />
</template>
