<script setup lang="ts">
  import { ref, onUnmounted } from 'vue';
  import GButton from '@ui/graph/button/GButton.vue';
  import CIcon from '@ui/core/Icon.vue';
  import GDialog from '@ui/graph/GDialog.vue';
  import { onClickOutside } from '@vueuse/core';
  import HelpContent from './help/HelpContent.vue';
  import { keys } from 'ctrl-keys';

  const showDialog = ref(false);
  const dialogContent = ref();

  onClickOutside(dialogContent, () => {
    showDialog.value = false;
  });

  const toggleDialog = () => {
    showDialog.value = !showDialog.value;
  };

  const ctrlKeysHandler = keys();

  ctrlKeysHandler.add('h', toggleDialog);
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
