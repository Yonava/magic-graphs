<script setup lang="ts">
  import { useNonNullGraphColors } from "@magic/products/shared/useGlobalGraphColors";
  import CPopover from "../../core/Popover.vue";
  import GButton from "../../graph/button/GButton.vue";

  import ProductDropdownMenu from "./ProductDropdownMenu.vue";

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
