<script setup lang="ts">
  import { useNonNullGraphColors } from "@magic/graph/themes/useGraphColors";
  import CButton from "@magic/ui/core/button/Button.vue";

  import { computed } from "vue";

  const colors = useNonNullGraphColors();

  const props = withDefaults(
    defineProps<{
      secondary?: boolean;
      tertiary?: boolean;
      contrast?: boolean;
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
    if (props.contrast) return colors.value.contrast;
    return colors.value.primary;
  });
</script>

<template>
  <CButton :color="color">
    <slot></slot>
  </CButton>
</template>
