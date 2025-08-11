<script setup lang="ts">
  import { PRODUCT_SHORTCUTS } from '@product/shared/shortcuts';
  import CIcon from '@ui/core/Icon.vue';
  import GDialog from '@ui/graph/GDialog.vue';
  import GButton from '@ui/graph/button/GButton.vue';
  import { onClickOutside } from '@vueuse/core';
  import { keys } from 'ctrl-keys';

  import { onUnmounted, ref } from 'vue';

  import HelpContent from './help/HelpContent.vue';

  const showDialog = ref(false);
  const dialogContent = ref();

  onClickOutside(dialogContent, () => {
    showDialog.value = false;
  });

  const toggleDialog = () => {
    showDialog.value = !showDialog.value;
  };

  const ctrlKeysHandler = keys();

  ctrlKeysHandler.add(PRODUCT_SHORTCUTS['Help'].binding, toggleDialog);
  ctrlKeysHandler.add('escape', () => (showDialog.value = false));

  window.addEventListener('keydown', ctrlKeysHandler.handle);

  onUnmounted(() => {
    window.removeEventListener('keydown', ctrlKeysHandler.handle);
  });
</script>

<template>
  <GButton
    @click="toggleDialog"
    class="h-12 w-12"
  >
    <CIcon icon="help"></CIcon>
  </GButton>

  <GDialog v-model:visible="showDialog">
    <div ref="dialogContent">
      <HelpContent />
    </div>
  </GDialog>
</template>
