<script setup lang="ts">
  import { ToggleGroupRoot } from 'reka-ui';

  interface Props {
    disabled?: boolean;
  }

  defineProps<Props>();

  // radio-style: only one value can be selected at a time.
  // works whether the consumer passes v-model or not, same as ToggleButton.
  const selected = defineModel<string>();
</script>

<template>
  <ToggleGroupRoot
    v-model="selected"
    type="single"
    :disabled="disabled"
    class="inline-flex divide-x divide-neutral-300 overflow-hidden rounded-md border border-neutral-300"
  >
    <slot />
  </ToggleGroupRoot>
</template>
