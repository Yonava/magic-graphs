<script setup lang="ts">
  import CToolbarButton from '@magic/ui/core/toolbar/ToolbarButton.vue';

  import { computed } from 'vue';

  import { nonNullGraph as graph } from '../../../../shared/globalGraph';
  import { useNonNullGraphColors } from '../../../../shared/useGlobalGraphColors';

  const colors = useNonNullGraphColors();
  const color = computed(() => colors.value.primary);

  // special case!
  const activeColor = computed(() => {
    if (graph.value.themeName.value === 'dark') {
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
