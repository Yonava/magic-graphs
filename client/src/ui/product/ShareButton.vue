<script setup lang="ts">
  import GButton from '@ui/graph/button/GButton.vue';
  import CIcon from '@ui/core/Icon.vue';
  import { ref } from 'vue';

  const linkCopied = ref(false);

  const copyLink = () => {
    if (linkCopied.value) return;
    linkCopied.value = true;
    setTimeout(() => (linkCopied.value = false), 3000);
  };
</script>

<template>
  <GButton
    @click="copyLink"
    class="h-12 w-12"
  >
    <CIcon
      class="text-3xl"
      :icon="linkCopied ? 'check' : 'share'"
    />
  </GButton>
</template>
