<script setup lang="ts">
  import { Primitive, type PrimitiveProps } from 'reka-ui';

  import { cn } from '../../cn.ts';

  type Variant = 'solid' | 'outline';

  interface Props extends /* @vue-ignore */ PrimitiveProps {
    variant?: Variant;
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'button',
    variant: 'solid',
  });

  const base =
    'inline-flex cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100';

  const variants: Record<Variant, string> = {
    solid: 'bg-neutral-900 text-white hover:bg-neutral-700 active:bg-neutral-800 focus-visible:ring-neutral-900',
    outline:
      'border border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 focus-visible:ring-neutral-400',
  };

  const classes = cn(base, variants[props.variant]);
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="classes">
    <slot />
  </Primitive>
</template>
