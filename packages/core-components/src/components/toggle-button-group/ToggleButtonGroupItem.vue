<script setup lang="ts">
  import { ToggleGroupItem } from 'reka-ui';

  import { cn } from '../../cn.ts';
  import { toggleButtonBaseClasses } from '../toggle-button/variants.ts';

  interface Props {
    value: string;
    disabled?: boolean;
  }

  defineProps<Props>();

  const classes = cn(toggleButtonBaseClasses, 'focus-visible:z-10 focus-visible:ring-offset-0');
</script>

<template>
  <ToggleGroupItem :value="value" :disabled="disabled" :class="classes">
    <slot />
  </ToggleGroupItem>
</template>
