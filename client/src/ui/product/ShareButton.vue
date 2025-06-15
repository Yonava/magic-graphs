<script setup lang="ts">
  import { useFullscreen } from '@vueuse/core';
  import GButton from '@ui/graph/button/GButton.vue';
  import CIcon from '@ui/core/Icon.vue';

  const { toggle, isFullscreen } = useFullscreen();
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
