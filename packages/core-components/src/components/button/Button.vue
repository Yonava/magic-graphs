<script setup lang="ts">
  import { Primitive, type PrimitiveProps } from 'reka-ui';

  import { cn } from '../../cn.ts';
  import { type ButtonVariant, buttonVariants } from './variants.ts';

  interface Props extends PrimitiveProps {
    variant?: ButtonVariant;
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'button',
    variant: 'solid',
  });

  const base =
    'inline-flex cursor-pointer items-center justify-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100';

  const classes = cn(base, buttonVariants[props.variant]);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="classes"
  >
    <slot name="start" />
    <slot />
    <slot name="end" />
  </Primitive>
</template>
