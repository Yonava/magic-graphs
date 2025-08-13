<script setup lang="ts">
  import { useNonNullGraphColors } from "@magic/graph/themes/useGraphColors";
  import CToolbarDivider from "@ui/core/toolbar/ToolbarDivider.vue";

  const colors = useNonNullGraphColors();
</script>

<template>
  <CToolbarDivider
    v-bind="$props"
    :color="colors.text + '30'"
  />
</template>
