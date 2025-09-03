<script setup lang="ts">
  import { useNonNullGraphColors } from "@magic/products/shared/useGlobalGraphColors";
  import CWell from "@magic/ui/core/Well.vue";

  import { computed } from "vue";

  const colors = useNonNullGraphColors();

  const props = withDefaults(
    defineProps<{
      /**
       * true if the well should use the secondary color
       * as the background color.
       */
      secondary?: boolean;
      tertiary?: boolean;
    }>(),
    {
      secondary: false,
      tertiary: false,
      contrast: false,
    }
  );

  const color = computed(() => {
    if (props.secondary) return colors.value.secondary;
    if (props.tertiary) return colors.value.tertiary;
    return colors.value.primary;
  });
</script>

<template>
  <CWell
    v-bind="$attrs"
    :color="color"
    :text-color="colors.text"
  >
    <slot></slot>
  </CWell>
</template>
