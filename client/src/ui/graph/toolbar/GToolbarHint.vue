<script setup lang="ts">
  import { useNonNullGraphColors } from '@graph/themes/useGraphColors';
  import type { TutorialControls } from '@graph/tutorials/types';
  import CToolbarHint from '@ui/core/toolbar/ToolbarHint.vue';

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
