<script setup lang="ts">
  import { ref } from 'vue';
  import GButton from '@ui/graph/button/GButton.vue';
  import CIcon from '@ui/core/Icon.vue';
  import GDialog from '@ui/graph/GDialog.vue';
  import { onClickOutside } from '@vueuse/core';
  import HelpContent from './help/HelpContent.vue';

  const showDialog = ref(false);
  const dialogContent = ref();
  const isClosingByClickOutside = ref(false);

  const toggleDialog = () => {
    if (isClosingByClickOutside.value) {
      isClosingByClickOutside.value = false;
      return;
    }
    showDialog.value = !showDialog.value;
  };

  onClickOutside(dialogContent, () => {
    if (!showDialog.value) return;
    isClosingByClickOutside.value = true;
    showDialog.value = false;
    setTimeout(() => {
      isClosingByClickOutside.value = false;
    }, 1);
  });
</script>

<template>
  <GButton
    @click="toggleDialog"
    class="aspect-square w-[45px]"
  >
    <CIcon icon="help"></CIcon>
  </GButton>
  <GDialog v-model:visible="showDialog">
    <div ref="dialogContent">
      <HelpContent />
    </div>
  </GDialog>
</template>
