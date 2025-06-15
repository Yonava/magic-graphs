<script setup lang="ts">
  import CPopover from '@ui/core/Popover.vue';
  import ProductDropdownMenu from './ProductDropdownMenu.vue';
  import GButton from '@ui/graph/button/GButton.vue';
  import { useNonNullGraphColors } from '@graph/themes/useGraphColors';

  const colors = useNonNullGraphColors();
</script>

<template>
  <CPopover>
    <template #activator="{ toggle, isOpen }">
      <GButton
        @click="toggle"
        :tertiary="isOpen"
        class="px-4 py-2 text-xl rounded-lg"
      >
        <span :class="`text-${colors.brand}`">Magic Graphs</span>
      </GButton>
    </template>

    <ProductDropdownMenu />
  </CPopover>
</template>
