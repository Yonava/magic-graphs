<script setup lang="ts">
  import Button from '@core/components/Button';

  import { useThemeToClasses } from '../../useThemeToClasses.ts';
  import { buttonClasses } from './classes.ts';

  const classes = useThemeToClasses(buttonClasses);

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
