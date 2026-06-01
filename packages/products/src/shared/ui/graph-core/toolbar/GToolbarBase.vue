<script setup lang="ts">
  import type { TutorialControls } from '@magic/graph/tutorials/types';
  import CToolbar from '@magic/ui/core/toolbar/ToolbarBase.vue';

  import { useNonNullGraphColors } from '../../../../shared/useGlobalGraphColors.ts';

  const colors = useNonNullGraphColors();

  defineProps<{
    hint?: TutorialControls;
  }>();
</script>

<template>
  <CToolbar
    :hint="hint"
    :color="colors.primary"
  >
    <slot></slot>
  </CToolbar>
</template>
