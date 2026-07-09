<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui';

import { cn } from './cn';

interface Props extends /* @vue-ignore */ PrimitiveProps {
  variant?: 'solid' | 'outline';
}

withDefaults(defineProps<Props>(), {
  as: 'button',
  variant: 'solid',
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
        variant === 'solid' && 'bg-neutral-900 text-white hover:bg-neutral-700',
        variant === 'outline' &&
          'border border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-100',
      )
    "
  >
    <slot />
  </Primitive>
</template>
