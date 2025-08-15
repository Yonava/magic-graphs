<script setup lang="ts">
  import { useNonNullGraphColors } from "@magic/graph/themes/useGraphColors";
  import Dialog from "primevue/dialog";
  import type { DialogProps } from "primevue/dialog";

  import { computed } from "vue";
  import { useAttrs } from "vue";

  const colors = useNonNullGraphColors();

  const props = withDefaults(
    defineProps<
      {
        /**
         * true if the well should use the secondary color
         * as the background color.
         */
        secondary?: boolean;
        tertiary?: boolean;
        contrast?: boolean;
      } & DialogProps
    >(),
    {
      secondary: false,
      tertiary: false,
      contrast: false,
    }
  );

  const attrs = useAttrs();

  const mergedProps = computed(() => ({
    ...attrs,
    ...props,
  }));

  const color = computed(() => {
    if (props.secondary) return colors.value.secondary;
    if (props.tertiary) return colors.value.tertiary;
    return colors.value.primary;
  });
</script>

<template>
  <Dialog
    v-bind="mergedProps"
    :style="{
      backgroundColor: color,
      color: colors.text,
      borderColor: colors.text,
    }"
    pt:root:class="!border-0"
  >
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </Dialog>
</template>
