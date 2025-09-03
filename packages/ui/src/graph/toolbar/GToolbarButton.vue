<script setup lang="ts">
  import { nonNullGraph as graph } from "@magic/products/shared/globalGraph";
  import { useNonNullGraphColors } from "@magic/products/shared/useGlobalGraphColors";
  import CToolbarButton from "../../core/toolbar/ToolbarButton.vue";

  import { computed } from "vue";

  const colors = useNonNullGraphColors();
  const color = computed(() => colors.value.primary);

  // special case!
  const activeColor = computed(() => {
    if (graph.value.themeName.value === "dark") {
      return colors.value.tertiary;
    }
    return colors.value.secondary;
  });
</script>

<template>
  <CToolbarButton
    v-bind="$props"
    :color="color"
    :active-color="activeColor"
  >
    <slot></slot>
  </CToolbarButton>
</template>
