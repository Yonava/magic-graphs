<script setup lang="ts">
  import { PRODUCT_SHORTCUTS } from "@magic/products/shared/shortcuts";
  import CIcon from "@magic/ui/core/Icon.vue";
  import GButton from "@magic/products/shared/ui/graph-core/button/GButton.vue";
  import { onKeyStroke, useFullscreen } from "@vueuse/core";

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
