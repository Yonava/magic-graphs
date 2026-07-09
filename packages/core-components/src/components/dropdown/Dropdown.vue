<script setup lang="ts">
  import {
    DropdownMenuContent,
    type DropdownMenuContentProps,
    DropdownMenuPortal,
    DropdownMenuRoot,
    DropdownMenuTrigger,
  } from 'reka-ui';

  import { cn } from '../../cn.ts';

  interface Props {
    side?: DropdownMenuContentProps['side'];
    align?: DropdownMenuContentProps['align'];
  }

  withDefaults(defineProps<Props>(), {
    side: 'bottom',
    align: 'start',
  });

  const classes = cn(
    'z-50 min-w-48 rounded-md border border-neutral-200 bg-white p-1 shadow-md outline-none',
    'transition-[opacity,scale] duration-150 ease-[cubic-bezier(0.34,1.4,0.64,1)]',
    'starting:opacity-0 starting:scale-95',
  );
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger as-child>
      <slot name="trigger" />
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent :side="side" :align="align" :side-offset="6" :class="classes">
        <slot />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
