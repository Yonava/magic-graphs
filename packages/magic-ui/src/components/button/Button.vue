<script setup lang="ts">
  import Button from '@core/components/Button';

  import { useThemeToClasses } from '../../useThemeToClasses.ts';

  const classes = useThemeToClasses({
    dark: 'bg-gray-900',
    light: 'bg-gray-200 text-gray-900 hover:bg-gray-100 active:bg-gray-100',
  });
</script>

<template>
  <Button :class="classes">
    <slot></slot>
  </Button>
</template>
