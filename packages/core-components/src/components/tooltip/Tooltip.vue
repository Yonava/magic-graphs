<script setup lang="ts">
  import {
    TooltipContent,
    type TooltipContentProps,
    TooltipPortal,
    TooltipProvider,
    TooltipRoot,
    TooltipTrigger,
  } from 'reka-ui';

  import {
    type HTMLAttributes,
    computed,
    normalizeClass,
    useAttrs,
    useSlots,
  } from 'vue';

  import { cn } from '../../cn.ts';

  defineOptions({ inheritAttrs: false });

  interface Props {
    /**
     * required, plain-text description used for the accessible name/description.
     * always what screen readers announce, regardless of what's slotted visually.
     */
    label: string | undefined;
    side?: TooltipContentProps['side'];
    class?: HTMLAttributes['class'];
  }

  const props = withDefaults(defineProps<Props>(), {
    side: 'top',
  });

  const attrs = useAttrs();
  const slots = useSlots();

  const hasContent = computed(() => !!props.label);

  const classes = computed(() =>
    cn(
      'z-50 max-w-xs rounded-md bg-neutral-900 px-3 py-1.5 text-sm text-white shadow-md',
      'transition-[opacity,scale] duration-200 ease-[cubic-bezier(0.34,1.8,0.64,1)]',
      'starting:opacity-0 starting:scale-75',
      normalizeClass(props.class),
    ),
  );
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <TooltipRoot>
      <TooltipTrigger as-child>
        <slot name="trigger" />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          v-if="hasContent"
          :aria-label="label"
          :side="side"
          :side-offset="6"
          v-bind="attrs"
          :class="classes"
        >
          <slot>{{ label }}</slot>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
