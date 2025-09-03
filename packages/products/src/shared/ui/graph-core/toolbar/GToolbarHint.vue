<script setup lang="ts">
  import { useNonNullGraphColors } from "@magic/products/shared/useGlobalGraphColors";
  import type { TutorialControls } from "@magic/graph/tutorials/types";
  import CToolbarHint from "@magic/ui/core/toolbar/ToolbarHint.vue";

  const colors = useNonNullGraphColors();

  defineProps<{
    tutorial: TutorialControls;
  }>();
</script>

<template>
  <CToolbarHint
    :tutorial="tutorial"
    :color="colors.text + '75'"
  />
</template>
