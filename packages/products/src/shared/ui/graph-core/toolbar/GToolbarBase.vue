<script setup lang="ts">
  import CToolbar from '@magic/ui/core/toolbar/ToolbarBase.vue';

  import { useNonNullGraphColors } from '../../../../shared/useGlobalGraphColors.ts';

  const colors = useNonNullGraphColors();
</script>

<template>
  <CToolbar :color="colors.primary">
    <slot></slot>
  </CToolbar>
</template>
