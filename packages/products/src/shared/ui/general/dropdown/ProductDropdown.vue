<script setup lang="ts">
  import CPopover from '@magic/ui/core/Popover.vue';

  import GButton from '../../../../shared/ui/graph-core/button/GButton.vue';
  import { useNonNullGraphColors } from '../../../../shared/useGlobalGraphColors';
  import ProductDropdownMenu from './ProductDropdownMenu.vue';

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
