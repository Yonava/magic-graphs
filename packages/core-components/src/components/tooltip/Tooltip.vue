<script setup lang="ts">
  import {
    TooltipContent,
    type TooltipContentProps,
    TooltipPortal,
    TooltipProvider,
    TooltipRoot,
    TooltipTrigger,
  } from 'reka-ui';

  import { cn } from '../../cn.ts';

  interface Props {
    /**
     * required, plain-text description used for the accessible name/description.
     * always what screen readers announce, regardless of what's slotted visually.
     */
    label: string;
    side?: TooltipContentProps['side'];
  }

  withDefaults(defineProps<Props>(), {
    side: 'top',
  });
</script>

<template>
  <TooltipProvider>
    <TooltipRoot>
      <TooltipTrigger as-child>
        <slot name="trigger" />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          :aria-label="label"
          :side="side"
          :side-offset="6"
          :class="
            cn(
              'z-50 max-w-xs rounded-md bg-neutral-900 px-3 py-1.5 text-sm text-white shadow-md',
              'transition-[opacity,scale] duration-200 ease-[cubic-bezier(0.34,1.8,0.64,1)]',
              'starting:opacity-0 starting:scale-75',
            )
          "
        >
          <slot>{{ label }}</slot>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
