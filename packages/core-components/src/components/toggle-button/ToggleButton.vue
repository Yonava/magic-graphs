<script setup lang="ts">
  import { Toggle } from 'reka-ui';

  import { cn } from '../../cn.ts';
  import { toggleButtonClasses } from './variants.ts';

  interface Props {
    disabled?: boolean;
  }

  defineProps<Props>();

  // works whether the consumer passes v-model or not: bound if they do,
  // otherwise a plain local ref that just holds its own state.
  const pressed = defineModel<boolean>();

  const classes = cn(toggleButtonClasses);
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
