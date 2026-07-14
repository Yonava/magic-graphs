<script setup lang="ts">
  interface Props {
    // an icon path string from '@mdi/js', e.g. mdiHome
    path: string;
    size?: number;
  }

  withDefaults(defineProps<Props>(), {
    size: 24,
  });
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path :d="path" />
  </svg>
</template>
