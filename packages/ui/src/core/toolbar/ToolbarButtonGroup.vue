<script setup lang="ts">
  import { twMerge } from 'tailwind-merge';

  import { computed } from 'vue';

  import { useClassAttrs } from '../../useClassAttrs.ts';

  const parentClasses = useClassAttrs();
  const defaultClasses = ['flex', 'items-center', 'relative', 'gap-1'];
  const classes = computed(() => twMerge(defaultClasses, parentClasses.value));
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
