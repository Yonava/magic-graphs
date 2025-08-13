<script setup lang="ts">
  import { useClassAttrs } from '@ui/useClassAttrs';
  import { twMerge } from 'tailwind-merge';

  import { computed } from 'vue';

  const parentClasses = useClassAttrs();
  const defaultClasses = ['flex', 'items-center', 'relative', 'gap-1'];
  const classes = computed(() => twMerge(defaultClasses, parentClasses.value));
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
