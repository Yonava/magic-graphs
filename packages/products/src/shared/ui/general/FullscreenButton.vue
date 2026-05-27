<script setup lang="ts">
  import CIcon from '@magic/ui/core/Icon.vue';
  import { onKeyStroke, useFullscreen } from '@vueuse/core';

  import { PRODUCT_SHORTCUTS } from '../../../shared/shortcuts.ts';
  import GButton from '../../../shared/ui/graph-core/button/GButton.vue';

  const { toggle, isFullscreen } = useFullscreen();
  onKeyStroke(PRODUCT_SHORTCUTS.Fullscreen.binding, toggle);
</script>

<template>
  <GButton
    @click="toggle"
    class="h-12 w-12"
  >
    <CIcon
      class="text-3xl"
      :icon="isFullscreen ? 'fullscreen-exit' : 'fullscreen'"
    />
  </GButton>
</template>
