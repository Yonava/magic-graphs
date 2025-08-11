<script setup lang="ts">
  import CIcon from '@ui/core/Icon.vue';
  import GButton from '@ui/graph/button/GButton.vue';

  defineProps<{
    icon: string;
  }>();
</script>

<template>
  <GButton style="border-radius: 40px">
    <CIcon
      class="py-1 px-6 text-5xl"
      :icon="icon"
    />
  </GButton>
</template>
