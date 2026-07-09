<script setup lang="ts">
  import { DropdownMenuItem } from 'reka-ui';

  import { cn } from '../../cn.ts';

  const classes = cn(
    'block cursor-pointer rounded-sm outline-none transition-colors',
    'focus-visible:bg-neutral-100 data-[highlighted]:bg-neutral-100',
  );
</script>

<template>
  <DropdownMenuItem as-child :class="classes">
    <slot />
  </DropdownMenuItem>
</template>
