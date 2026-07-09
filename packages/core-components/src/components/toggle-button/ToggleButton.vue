<script setup lang="ts">
  import { Toggle } from 'reka-ui';

  import { cn } from '../../cn.ts';

  interface Props {
    disabled?: boolean;
  }

  defineProps<Props>();

  // works whether the consumer passes v-model or not: bound if they do,
  // otherwise a plain local ref that just holds its own state.
  const pressed = defineModel<boolean>();

  const classes = cn(
    'inline-flex cursor-pointer items-center justify-center gap-1 rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm font-medium text-neutral-900 transition-colors',
    'hover:bg-neutral-100 active:scale-[0.98] active:bg-neutral-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100',
    'data-[state=on]:border-neutral-900 data-[state=on]:bg-neutral-900 data-[state=on]:text-white data-[state=on]:hover:bg-neutral-700',
  );
</script>

<template>
  <Toggle
    v-model="pressed"
    :disabled="disabled"
    :class="classes"
  >
    <slot />
  </Toggle>
</template>
