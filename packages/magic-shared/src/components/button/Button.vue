<script setup lang="ts">
  import Button from '@core/components/Button';

  import { useThemeToClasses } from '../../useThemeToClasses.ts';

  const classes = useThemeToClasses({
    dark: 'bg-gray-900',
    light: 'bg-gray-200 text-gray-900 hover:bg-gray-100 active:bg-gray-100',
  });

  defineSlots<{
    default: () => unknown;
    start?: () => unknown;
    end?: () => unknown;
  }>();
</script>

<template>
  <Button :class="classes">
    <template #start><slot name="start" /></template>
    <slot />
    <template #end><slot name="end" /></template>
  </Button>
</template>
